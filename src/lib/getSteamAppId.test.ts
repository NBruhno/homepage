import { GameWebsiteType } from 'types'

import { getSteamAppId } from './getSteamAppId'

describe('/lib/getSteamAppId', () => {
	test('Steam App ID › Null', async () => {
		expect(getSteamAppId(null)).toBe(null)
	})
	test('Token › Undefined', async () => {
		expect(getSteamAppId(undefined)).toBe(null)
	})
	test('Token › Not a steam website', async () => {
		expect(getSteamAppId([{ url: 'https://not.it', type: GameWebsiteType.AppStore }])).toBe(null)
	})
	test('Token › Valid URL', async () => {
		expect(getSteamAppId([{ url: 'https://steampowered.com/app/1234', type: GameWebsiteType.Steam }])).toBe('1234')
	})
	test('Token › Valid URL, leading slash', async () => {
		expect(getSteamAppId([{ url: 'https://steampowered.com/app/1234/', type: GameWebsiteType.Steam }])).toBe('1234')
	})
	test('Token › Valid URL, with name', async () => {
		expect(getSteamAppId([{ url: 'https://steampowered.com/app/1234/name', type: GameWebsiteType.Steam }])).toBe('1234')
	})
	test('Token › Invalid URL', async () => {
		expect(getSteamAppId([{ url: 'https://steampowered.com/app/not-a-number', type: GameWebsiteType.Steam }])).toBe(null)
	})
})
