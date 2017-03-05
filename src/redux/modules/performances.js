// @flow
import type { Action } from 'redux'
import type { Epic } from 'redux-observable'
import type { Contest, Venue } from './contests'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

import ApiService from '../../services/ApiService'

// Types

type Appearance = {|
  participantName: string,
  participantRole: string,
  instrumentName: string,
  ageGroup: string,
|}

export type Performance = {|
  id: string,
  stageTime: string,
  categoryName: string,
  ageGroup: string,
  predecessorHostCountry?: string,
  predecessorHostName?: string,
  appearances: Array<Appearance>,
  pieces: Array<Piece>,
|}

export type PerformancesState = {
  fetchPerformancesError: boolean,
  fetchingPerformances: boolean,
  performances: ?Array<Performance>,
}

type Piece = {|
  title: string,
  composerName: string,
  composerBorn: string,
  composerDied: string,
|}

// Actions

const FETCH_PERFORMANCES = 'performances/FETCH_PERFORMANCES'
const FETCH_PERFORMANCES_SUCCESS = 'performances/FETCH_PERFORMANCES_SUCCESS'
const FETCH_PERFORMANCES_FAILURE = 'performances/FETCH_PERFORMANCES_FAILURE'

export function fetchPerformances(contest: Contest, venue: Venue, date: string): Action {
  return {
    type: FETCH_PERFORMANCES,
    contest,
    venue,
    date,
  }
}

function fetchPerformancesSuccess(performances: Array<Performance>): Action {
  return {
    type: FETCH_PERFORMANCES_SUCCESS,
    performances,
  }
}

function fetchPerformancesFailure(error: Error): Action {
  return {
    type: FETCH_PERFORMANCES_FAILURE,
    error,
  }
}

// Epics

export const fetchPerformancesEpic: Epic = action$ =>
  action$.ofType(FETCH_PERFORMANCES)
    .switchMap(action =>
      ApiService.get$(`/contests/${action.contest.id}/performances`, {
        venue_id: action.venue.id,
        date: action.date,
      })
        .map((performancesJSON) => fetchPerformancesSuccess(
          parsePerformances(performancesJSON))
        )
        .catch(error => Observable.of(fetchPerformancesFailure(error)))
    )

// Helpers

function parsePerformances(performancesJSON: Array<Object>): Array<Performance> {
  return performancesJSON.map(json => {
    return {
      id: json.id,
      stageTime: json.stage_time,
      categoryName: json.category_name,
      ageGroup: json.age_group,
      predecessorHostCountry: json.predecessor_host_country,
      predecessorHostName: json.predecessor_host_name,
      appearances: json.appearances.map(parseAppearance),
      pieces: json.pieces.map(parsePiece),
    }
  })
}

function parseAppearance(json: Object): Appearance {
  return {
    participantName: json.participant_name,
    participantRole: json.participant_role,
    instrumentName: json.instrument_name,
    ageGroup: json.age_group,
  }
}

function parsePiece(json: Object): Piece {
  return {
    title: json.title,
    composerName: json.composer_name,
    composerBorn: json.composer_born,
    composerDied: json.composer_died,
  }
}

// Reducer

const initialState = {
  fetchPerformancesError: false,
  fetchingPerformances: false,
  performances: null,
}

export default function contestsReducer(state: PerformancesState = initialState, action: Action): PerformancesState {
  switch (action.type) {
    case FETCH_PERFORMANCES:
      return {
        ...state,
        fetchingPerformances: true,
      }
    case FETCH_PERFORMANCES_SUCCESS:
      return {
        ...state,
        performances: action.performances,
        fetchPerformancesError: false,
        fetchingPerformances: false,
      }
    case FETCH_PERFORMANCES_FAILURE:
      return {
        ...state,
        performances: null,
        fetchPerformancesError: true,
        fetchingPerformances: false,
      }
    default:
      return state
  }
}
