import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import logo from './logo.svg';
import './App.css';
import { useAsync } from 'react-async';
import ReactDOM from "react-dom";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_API_KEY);
const stripe_auth = { "Authorization": `Bearer ${process.env.REACT_APP_STRIPE_API_KEY}` }
let params = { limit: 11 }
const stripe_url = `https://api.stripe.com/v1/customers?limit=${params.limit}`;


// Then we'll fetch user data from this API

// https://css-tricks.com/fetching-data-in-react-using-react-async/
// https://www.freecodecamp.org/forum/t/fetch-api-with-api-key/317584
const loadUsers = async () =>
  await fetch(stripe_url, {
    method: "GET",
    headers: stripe_auth
  }).then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];


function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const { data: all_customers, error, isLoading } = useAsync({ promiseFn: loadUsers })


  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (all_customers)

    // let unique = [...new Set(data.map(item => item.Group))];

    return (
      <div className="App">
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

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <p>{all_customers.data.map(user => (
            <p>{user.email}</p>
          ))}</p>
          <p>
            Qazi is working on this app right now... <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>

      </div>
    )
}

export default App;
