import React from 'react';
import Input from '../Input/Input.js';
import './controls.css';

class Controls extends React.Component {
	constructor(props) {
    super(props);
  	this.state = {};
  	this.updateState = this.updateState.bind(this);
  	this.startGame = this.startGame.bind(this);
  }

  setValue(update) {
  	this.setState(update);
  }

  updateState(field,number) {
  	let update = this.state;
		update[field] = number;
  	this.setValue(update);
 	}

  startGame() {
    if(this.state.Rows && this.state.Columns && this.state.Bombs) {       // all defined by a number
    	this.props.onStart(this.state);
    }
  }

	render() {			
		return (
			<ul>
				<li>Rows<Input field='Rows' onChange={this.updateState}/></li>					
				<li>Columns<Input field='Columns' onChange={this.updateState} /></li>
				<li>Bombs<Input field='Bombs' onChange={this.updateState} /></li>
				<li>Play<button onClick={this.startGame} /></li>
			</ul>
		);
	}

}

export default Controls;