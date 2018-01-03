import React from 'react'
import './input.css'

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		let input = e.target.value;
		if(input > 0 || input === '') {    //  react is great in that you can just validate your forms in inline like this. We don't want 0 or any letters but we want a trigger on empty
			if (input === '') {
			 input = undefined								// an empty string should trigger false in Controls so we update Controls state to undefined on a deletion event
			}
			this.props.onChange(this.props.field,input)		// will update the Controls state of whatever field this is
		}
	}

	render() {
		return (
			<input onChange={this.handleChange}/>
		)
	}
}

export default Input