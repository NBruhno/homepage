import * as React from 'react'
import { IndexRoute, Route } from 'react-router'
import { App, Home, About, CounterComponent, StarsComponent } from 'containers'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="about" component={About} />
		<Route path="counter" component={CounterComponent} />
		<Route path="stars" component={StarsComponent} />
	</Route>
)
