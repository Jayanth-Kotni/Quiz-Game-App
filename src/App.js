import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import QuizGameRoute from './components/QuizGameRoute'
import GameResultRoute from './components/GameResultRoute'
import GameReportsRoute from './components/GameReportsRoute'

import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/quiz-game" component={QuizGameRoute} />
        <ProtectedRoute
          exact
          path="/game-results"
          component={GameResultRoute}
        />
        <ProtectedRoute
          exact
          path="/game-report"
          component={GameReportsRoute}
        />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  )
}

export default App
