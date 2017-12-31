import React from 'react';
import './square.css'

class Square extends React.Component {
	constructor(props) {
		super(props);
		this.position = this.props.position;
		this.state = {squareContent: this.props.board.playerBoard[this.position[0]][this.position[1]]}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.handleClick(e.target.value);
		this.setState({squareContent: this.props.board.playerBoard[this.position[0]][this.position[1]]});
		if (this.props.board.playerBoard[this.position[0]][this.position[1]] === 'B') {
			alert('BOOM!!!');
			window.location.reload();
		}
	}

	render() {
		return (
		  <button className='square' value = {this.props.position} onClick={this.handleClick}>
	  		{this.state.squareContent}
		  </button>
		)
	}
}

export default Square;