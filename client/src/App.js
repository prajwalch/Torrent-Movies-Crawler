import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import SingleMovie from './components/SingleMovie';

function App() {
  return (
    <Router>
      <div className="Container App">
        <header className="App-header header">
          <h1>cXSpidy</h1>
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/movies/:movieName' component={SingleMovie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
