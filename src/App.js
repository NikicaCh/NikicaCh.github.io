import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



//component imports
import ChooseMode from './components/chooseMode.js'
import Mobile from './components/mobile.js'
import Shredder from './components/shredder.js'
import Woman from './components/woman.js'
import Story from './components/story';




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route
              exact path="/"
              component={() => 
                <div>
                  <ChooseMode /> 
                </div>
              
              } />
          <Route exact path="/mobile" component={Mobile} />
          <Route exact path="/story" component={Story} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
