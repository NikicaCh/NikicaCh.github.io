import React from 'react';
import './App.css';
import QRCode from 'qrcode.react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



//component imports
import ChooseMode from './components/chooseMode.js'
import Mobile from './components/mobile.js'
import Shredder from './components/shredder.js'
import Woman from './components/woman.js'




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route
              exact path="/"
              component={() => 
                <div>
                  <ChooseMode/> 
                  <QRCode value="https://shredder-app.herokuapp.com/mobile/123" />,
                </div>
              
              } />
          <Route exact path="/mobile" component={Mobile} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
