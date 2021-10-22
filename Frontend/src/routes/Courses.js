import React, { useContext, useEffect, useRef, useState } from "react";
import CourseContext from "../context/course-context/CourseContext";
import LinearProgress from "@mui/material/LinearProgress";
import CourseCard from "../components/Courses/CourseCard";
import fuzzySearch from "../utils/fuzzySearch";
import { nanoid } from "nanoid";
import parse from "html-react-parser";
// fuzzySearch(text, search)

const Courses = (props) => {
    const { getCourses, courses, loading } = useContext(CourseContext);

    const [matchedCourses, setMatchedCourses] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    // const [currentItem, setCurrentItem] = useState();

    const inputRef = useRef();
    useEffect(() => {
        getCourses();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const matchedCourses = [];
        // const searchValue = inputRef.current.value.toLowerCase();

        // courses.map((course) => {
        //     let courseName = course.name.toLowerCase();
        //     if (courseName.includes(searchValue)) {
        //         matchedCourses.push(course);
        //     }
        // });
        // console.log("matchedCourses are : ", matchedCourses);
        // console.log(searchValue);
    };
    const handleSearch = (e) => {
        setShowSuggestions(true);
        let search = e.target.value;
        let searchResults = [];

        courses.forEach((course) => {
            searchResults.push({
                fuzzyName: fuzzySearch(course.name, search),
                course,
            });
            // console.log(searchResults);
        });
        setMatchedCourses(searchResults);
        // console.log(Array.isArray(matchedCourses));
        if (e.target.value === "") {
            setShowSuggestions(false);
        }
    };

    const handleBlur = () => {
        setShowSuggestions(false);
    };
    const handleFocus = (e) => {
        if (e.target.value !== "") setShowSuggestions(true);
    };

    return (
        <div>
            <h1 className='display-1'>Courses</h1>
            <form onSubmit={handleSubmit} onChange={handleSearch}>
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Find Courses...'
                    className='form-control search-field'
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                <button type='submit' hidden>
                    submit
                </button>
            </form>
            <br />
            {showSuggestions && (
                <ul className='/* suggestions-container */ recipe-card-container'>
                    {/* {matchedCourses?.map(
                        (matchedCourse) =>
                            matchedCourse !== "" && (
                                <li key={nanoid()}>{parse(matchedCourse)}</li>
                            )
                    )} */}

                    {matchedCourses.map(
                        (matchedCourse) =>
                            matchedCourse.fuzzyName !== "" && (
                                // <li key={nanoid()}>{parse(matchedCourse)}</li>
                                <CourseCard
                                    courseContent={matchedCourse.course}
                                    key={nanoid()}
                                />
                            )
                    )}
                </ul>
            )}
            {/* <div className='recipe-card-container'>
                {courses !== [] && !loading ? (
                    courses.map((course) => {
                        console.log(course);
                        return (
                            <CourseCard
                                courseContent={course}
                                key={course._id}
                            />
                        );
                    })
                ) : (
                    <LinearProgress />
                )}
            </div> */}
        </div>
    );
};

export default Courses;
