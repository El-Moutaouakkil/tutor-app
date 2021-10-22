import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/auth-context/AuthContext";
import UserContext from "../context/user-context/UserContext";
import LinearProgress from "@mui/material/LinearProgress";
import TutorCard from "../components/Tutors/TutorCard";
import { nanoid } from "nanoid";
import fuzzySearch from "../utils/fuzzySearch";

const Tutors = (props) => {
    const { users, loading, getTutors } = useContext(UserContext);
    const [matchedTutors, setMatchedTutors] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        getTutors();
    }, []);

    /* ======== logic to search for tutors */

    const inputRef = useRef();
    useEffect(() => {
        getTutors();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const matchedTutors = [];
        // const searchValue = inputRef.current.value.toLowerCase();

        // Tutors.map((Tutor) => {
        //     let TutorName = Tutor.name.toLowerCase();
        //     if (TutorName.includes(searchValue)) {
        //         matchedTutors.push(Tutor);
        //     }
        // });
        // console.log("matchedTutors are : ", matchedTutors);
        // console.log(searchValue);
    };
    const handleSearch = (e) => {
        setShowSuggestions(true);
        let search = e.target.value;
        let searchResults = [];

        users.forEach((user) => {
            searchResults.push({
                fuzzyName: fuzzySearch(user.fname, search),
                // fuzzyLName: fuzzySearch(user.lname, search),
                user,
            });
            console.log(searchResults);
        });
        setMatchedTutors(searchResults);
        // console.log(Array.isArray(matchedTutors));
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

    /* ================================= */
    return (
        <div>
            <h1 className='display-1'>Tutors</h1>
            <form>
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Find Tutors...'
                    className='form-control search-field'
                    onSubmit={handleSubmit}
                    onChange={handleSearch}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
            </form>
            <br />
            {showSuggestions && (
                <ul className=' recipe-card-container'>
                    {matchedTutors?.map(
                        (matchedTutor) =>
                            matchedTutor.fuzzyName !== "" && (
                                /* matchedTutor.fuzzyLName !== "" && */ // <li key={nanoid()}>{parse(matchedCourse)}</li>
                                <TutorCard
                                    tutorContent={matchedTutor.user}
                                    key={nanoid()}
                                />
                            )
                    )}
                </ul>
            )}
        </div>
    );
};

export default Tutors;
