/* eslint-disable no-console */
const fs = require('fs')

const format = require('date-fns/format')

const domains = ['bruhno.com', 'bruhno.dev']
const outputLocation = 'public'
const pagesLocation = 'src/pages/'

console.log(`Creating sitemaps for ${domains.join(', ')} in ${outputLocation}`)

const pages = {}
const walkSync = (dir) => {
	const files = fs.readdirSync(dir)
	files.forEach((file) => {
		const filePath = `${dir}${file}`
		const fileStat = fs.statSync(filePath)

		if (fileStat.isDirectory()) {
			walkSync(`${filePath}/`)
		} else {
			const cleanFileName = filePath
				.substr(0, filePath.lastIndexOf('.'))
				.replace(pagesLocation, '')

			switch (cleanFileName) {
				case 'index':
					pages[''] = {
						page: '',
						lastModified: fileStat.mtime,
					}
					break
				case '_document':
				case '_error':
				case '_app':
					break
				default:
					pages[`${cleanFileName}`] = {
						page: `${cleanFileName}`,
						lastModified: fileStat.mtime,
					}
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

console.log(`Created sitemap (${outputLocation}/sitemap.xml)`)
