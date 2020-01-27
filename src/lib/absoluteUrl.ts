const absoluteUrl = (req?: any) => {
	let protocol = 'https'
	const host = req ? (req.headers['x-forwarded-host'] || req.headers['host']) : window.location.host
	if (host.indexOf('localhost') > -1) {
		protocol = 'http'
	}

	return { protocol, host, origin: `${protocol}://${host}` }
}

export default absoluteUrl
