// @flow
import type { ContestsState } from './contests'

import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import contests, { fetchContestsEpic } from './contests'

// Types

export type State = {|
  contests: ContestsState,
|}

export const rootEpic = combineEpics(
  fetchContestsEpic
)

export const rootReducer = combineReducers({
  contests,
})
