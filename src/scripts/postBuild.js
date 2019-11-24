const fs = require('fs')

const domains = ['bruhno.com', 'bruhno.dev']

const formatDate = (date) => {
	const d = new Date(date)
	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	const year = '' + d.getFullYear()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	return [year, month, day].join('-')
}

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
				.replace('src/pages/', '')

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

walkSync('src/pages/')

domains.forEach((domain) => {
	fs.writeFileSync(`sitemap-${domain}.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${Object.keys(pages).map(
		(path) => `<url>
    <loc>https://${domain}/${path}</loc>
    <lastmod>${
	formatDate(new Date(pages[path].lastModified))
}</lastmod>
	</url>`,
	).join('\n	')}
</urlset>
	`)
})
