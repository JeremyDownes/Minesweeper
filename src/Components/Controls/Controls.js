import React from 'react'
import Input from '../Input/Input.js'
import './controls.css'

class Controls extends React.Component {
	constructor(props) {
    super(props)
  	this.state = {}                                  // {Rows: number, Columns: number, Bombs: number}
  	this.updateState = this.updateState.bind(this)
  	this.startGame = this.startGame.bind(this)
  }

  updateState(field,number) {
  	let update = this.state
		update[field] = number
  	this.setState(update)
 	}

  startGame() {
    if (this.state.Bombs < this.state.Columns * this.state.Rows) {
      if(this.state.Rows && this.state.Columns && this.state.Bombs) {       // all defined by a number
      	this.props.startGame(this.state)
      }
    }
  }

	render() {			
		return (
			<ul>
        <li>Points<span>{this.props.points}</span></li>
				<li>Rows<Input field='Rows' onChange={this.updateState}/></li>					
				<li>Columns<Input field='Columns' onChange={this.updateState} /></li>
				<li>Bombs<Input field='Bombs' onChange={this.updateState} /></li>			
        <li>Play<button onClick={this.startGame} /></li>
			</ul>
		)
	}

}

export default Controls