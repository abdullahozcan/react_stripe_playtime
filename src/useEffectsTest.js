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
const stripe_url = "https://api.stripe.com/v1/customers";

const all_customers_hook = async () =>
  await stripe.customers.list(
    { limit: 3 },
    function (err, customers) {
      // asynchronously called
      return customers
    }
  );

// Then we'll fetch user data from this API

const loadUsers = async () =>
  await fetch(stripe_url, {
    method: "GET",
    headers: stripe_auth
  }).then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())


function App() {
  const { allCustomers, error, isLoading } = useAsync({ promiseFn: loadUsers })


  const [all_customers, set_all_customers] = useState([]);

  useEffect(() => {
    set_all_customers(stripe.customers.list(
      { limit: 3 },
      function (err, customers) {
        // asynchronously called
        return customers
      }
    ));
  }, [])


  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (allCustomers)

    return (
      <div className="container">
        <p>{console.log(allCustomers.data[0].email)}</p>
      </div>
    );
}

export default App;
