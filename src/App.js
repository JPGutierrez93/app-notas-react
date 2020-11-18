import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

//styles
import './App.css';

//components
import MainMenu from './components/MainMenu';
import SignUp from './components/users/SignUp';
import LogIn from './components/users/LogIn';
import Notes from './components/notes/Notes';
import CreateNote from './components/notes/CreateNote';
import EditNote from './components/notes/EditNote'

function App() {

  if (localStorage.getItem('nombre')) {
    return (
      <div className="App">
        <Router>
          <MainMenu />
          <Switch>
            <Route path='/notes' component={Notes} />
            <Route path='/create' component={CreateNote} />
            <Route path='/edit/:id' component={EditNote} />
            <Redirect to={'/notes'} />
          </Switch>

        </Router>

      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <MainMenu />
          <Switch>
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
            <Redirect to={'/login'} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
