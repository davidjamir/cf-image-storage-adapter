import { domains, routes, DOMAIN_DEFAULT } from './data';
const allowedMethods = ['POST'];

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const auth = request.headers.get('Authorization');
		if (!auth?.startsWith('Bearer ')) {
			return new Response('Unauthorized', { status: 401 });
		}

		const token = auth.slice(7);
		if (token !== env.INTERNAL_SECRET) {
			return new Response('Unauthorized', { status: 401 });
		}

		if (!allowedMethods.includes(request.method)) {
			return new Response('Method Not Allowed', {
				status: 405,
				headers: {
					Allow: allowedMethods.join(', '),
				},
			});
		}

		const body = (await request.clone().json()) as { host: string };
		const { host } = body;
		const domain = host === 'localhost' ? DOMAIN_DEFAULT : host.split('.').slice(-2).join('.');
		const cdn = domains[domain][Math.floor(Math.random() * domains[domain].length)];
		const target = routes[cdn];

		if (!target) {
			return new Response('Unknown host', { status: 404 });
		}

		const url = new URL(request.url);
		const targetUrl = new URL(target);

		url.protocol = targetUrl.protocol;
		url.hostname = targetUrl.hostname;
		url.port = targetUrl.port;

		const newRequest = new Request(url, request);

		return fetch(newRequest);
	},
} satisfies ExportedHandler<Env>;
