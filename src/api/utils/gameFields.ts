const root = [
	'aggregated_rating_count', 'aggregated_rating', 'first_release_date',
	'id', 'name', 'storyline', 'summary', 'status', 'updated_at', 'hypes', 'follows',
]
const companies = [
	'involved_companies.company.description', 'involved_companies.company.logo.alpha_channel', 'involved_companies.company.logo.image_id',
	'involved_companies.company.name', 'involved_companies.company.slug', 'involved_companies.company.websites.category',
	'involved_companies.company.websites.trusted', 'involved_companies.company.websites.url', 'involved_companies.developer',
	'involved_companies.porting', 'involved_companies.publisher', 'involved_companies.supporting',
]
const releaseDates = [
	'release_dates.date', 'release_dates.platform.abbreviation', 'release_dates.platform.name',
	'release_dates.platform.platform_logo.alpha_channel', 'release_dates.platform.platform_logo.image_id',
]
const cover = ['cover.alpha_channel', 'cover.animated', 'cover.image_id']
const genres = ['genres.name']
const platforms = ['platforms.abbreviation', 'platforms.name', 'platforms.platform_logo.image_id']
const engines = ['game_engines.description', 'game_engines.logo.alpha_channel', 'game_engines.logo.image_id', 'game_engines.name']
const websites = ['websites.category', 'websites.trusted', 'websites.url']
const screenshots = ['screenshots.alpha_channel', 'screenshots.image_id', 'screenshots.width']

export const gameFields = `fields ${[...root, ...cover, ...screenshots, ...companies, ...releaseDates, ...genres, ...platforms, ...engines, ...websites].join(', ')}`
