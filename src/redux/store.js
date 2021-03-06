// @flow

import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'remote-redux-devtools'

import { rootEpic, rootReducer } from './modules'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(epicMiddleware)
  )
)
