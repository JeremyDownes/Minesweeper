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
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
	}

	newGame(game) {
		this.setState({game: game});
	}

	async startGame(update) {																// async to make sure we have the new game object before setting state 
		let newGame = await new Minesweeper(update.Rows,update.Columns,update.Bombs)   // The update object is passed in from the Controls component
		this.newGame(newGame);
	}

	clear(position) {
		this.neighborOffsets.forEach(offset=> {
			let x = offset[0]+position[0]
			let y = offset[1]+position[1];
			if(x >= 0 && y >= 0 && x < this.state.game.playerBoard.length && y < this.state.game.playerBoard[0].length) {
				if(this.state.game.playerBoard[x][y] === ' ') {
					this.playMove(x+','+y)
				}
			}	
		})
	}

	playMove(data) {
		data= data.split(',')																// I'm returning a string but need an array
		this.state.game.flipTile(Number(data[0]),Number(data[1])) // we are flipping tiles of the current minesweeper instance with values passed in from the Board component 
		this.state.game.hasSafeTiles													// This method call was part of the original Game class's playMove method. decrements tileCount
		if(this.state.game.playerBoard[Number(data[0])][Number(data[1])] === 0) {
			this.clear([Number(data[0]),Number(data[1])]);
		}
		let game = this.state.game
		this.setState({game: game})
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