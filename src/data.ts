export const domains: Record<string, string[]> = {
	'thetimenews.us': ['cdn.thetimenews.us', 'cdn1.thetimenews.us', 'cdn2.thetimenews.us'],
	'nflhub.store': [],
	'mlbhub.store': [],
	'nbahub.store': [],
	'nhlhub.store': [],
	'fchub.store': [],
};

export const routes: Record<string, string> = {
	'cdn.thetimenews.us': 'https://cf-image-storage.viethoaduc-21.workers.dev',
	'cdn1.thetimenews.us': 'https://cf-image-storage.viethoaduc-21.workers.dev',
	'cdn2.thetimenews.us': 'https://cf-image-storage.viethoaduc-21.workers.dev',
};

export const DOMAIN_DEFAULT: string = 'thetimenews.us';
