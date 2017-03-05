// @flow
import type { ContestsState } from './contests'
import type { PerformancesState } from './performances'

import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import contests, { fetchContestsEpic } from './contests'
import performances, { fetchPerformancesEpic } from './performances'

// Types

export type State = {|
  contests: ContestsState,
  performances: PerformancesState,
|}

export const rootEpic = combineEpics(
  fetchContestsEpic,
  fetchPerformancesEpic
)

export const rootReducer = combineReducers({
  contests,
  performances,
})
