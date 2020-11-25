import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



//component imports
import ChooseMode from './components/chooseMode'
import Mobile from './components/mobile'
import Shredder from './components/shredder'
import Story from './components/story';




function App() {

  const [scroll, setScroll] = useState(false)

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route
              exact path="/"
              component={() => 
                <div>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" onClick={() => {
                    setScroll(!scroll)
                  }}/>
                  <ChooseMode scroll={scroll}/> 
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
