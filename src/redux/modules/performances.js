// @flow
import type { Action } from 'redux'
import type { Epic } from 'redux-observable'
import type { Contest, ContestCategory, Venue } from './contests'

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
  result?: Result,
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
  fetchTimetablePerformancesError: boolean,
  fetchingTimetablePerformances: boolean,
  timetablePerformances: ?Array<Performance>,
  fetchResultPerformancesError: boolean,
  fetchingResultPerformances: boolean,
  resultPerformances: ?Array<Performance>,
}

type Piece = {|
  title: string,
  composerName: string,
  composerBorn: string,
  composerDied: string,
|}

type Result = {|
  points: number,
  prize?: string,
  predicate?: string,
|}

// Actions

const FETCH_TIMETABLE_PERFORMANCES = 'performances/FETCH_TIMETABLE_PERFORMANCES'
const FETCH_TIMETABLE_PERFORMANCES_SUCCESS = 'performances/FETCH_TIMETABLE_PERFORMANCES_SUCCESS'
const FETCH_TIMETABLE_PERFORMANCES_FAILURE = 'performances/FETCH_TIMETABLE_PERFORMANCES_FAILURE'

const FETCH_RESULT_PERFORMANCES = 'performances/FETCH_RESULT_PERFORMANCES'
const FETCH_RESULT_PERFORMANCES_SUCCESS = 'performances/FETCH_RESULT_PERFORMANCES_SUCCESS'
const FETCH_RESULT_PERFORMANCES_FAILURE = 'performances/FETCH_RESULT_PERFORMANCES_FAILURE'

export function fetchTimetablePerformances(contest: Contest, venue: Venue, date: string): Action {
  return {
    type: FETCH_TIMETABLE_PERFORMANCES,
    contest,
    venue,
    date,
  }
}

function fetchTimetablePerformancesSuccess(performances: Array<Performance>): Action {
  return {
    type: FETCH_TIMETABLE_PERFORMANCES_SUCCESS,
    performances,
  }
}

function fetchTimetablePerformancesFailure(error: Error): Action {
  return {
    type: FETCH_TIMETABLE_PERFORMANCES_FAILURE,
    error,
  }
}

export function fetchResultPerformances(contest: Contest, contestCategory: ContestCategory): Action {
  return {
    type: FETCH_RESULT_PERFORMANCES,
    contest,
    contestCategory,
  }
}

function fetchResultPerformancesSuccess(performances: Array<Performance>): Action {
  return {
    type: FETCH_RESULT_PERFORMANCES_SUCCESS,
    performances,
  }
}

function fetchResultPerformancesFailure(error: Error): Action {
  return {
    type: FETCH_RESULT_PERFORMANCES_FAILURE,
    error,
  }
}

// Epics

export const fetchTimetablePerformancesEpic: Epic = action$ =>
  action$.ofType(FETCH_TIMETABLE_PERFORMANCES)
    .switchMap(action =>
      ApiService.get$(`/contests/${action.contest.id}/performances`, {
        venue_id: action.venue.id,
        date: action.date,
      })
        .map((performancesJSON) => fetchTimetablePerformancesSuccess(
          parsePerformances(performancesJSON))
        )
        .catch(error => Observable.of(fetchTimetablePerformancesFailure(error)))
    )

export const fetchResultPerformancesEpic: Epic = action$ =>
  action$.ofType(FETCH_RESULT_PERFORMANCES)
    .switchMap(action =>
      ApiService.get$(`/contests/${action.contest.id}/performances`, {
        contest_category_id: action.contestCategory.id,
        results_public: 1,
      })
        .map((performancesJSON) => fetchResultPerformancesSuccess(
          parsePerformances(performancesJSON))
        )
        .catch(error => Observable.of(fetchResultPerformancesFailure(error)))
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
    result: json.result,
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
  fetchTimetablePerformancesError: false,
  fetchingTimetablePerformances: false,
  timetablePerformances: null,
  fetchResultPerformancesError: false,
  fetchingResultPerformances: false,
  resultPerformances: null,
}

export default function contestsReducer(state: PerformancesState = initialState, action: Action): PerformancesState {
  switch (action.type) {
    case FETCH_TIMETABLE_PERFORMANCES:
      return {
        ...state,
        fetchingTimetablePerformances: true,
      }
    case FETCH_TIMETABLE_PERFORMANCES_SUCCESS:
      return {
        ...state,
        timetablePerformances: action.performances,
        fetchTimetablePerformancesError: false,
        fetchingTimetablePerformances: false,
      }
    case FETCH_TIMETABLE_PERFORMANCES_FAILURE:
      return {
        ...state,
        timetablePerformances: null,
        fetchTimetablePerformancesError: true,
        fetchingTimetablePerformances: false,
      }
    case FETCH_RESULT_PERFORMANCES:
      return {
        ...state,
        resultPerformances: null,
        fetchingResultPerformances: true,
      }
    case FETCH_RESULT_PERFORMANCES_SUCCESS:
      return {
        ...state,
        resultPerformances: action.performances,
        fetchResultPerformancesError: false,
        fetchingResultPerformances: false,
      }
    case FETCH_RESULT_PERFORMANCES_FAILURE:
      return {
        ...state,
        resultPerformances: null,
        fetchResultPerformancesError: true,
        fetchingResultPerformances: false,
      }
    default:
      return state
  }
}
