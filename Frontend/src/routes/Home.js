import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
                <h3>A free peer to peer tutoring service</h3>
                {/* <Button variant='outline-dark'>Learn More!</Button> */}
			</div>
		);
	}
}

export default Home;
