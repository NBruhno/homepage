import * as React from 'react'
import { Link } from 'react-router'

const style = require('./style.scss')

export const Header = () => (
	<nav className={style.nav}>
		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="about">About</Link></li>
			<li><Link to="counter">Counter</Link></li>
			<li><Link to="stars">Stars</Link></li>
		</ul>
	</nav>
)
