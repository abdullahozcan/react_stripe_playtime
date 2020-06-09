import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-async';
import logo from './logo.svg';
import './App.css';

let params = { limit: 20 }
const stripe_auth = { "Authorization": `Bearer ${process.env.REACT_APP_STRIPE_API_KEY}` }
const stripe_url = `https://api.stripe.com/v1/customers?limit=${params.limit}`;

// Then we'll fetch user data from this API

// https://css-tricks.com/fetching-data-in-react-using-react-async/
// https://www.freecodecamp.org/forum/t/fetch-api-with-api-key/317584
const loadUsers = async () =>
  await fetch(stripe_url, {
    method: "GET",
    headers: stripe_auth
  }).then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());


function App() {
  const { data: all_customers, error, isLoading } = useAsync({ promiseFn: loadUsers });
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`

  // Get only unique by expanding a Set of the same information
  let unique = [...new Set(all_customers.data.map(item => item.email))];

  if (all_customers)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{unique.map(email => (
            <p>{email}</p>
          ))}</p>
          <p>
            Qazi is working on this app right now... <code>src/App.js</code> and
            save to reload.
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
