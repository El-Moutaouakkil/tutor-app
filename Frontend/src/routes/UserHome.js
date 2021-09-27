import React, {useContext, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';
import CourseContext from '../context/course-context/CourseContext';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from 'react-bootstrap/Modal'
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const UserHome = (props) => {

	const authContext = useContext(AuthContext);
	const courseContext = useContext(CourseContext);

	const {user, loading} = authContext;
	const {addCourse} = courseContext
	let history = useHistory();

	const [show, setShow] = useState(false);
	const [course, setCourse] = useState({
		name: '',
		courseid: '',
		description: '',
		majors: '',
		tutors: ''
	});

	// const modalRoot = document.getElementById("modal-root"); // A div with id=modal-root in the index.html
	// const [element] = useState(document.createElement("div")); // Create a div element which will be mounted within modal-root

	useEffect(() => {
		// modalRoot.appendChild(element);
		authContext.loadUser();
		// return function cleanup() {
		// 	modalRoot.removeChild(element);
		//   };
	}, [course, show]);


	const handleCourseSubmit = e => {
		e.preventDefault();
		if (!course) return;
		addCourse(course);
		setCourse({
			name: '',
			courseid: '',
			description: '',
			majors: '',
			tutors: ''
		});
		history.push('/course');
	};

	const handleCourseChange = event => {
        event.persist();
		// setCourse(inputs => ({
		// 	...inputs,
		// 	[event.target.id]: event.target.value
		// }));
	};

	function AddCourseModal() {
		
		const [show, setShow] = useState(false);
		const handleClose = () => setShow(false);
		const handleShow = () => setShow(true);

		return (
		  <>
			<Button variant="dark" onClick={handleShow}>
			Create
			</Button>
	  
			<Modal show={show} id="modal-root">
			  <Modal.Header>
				<Modal.Title>Create New Course</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>

			  <Form onSubmit={handleCourseSubmit}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Name'
							value={course.name}
							required
							onChange={handleCourseChange}
						/>
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId='courseid'>
							<Form.Label>Course ID:</Form.Label>
							<Form.Control
								type='text'
								placeholder='CIS5900'
								onChange={handleCourseChange}
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group controlId='majors'>
						<Form.Label>Major</Form.Label>
						<Form.Control
							as='select'
							onChange={handleCourseChange}
							required
						>
							<option value='CS' selected>
								Computer Science
							</option>
							<option value='BIO'>Biology</option>
							<option value='CHEM'>Chemistry</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId='description'>
						<Form.Label>Description</Form.Label>
						<Form.Control 
							as="textarea" 
							onChange={handleCourseChange} 
							rows={3} />
					</Form.Group>

					<hr />
					<Button
						variant='outline-success'
						size='lg'
						block
						type='submit'
					>
						Create!
					</Button>
				</Form>

			  </Modal.Body>
			  <Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
				  Close
				</Button>
				{/* <Button variant="primary" onClick={handleClose}>
				  Save Changes
				</Button> */}
			  </Modal.Footer>
			</Modal>
		  </>
		);
	  }

	
	  const renderBadge = () => {
		if(user.userType == 3){
			return <span className="badge bg-warning">Admin</span>;
		}
		else if (user.userType == 2) {
			return <span className="badge bg-success">Tutor</span>;
		} 
		else {
			return;
		}
    }

	const renderTutorSection = () => {
		if(user.userType == 3){
			return (
				<div id="user-home-tutors">
					<h2>Manage Tutors</h2>
				</div>
		)}
		else if (user.userType == 2) {
			return( 
				<div id="user-home-tutors">
					<h2>Current Students</h2>
				</div>
		)} 
		else {
			return(
				<div id="user-home-tutors">
					<h2>Current Tutors</h2>
				</div>
		)}
	}

	const renderCourseSection = () => {
		if(user.userType == 3){
			return(
				<div id="user-home-courses">	
					<div className='flex-row'>
						<h2>Manage Courses</h2>
						<AddCourseModal/>
					</div>
					<hr />
				</div>
		)}
		else if (user.userType == 2) {
			return(
				<div id="user-home-courses">	
					<div className='flex-row'>
						<h2>Tutoring Courses</h2>
						<Button variant="dark">Add</Button>
					</div>
					<hr />
				</div>
		)} 
		else {
			return(
				<div id="user-home-courses">	
					<div className='flex-row'>
						<h2>Current Courses</h2>
						<Button variant="dark">Add</Button>
					</div>
					<hr />
				</div>
		)}
	}

	return (
		<div>
			{user !== null && !loading ? (
				<div>
					<div id="user-home-topbar">
						<h1>{user.fname} {user.lname} </h1> <h1>{renderBadge()}</h1>
					</div>
					<hr />
					{renderTutorSection()}
					<hr />
					{renderCourseSection()}
				</div>
            ): (
				<LinearProgress />
			)}
		</div>
	);
}

export default UserHome;
