import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Semicircle from '../img/img2.png';
import {Link} from 'react-router-dom';
import SignUpFields from '../components/SignUpFields';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div id='img-cont'>
					<div id='home-header'>
						<h1>Rethinq</h1>
						<h2>A free peer to peer tutoring service</h2>
						<SignUpFields />
					</div>
					<div id='circle-cont'>
							<img src={Semicircle} alt='' />
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
