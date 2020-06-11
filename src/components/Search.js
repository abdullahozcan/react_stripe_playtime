import React, { useState, useEffect } from 'react';
import '../App.css';

const people = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "YouTube"
];

function Search() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
        // console.log(searchTerm);
    };

    useEffect(() => {
        const results = people.filter(person =>
            person.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        console.log(searchResults);
    }, [searchTerm]);

    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul>
                {searchResults.map(item => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    )
};

export default Search;
