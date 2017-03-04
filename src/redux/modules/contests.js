// @flow
import type { Action } from 'redux'
import type { Epic } from 'redux-observable'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

import ApiService from '../../services/ApiService'

// Types

export type Contest = {|
  id: string,
  name: string,
  hostCountry: string,
  timeZone: string,
  startDate: string,
  endDate: string,
|}

export type ContestsState = {
  contests: ?Array<Contest>,
  fetchContestsError: boolean,
  fetchingContests: boolean,
}

// Actions

const FETCH_CONTESTS = 'FETCH_CONTESTS'
const FETCH_CONTESTS_SUCCESS = 'FETCH_CONTESTS_SUCCESS'
const FETCH_CONTESTS_FAILURE = 'FETCH_CONTESTS_FAILURE'

export function fetchContests(): Action {
  return {
    type: FETCH_CONTESTS,
  }
}

function fetchContestsSuccess(contests: Array<Contest>): Action {
  return {
    type: FETCH_CONTESTS_SUCCESS,
    contests,
  }
}

function fetchContestsFailure(error: Error): Action {
  return {
    type: FETCH_CONTESTS_FAILURE,
    error,
  }
}

// Epics

export const fetchContestsEpic: Epic = action$ =>
  action$.ofType(FETCH_CONTESTS)
    .switchMap(action =>
      ApiService.get$('/contests', {
        current_only: 1,
        timetables_public: 1,
      })
        .map((contests) => fetchContestsSuccess(contests))
        .catch(error => Observable.of(fetchContestsFailure(error)))
    )

// Reducer

const initialState = {
  contests: null,
  fetchContestsError: false,
  fetchingContests: false,
}

export default function contestsReducer(state: ContestsState = initialState, action: Action): ContestsState {
  switch (action.type) {
    case FETCH_CONTESTS:
      return {
        ...state,
        fetchingContests: true,
      }
    case FETCH_CONTESTS_SUCCESS:
      return {
        ...state,
        contests: action.contests,
        fetchContestsError: false,
        fetchingContests: false,
      }
    case FETCH_CONTESTS_FAILURE:
      return {
        ...state,
        contests: null,
        fetchContestsError: true,
        fetchingContests: false,
      }
    default:
      return state
  }
}
