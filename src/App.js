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
import TextLoop from "react-text-loop";



// This will inject the Stripe.js script on your site for you
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

function App() {
  return (

    <div className="App">

      <header className="App-header">
        <h2>
          <span style={{ color: "#ff9d00" }}>Clever Programmer </span> Headquarters where you
          <TextLoop springConfig={{ stiffness: 340, damping: 30 }}>
            <span style={{ color: 'green' }}>&#8287;increase your sales 🤑</span>
            <span style={{ color: '#9D44B5' }}>&#8287;monitor biz metrics 🔥</span>
            <span style={{ color: "#DE3C4B" }}>&#8287;unlock your potential 📈</span>
          </TextLoop>
        </h2>
        <span><PsCheckout500 />
          <Box m="0.4rem" />
          <BasicCheckout /></span>
        <br />
        <span><PsCheckoutDeposit500 /> <PsCheckout3k /></span>
        <Box m="0.4rem" />
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
