import React from 'react';
import Square from '../Square/Square';
import './board.css';



class Board extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(data) {
		this.props.handleClick(data);
	}
	
	render() {

		let style = {
		  gridTemplateColumns: '1fr '.repeat(this.props.board.playerBoard[0].length),
 		  gridTemplateRows: '1fr '.repeat(this.props.board.playerBoard.length)
		};
		let iRow = -1;
		let iColumn =-1;

		return (
			<div className='board' style={style}>

				{this.props.board.playerBoard.map(row=> {
					iRow++;
					return row.map(square=> {
						iColumn++;
						iColumn=iColumn%this.props.board.playerBoard[0].length;
						let myRow = iRow;
						let myColumn = iColumn;
						return <Square board={this.props.board} position={[myRow,myColumn]} handleClick={this.handleClick} /> ;
					})
				})
				}
				</div>		);
	}
}

export default Board;