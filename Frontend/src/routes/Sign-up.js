import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Semicircle from '../img/img2.jpeg';
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
				<div id='home-content'>
					<div id='img-cont'>
						<div>
							<h1 id='home-header'>Rethinq</h1>
							<p id='sub-header'>A free peer to peer tutoring service</p>
							<SignUpFields />
						</div>
						<div id='circle-cont'>
								<img src={Semicircle} alt='' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
