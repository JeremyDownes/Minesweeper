import React from 'react'
import Controls from '../Controls/Controls'
import Board from '../Board/Board'
import Minesweeper from '../../Utils/minesweeper.js'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new Minesweeper(3,3,1), gameVars: {Rows: 3, Columns: 3, Bombs: 1}}					// When the game is constructed we initiate a new game so we have something to render
		this.startGame = this.startGame.bind(this)
		this.playMove = this.playMove.bind(this)
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		this.points = 0;
		this.magnitude = this.state.game.playerBoard.length * this.state.game.playerBoard[0].length
	}

	newGame(game, update) {
		this.magnitude = this.state.game.playerBoard.length * this.state.game.playerBoard[0].length
		this.setState({game: game, gameVars: update});
	}

	async startGame(update = this.state.gameVars) {																// async to make sure we have the new game object before setting state 
		let newGame = await new Minesweeper(update.Rows,update.Columns,update.Bombs)   // The update object is passed in from the Controls component
		this.newGame(newGame, update);
	}

	clear(x,y) {	
		this.neighborOffsets.forEach(offset=> {
			if (this.state.game.hasSafeTiles === 0) {
				return
			}
			let fX = offset[0]+x
			let fY = offset[1]+y
			if(fX >= 0 && fY >= 0 && fX < this.state.game.playerBoard.length && fY < this.state.game.playerBoard[0].length) {
				if(this.state.game.playerBoard[fX][fY] === ' ') {
					this.playMove(fX,fY)
					return
				}
			}	
		})
	}

	playMove(x,y,stop) {
		this.state.game.flipTile(x,y) // we are flipping tiles of the current minesweeper instance with values passed in from the Board component 
		if(this.state.game.playerBoard[x][y] === 'B') {
			this.points-= this.magnitude
			this.startGame()
			return
		} else { 
			this.points++
		}
		if (this.state.game.hasSafeTiles === 0) {
		  let upgrade = {Rows: Number(this.state.gameVars.Rows) + 1, Columns: Number(this.state.gameVars.Columns) + 1, Bombs: Number(this.state.gameVars.Bombs) + 1}
			alert("You Win!!!")
			this.points+= this.magnitude 
			this.startGame(upgrade)
			return
		}
		if(this.state.game.playerBoard[x][y] === 0) {
			this.state.game.playerBoard[x][y] = ''
			this.clear(x,y);
		}
		let game = this.state.game
		this.setState({game: game})
	}
 
	render() {
		return (
			<div>
				<Controls startGame={this.startGame} points = {this.points}/>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame}/>
			</div>
		)
	}
}

export default Game;