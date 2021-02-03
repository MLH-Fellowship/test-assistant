import React, { useEffect, useReducer } from 'react'
import { Router } from '@reach/router'

import '../node_modules/eos-icons/dist/css/eos-icons.css'
import './assets/scss/index.scss'

import Dashboard from "./components/Dashboard";
import Login from './pages/Login'

import Context from './modules/Context'
import ContextReducer from './modules/ContextReducer'

const initialState = {
  auth: false,
  errorCode: null
}

const App = () => {
  const [state, dispatch] = useReducer(ContextReducer, initialState)

  const userId = localStorage.getItem('id')

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (localStorage.getItem('id')) {
        dispatch({
          type: 'AUTHENTICATE'
        })
      } else {
        dispatch({
          type: 'DEAUTHENTICATE'
        })
      }
    })
  }, [])

  useEffect(() => {
    if (userId) {
      dispatch({
        type: 'AUTHENTICATE'
      })
    } else {
      dispatch({
        type: 'DEAUTHENTICATE'
      })
    }
  }, [userId])

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Dashboard path='/' />
        <Login path='/login' />
      </Router>
    </Context.Provider>
  );
}

export default App;
