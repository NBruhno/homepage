import * as React from 'react'
import { getStars } from 'modules/stars'
import { Stars, StarsAction } from 'models/stars'
const { connect } = require('react-redux')
const { asyncConnect } = require('redux-connect')
const style = require('./style.css')

interface Props {
	stars: Stars
	getStars: Redux.ActionCreator<StarsAction>
}

@asyncConnect([
	{
		promise: ({ store: { dispatch } }) => {
			return dispatch(getStars())
		}
	}
])
@connect((state) => ({ stars: state.stars }))
class StarsComponent extends React.Component<Props, {}> {
	public render() {
		const { stars } = this.props

		return <div className={style.Stars}>{stars.isFetching ? 'Fetching Stars' : stars.count}</div>
	}
}

export { StarsComponent }
