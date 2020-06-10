import React from 'react';
import { useAsync } from 'react-async';
import logo from './logo.svg';
import Search from './components/Search';
import SnackyBar from './components/SnackyBar';
import PrettyButton from './components/PrettyButton';
import LogRocket from 'logrocket';
import StripeList from './components/StripeList';

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


function App() {


  return (
    <div className="App">

      <header className="App-header">
        <SnackyBar />
        <StripeList />

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
