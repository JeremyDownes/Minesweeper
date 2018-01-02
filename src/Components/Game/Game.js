import React from 'react'
import Controls from '../Controls/Controls'
import Board from '../Board/Board'
import Minesweeper from '../../Utils/minesweeper.js'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new Minesweeper(6,6,6)}					// When the game is constructed we initiate a new game so we have something to render
		this.startGame = this.startGame.bind(this)
		this.playMove = this.playMove.bind(this)
	}

	newGame(game) {
		this.setState({game: game});
	}

	async startGame(update) {																// async to make sure we have the new game object before setting state 
		let newGame = await new Minesweeper(update.Rows,update.Columns,update.Bombs)   // The update object is passed in from the Controls component
		this.newGame(newGame);
	}

	playMove(data) {
		data= data.split(',')																// I'm returning a string but need an array
		this.state.game.flipTile(Number(data[0]),Number(data[1])) // we are flipping tiles of the current minesweeper instance with values passed in from the Board component 
		this.state.game.hasSafeTiles													// This method call was part of the original Game class's playMove method. decrements tileCount
	}
 
	render() {
		return (
			<div>
				<Controls onStart={this.startGame}/>
				<Board handleClick={this.playMove} board={this.state.game} />
			</div>
		)
	}
}

export default Game;