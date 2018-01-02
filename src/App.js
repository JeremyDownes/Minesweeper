import React, { Component } from 'react'
import Game from './Components/Game/Game'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game onChange = {this.render}/>
      </div>
    );
  }
}

export default App
