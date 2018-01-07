import React from 'react'
import './flag.css'
class Flag extends React.Component {
	constructor(props) {
		super(props)
		this.handleDrag = this.handleDrag.bind(this)
	}

	handleDrag(e) {
		this.props.dragStart(e.target.id)
	}

	render() 
	{
		return (
				<figure draggable="true" onDrag={this.handleDrag} id={this.props.id}>⚑</figure>
		)
	}
}

export default Flag