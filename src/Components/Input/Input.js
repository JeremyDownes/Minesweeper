import React from 'react';
import './input.css'

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		let input = e.target.value;
		if(input > 0 || input === '') {
			if (input === '') {
			 input = undefined
			}
			this.props.onChange(this.props.field,input);
		}
	}

	render() {
		return (
			<div>
			<input onChange={this.handleChange}/>
			</div>
		);
	}
}

export default Input;