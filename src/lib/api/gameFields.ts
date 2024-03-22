const root = [
	'aggregated_rating_count', 'aggregated_rating', 'first_release_date', 'category', 'multiplayer_modes.*',
	'id', 'name', 'storyline', 'summary', 'status', 'updated_at', 'hypes', 'parent_game',
]
const companies = ['involved_companies.company.name', 'involved_companies.developer', 'involved_companies.porting', 'involved_companies.publisher', 'involved_companies.supporting']
const cover = ['cover.alpha_channel', 'cover.animated', 'cover.image_id']
const dlcs = ['dlcs.name', 'dlcs.cover.alpha_channel', 'dlcs.cover.animated', 'dlcs.cover.image_id']
const engines = ['game_engines.name']
const franchises = ['franchises.name']
const gameModes = ['game_modes.name']
const genres = ['genres.name']
const multiplayerModes = ['multiplayer_modes.campaigncoop', 'multiplayer_modes.dropin', 'multiplayer_modes.lancoop', 'multiplayer_modes.offlinecoop', 'multiplayer_modes.offlinecoopmax', 'multiplayer_modes.offlinemax', 'multiplayer_modes.onlinecoop', 'multiplayer_modes.onlinecoopmax', 'multiplayer_modes.onlinemax', 'multiplayer_modes.splitscreen', 'multiplayer_modes.splitscreenonline', 'multiplayer_modes.platform.abbreviation', 'multiplayer_modes.platform.name']
const platforms = ['platforms.abbreviation', 'platforms.name']
const playerPerspectives = ['player_perspectives.name']
const releaseDates = ['release_dates.date', 'release_dates.platform.abbreviation', 'release_dates.platform.name']
const screenshots = ['screenshots.alpha_channel', 'screenshots.image_id', 'screenshots.width']
const similarGames = ['similar_games.name', 'similar_games.cover.alpha_channel', 'similar_games.cover.animated', 'similar_games.cover.image_id']
const themes = ['themes.name']
const videos = ['videos.video_id', 'videos.name']
const websites = ['websites.category', 'websites.trusted', 'websites.url']

export const gameFields = `fields ${[
	...root,
	...companies,
	...cover,
	...dlcs,
	...engines,
	...franchises,
	...gameModes,
	...genres,
	...multiplayerModes,
	...platforms,
	...playerPerspectives,
	...releaseDates,
	...screenshots,
	...similarGames,
	...themes,
	...videos,
	...websites,
].join(', ')}`
