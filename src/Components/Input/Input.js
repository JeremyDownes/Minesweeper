import React from 'react'
import './input.css'

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		let input = e.target.value;
		if(input > 0 || input === '') {    //  react is great in that you can just validate your forms in inline like this. We don't want 0 or any letters
			if (input === '') {
			 input = undefined								// this way an empty string will trigger false
			}
			this.props.onChange(this.props.field,input)
		}
	}

	render() {
		return (
			<input onChange={this.handleChange}/>
		);
	}
}

export default Input