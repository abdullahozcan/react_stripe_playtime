import React from 'react';
import logo from './logo.svg';
import Search from './components/Search';
import SnackyBar from './components/SnackyBar';
import LogRocket from 'logrocket';
import StripeList from './components/StripeList';
import { StaticKitProvider } from '@statickit/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import FixedCharge from './components/FixedCharge';
import BasicCheckout from './components/BasicCheckout';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PsCheckout500 from './components/PsCheckout500';
import PsCheckoutDeposit500 from './components/PsCheckoutDeposit500';


// This will inject the Stripe.js script on your site for you
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

LogRocket.init('usduoh/clever-programmer-react-apps');

LogRocket.identify('123456', {
  name: 'Sonic the Hedgehog',
  email: 'gottacodefast@gmail.com',

  subscriptionType: 'premium',
  favoriteFood: 'chili dogs'
});


let params = { limit: 20 }
const stripe_auth = { "Authorization": `Bearer ${process.env.REACT_APP_STRIPE_API_KEY}` }
const stripe_url = `https://api.stripe.com/v1/customers?limit=${params.limit}`;


// https://css-tricks.com/fetching-data-in-react-using-react-async/
// https://www.freecodecamp.org/forum/t/fetch-api-with-api-key/317584
const loadCustomers = async () =>
  await fetch(stripe_url, {
    method: "GET",
    headers: stripe_auth
  }).then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());


function App({ Component, pageProps }) {


  return (

    <div className="App">


      <header className="App-header">
        <h2>Welcome to <span style={{ color: "#ff9d00" }}>Clever Programmer </span> Headquarters 🚀</h2>
        <span><BasicCheckout /> <PsCheckoutDeposit500 /></span>
        <br />
        <PsCheckout500 />
        <Box m="1rem" />
        <StripeList />
        <Box m="1rem" />
        <SnackyBar />


        {/* <StaticKitProvider site={String(process.env.siteId)}>
          <Elements stripe={stripePromise}>

            <div className="antialiased bg-gray-900 h-full min-h-screen">

              <FixedCharge />
            </div>
          </Elements>
        </StaticKitProvider> */}

        <Search />
        <img src={logo} className="App-logo" alt="logo" />
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
