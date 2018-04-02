import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { counterReducer } from './modules/counter'
import { starsReducer } from './modules/stars'
import { InterfaceStore } from './InterfaceStore'

const { reducer } = require('redux-connect')

const rootReducer: Redux.Reducer<InterfaceStore> = combineReducers<InterfaceStore>({
	routing: routerReducer,
	counter: counterReducer,
	stars: starsReducer,
	reduxAsyncConnect: reducer
})

export default rootReducer
