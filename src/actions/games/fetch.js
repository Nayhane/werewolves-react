// src/actions/players/fetch.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_PLAYERS = 'FETCHED_PLAYERS'
export const FETCHED_ONE_PLAYER = 'FETCHED_ONE_PLAYER'


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
