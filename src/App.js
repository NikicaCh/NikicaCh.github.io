import React from 'react';
import './App.css';

//component imports
import Shredder from './components/shredder.js'
import Woman from './components/woman.js'


function App() {
  return (
    <div className="App">
      <Shredder />
      <Woman type={"sitting"}/>
    </div>
  );
}

export default App;
