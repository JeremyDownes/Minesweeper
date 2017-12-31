import React from 'react';
import Controls from '../Controls/Controls';
import Board from '../Board/Board';
import Minesweeper from '../../Utils/minesweeper.js'

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {game: new Minesweeper(6,6,6)};
		this.startGame = this.startGame.bind(this);
		this.playMove = this.playMove.bind(this);
	}

	newGame(game) {
		this.setState({game: game});
	}

	async startGame(update) {
		let newGame = await new Minesweeper(update.Rows,update.Columns,update.Bombs);
		this.newGame(newGame);
	}

	playMove(data) {
		data= data.split(',');
		this.state.game.flipTile(Number(data[0]),Number(data[1]));
		this.render();
	}
 
	render() {
		return (
			<div>
				<Controls onStart={this.startGame}/>
				<Board handleClick={this.playMove} board={this.state.game} />
			</div>
		);
	}
}

export default Game;