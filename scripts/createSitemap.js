/* eslint-disable no-console */

require('dotenv').config()
const fs = require('fs')

const format = require('date-fns/format')

const { log } = console
const domains = ['bruhno.com', 'bruhno.dev']
const outputLocation = 'public'
const pagesLocation = 'src/pages/'

log(`Creating sitemaps for ${domains.join(' & ')}, outputting to /${outputLocation}...`)

const pages = {}
const walkSync = (dir) => {
	const files = fs.readdirSync(dir)
	files.forEach((file) => {
		const filePath = `${dir}${file}`
		const fileStat = fs.statSync(filePath)

		if (fileStat.isDirectory()) walkSync(`${filePath}/`)
		else {
			if (!filePath.includes('.route')) return
			const cleanFileName = filePath
				.substr(0, filePath.lastIndexOf('.'))
				.replace(pagesLocation, '')
				.replace('.route', '')

			if (cleanFileName.includes('_document')
				|| cleanFileName.includes('_error')
				|| cleanFileName.includes('_app')
				|| cleanFileName.includes('404')
				|| cleanFileName.includes('api/')
				|| cleanFileName.includes('/[')) return

			if (cleanFileName.includes('/index')) {
				pages[cleanFileName.replace('/index', '') || ''] = {
					page: '',
					lastModified: fileStat.mtime,
				}
				return
			}

			if (cleanFileName.includes('index')) {
				pages[''] = {
					page: '',
					lastModified: fileStat.mtime,
				}
				return
			}

			pages[`${cleanFileName}`] = {
				page: `${cleanFileName}`,
				lastModified: fileStat.mtime,
			}
		}
	})
}

walkSync(pagesLocation)

const sitemapEntries = []
domains.forEach((domain) => {
	sitemapEntries.push(Object.keys(pages).map((page) => `<url>
		<loc>https://${domain}/${page}</loc>
		<lastmod>${format(new Date(pages[page].lastModified), 'yyyy-MM-dd')}</lastmod>
	</url>`).join('\n	'))
})

fs.writeFileSync(`${outputLocation}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${sitemapEntries.join('\n	')}
</urlset>`)

log(`Created successfully (/${outputLocation}/sitemap.xml)`)
