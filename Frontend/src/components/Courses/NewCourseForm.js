import React, {useContext, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context/AuthContext';
import CourseContext from '../../context/course-context/CourseContext';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const NewCourseForm = ( ) => {
    
    const authContext = useContext(AuthContext);
	const courseContext = useContext(CourseContext);

	const {user, loading} = authContext;
	const {addCourse} = courseContext
	
    let history = useHistory();

    const [course, setCourse] = useState({
		name: '',
		courseid: '',
		description: '',
		majors: '',
		tutors: ''
	});

	useEffect(() => {
		authContext.loadUser();
	}, [course]);


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
		setCourse(inputs => ({
			...inputs,
			[event.target.id]: event.target.value
		}));
	};

	return (
		<div>
            <Form onSubmit={handleCourseSubmit}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Name'
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
		</div>
	);
}

export default NewCourseForm;