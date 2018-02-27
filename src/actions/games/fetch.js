// src/actions/players/fetch.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { PLAYER_UPDATED, PLAYERS_UPDATED } from './subscribe'

export const FETCHED_PLAYERS = 'FETCHED_PLAYERS'
export const FETCHED_ONE_PLAYER = 'FETCHED_ONE_PLAYER'
export const FETCHED_VILLAGES = 'FETCHED_VILLAGES'
export const FETCHED_ONE_VILLAGE = 'FETCHED_ONE_VILLAGE'

const api = new API()

export const fetchPlayers = () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/players')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_PLAYERS,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchVillages = () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/villages')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_VILLAGES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
export const fetchOneVillage = (villageId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/villages/${villageId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_VILLAGE,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchOnePlayer = (playerId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/players/${playerId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_PLAYER,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
