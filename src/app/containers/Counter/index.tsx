import * as React from 'react'
import { increment, decrement } from 'modules/counter/'
import { Counter } from 'models/counter'
import { CounterAction } from 'models/counter'
const { connect } = require('react-redux')
const style = require('./style.css')

interface Props {
	counter: Counter
	increment: Redux.ActionCreator<CounterAction>
	decrement: Redux.ActionCreator<CounterAction>
}

@connect(
	(state) => ({ counter: state.counter }),
	(dispatch) => ({
		decrement: () => dispatch(decrement()),
		increment: () => dispatch(increment())
	})
)
class CounterComponent extends React.Component<Props, {}> {
	public render() {
		const { increment, decrement, counter } = this.props

		return (
			<div className={style.Counter}>
				<h4>Counter Example</h4>
				<button name="incBtn" onClick={increment}>
					INCREMENT
				</button>
				<button name="decBtn" onClick={decrement} disabled={counter.count <= 0}>
					DECREMENT
				</button>
				<p>{counter.count}</p>
			</div>
		)
	}
}

export { CounterComponent }
