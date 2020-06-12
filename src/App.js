import React from 'react';
import logo from './logo.svg';
import Search from './components/Search';
import SnackyBar from './components/SnackyBar';
import StripeList from './components/StripeList';
import { loadStripe } from '@stripe/stripe-js';
import BasicCheckout from './components/BasicCheckout';
import Box from '@material-ui/core/Box';
import PsCheckout500 from './components/PsCheckout500';
import PsCheckoutDeposit500 from './components/PsCheckoutDeposit500';
import PsCheckout3k from './components/PsCheckout3k';


// This will inject the Stripe.js script on your site for you
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

function App() {
  return (

    <div className="App">


      <header className="App-header">
        <h2>Welcome to <span style={{ color: "#ff9d00" }}>Clever Programmer </span> Headquarters 🚀</h2>
        <span><BasicCheckout /> <PsCheckoutDeposit500 /></span>
        <br />
        <span><PsCheckout3k /> <PsCheckout500 /></span>
        <Box m="1rem" />
        <StripeList />
        <Box m="1rem" />
        <SnackyBar />
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
