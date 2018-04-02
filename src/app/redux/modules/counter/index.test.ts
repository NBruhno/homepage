import { expect } from 'chai'
import * as counter from './'
import { Counter, CounterAction } from 'models/counter'

/** Module */
describe('Counter Module', () => {
	/** Actions */
	describe('Actions', () => {
		describe('Increment', () => {
			it('has the correct type', () => {
				const action: CounterAction = counter.increment()
				expect(action.type).to.equal(counter.INCREMENT)
			})
		})

		describe('Decrement', () => {
			it('has the correct type', () => {
				const action: CounterAction = counter.decrement()
				expect(action.type).to.equal(counter.DECREMENT)
			})
		})
	})

	/** Reducer */
	describe('Reducer', () => {
		const state: Counter = { count: 10 }

		it('handles action of type INCREMENT', () => {
			const action: CounterAction = { type: counter.INCREMENT }
			expect(counter.counterReducer(state, action)).to.be.eql({ count: state.count + 1 })
		})

		it('handles action of type DECREMENT', () => {
			const action: CounterAction = { type: counter.DECREMENT }
			expect(counter.counterReducer(state, action)).to.be.eql({ count: state.count - 1 })
		})

		it('handles actions with unknown type', () => {
			expect(counter.counterReducer(state, { type: '' })).to.be.eql({ count: state.count })
		})
	})
})
