import React, {Component} from 'react';
import Semicircle from '../img/img2.jpeg';
import LoginFields from '../components/LoginFields';
import Fade from 'react-bootstrap/Fade'

export class Home extends Component {

	render() {
		return (
			<div>
				<div id='home-content'>
					<div id='img-cont'>
						<div>
							<h1 id='home-header'>Rethinq</h1>
							<p id='sub-header'>A free peer to peer tutoring service</p>
							<LoginFields />
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
