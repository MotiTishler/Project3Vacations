import React from 'react'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import Login from './components/Login'
import Main from './components/Main'
import Reports from './components/Reports'
import Addit from './components/Addit'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/login" component={Login}/>
        <Route path="/vacations" component={Main}/>
        <Route path="/reports" component={Reports}/>
        <Route path="/edit" component={Addit}/>
        {/*<Route path="/" component={Main}/>*/}
        <Redirect from ="/" exact to="/vacations" />
      </BrowserRouter>
    </div>
  )
}
