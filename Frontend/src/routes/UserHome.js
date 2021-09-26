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
				<div id="user-home-topbar">
					<h1>John Doe</h1>
				</div>
				<hr />
				<div id="user-home-tutors">
					<h2>Current Tutors</h2>
				</div>
				<hr />
				<div id="user-home-courses">	
					<div className='flex-row'>
						<h2>Current Courses</h2>
						<Button>Add</Button>
					</div>
					<hr />
					
				</div>
			</div>
		);
	}
}

export default Home;
