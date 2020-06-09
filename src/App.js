import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import logo from './logo.svg';
import './App.css';
import { validate } from 'json-schema';
import { useAsync } from 'react-async';

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


function App() {
  const { data: all_customers, error, isLoading } = useAsync({ promiseFn: loadUsers })


  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (all_customers)

    // let unique = [...new Set(data.map(item => item.Group))];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
