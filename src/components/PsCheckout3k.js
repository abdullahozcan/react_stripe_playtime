import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Button from "@material-ui/core/Button";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_IYu0gaTp2CveAO2Oud1KiQzS');

function PsCheckout3k() {
    const handleClick = async (event) => {
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                // Replace with the ID of your price
                { price: 'price_1Gt8nPAmH5VbdPbpaSBek0Sa', quantity: 1 },
            ],
            mode: 'payment',
            successUrl: 'https://cpreact.com/success',
            cancelUrl: 'https://cpreact.com/cancel',
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };
    return (
        <Button variant="contained" color="primary" role="link" onClick={handleClick}>
            💰 1 Payment of $3,000
    </Button>
    );
}

export default PsCheckout3k;