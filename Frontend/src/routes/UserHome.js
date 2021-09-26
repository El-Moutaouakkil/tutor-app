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
                <h3>UserHome</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, quos corporis nihil enim perspiciatis recusandae hic tempora, autem ab quod optio aspernatur sapiente rerum iure qui non quasi deleniti tempore!</p>
			</div>
		);
	}
}

export default Home;
