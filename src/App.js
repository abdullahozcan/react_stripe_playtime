import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import logo from './logo.svg';
import './App.css';
import { validate } from 'json-schema';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_API_KEY);

async function fetchCustomer() {
  var customerData = await stripe.customers.retrieve('cus_HPa9luwqRekiTv',
    function (err, customer) {
      // asynchronously called
      console.log('🔥🔥🔥', customer);
      return customer;
    })

  console.log(customerData);
  return customerData;
  // setCustomer1(customerData);
}

console.log(fetchCustomer());



function App() {
  const [customer1, setCustomer1] = useState([]);

  useEffect(() => {
    async function fetchCustomer() {
      var customerData = await stripe.customers.retrieve('cus_HPa9luwqRekiTv',
        function (err, customer) {
          // asynchronously called
          console.log('🔥🔥🔥', customer);
          return customer;
        })

      console.log(customerData);
      setCustomer1(customerData);
      console.log(customerData);
    }

    fetchCustomer();
  }, [])

  return (

    <div className="App">
      <Elements stripe={stripePromise}>
        <p>My stripe thing is loaded</p>
      </Elements>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


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
