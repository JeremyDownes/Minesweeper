import React from 'react'
import Controls from '../Controls/Controls'
import Board from '../Board/Board'
import Minesweeper from '../../Utils/minesweeper.js'
import Flag from '../Flag/Flag'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new Minesweeper(3,3,1), gameVars: {Rows: 3, Columns: 3, Bombs: 1}}					// When the game is constructed we initiate a new game so we have something to render
		this.startGame = this.startGame.bind(this)
		this.playMove = this.playMove.bind(this)
		this.handleDrop = this.handleDrop.bind(this)
		this.flagDrag = this.flagDrag.bind(this)
		this.checkFlagged = this.checkFlagged.bind(this)
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		this.points = 0;
		this.magnitude = this.state.game.playerBoard.length * this.state.game.playerBoard[0].length
		this.flagId = null
		this.flagged = {}
	}

	newGame(game, update) {
		this.magnitude = this.state.game.playerBoard.length * this.state.game.playerBoard[0].length
		for(let i=0; i<this.state.gameVars.Bombs; i++) {
			document.getElementById('base').insertAdjacentElement('beforeend',document.getElementById(i))
		}
		this.flagged = {}
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

	playMove(x,y) {
		if(!this.checkFlagged(x,y)) {
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
	}

	checkFlagged(x,y) {
		let isFlagged = false
		let position = [x,y]
		let flags = Object.values(this.flagged).forEach(flag=> {
			if(String(flag) === String(position)) {
				isFlagged = true
			} 
		})
		return isFlagged
	}

	flagDrag(id) {
			this.flagId = id
	}

	handleDrop(e,location) {
		this.flagged[this.flagId] = location
		e.target.insertAdjacentElement('beforeend',document.getElementById(this.flagId))
	}

	allowDrop(e) {
		e.preventDefault()
	}
 
	render() {
		let bombs = this.state.gameVars.Bombs
		bombs = Array.apply(null,Array(bombs)).map(function (x,i) {return i})
		return (
			<div>
				<Controls startGame={this.startGame} points = {this.points} dragStart={this.flagDrag} bombs={bombs}/>
				<div onDragOver={this.allowDrop} onDrop={this.handleDrop} style={{height: '.75rem',position: 'relative', bottom: '.3rem'}} id='base'>
					{bombs.map(bomb=> <Flag dragStart={this.flagDrag} id={bomb}/>)}
				</div>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame} handleDrop={this.handleDrop}/>
			</div>
		)
	}
}

export default Game;