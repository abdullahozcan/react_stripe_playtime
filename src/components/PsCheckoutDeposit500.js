import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Button from "@material-ui/core/Button";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_IYu0gaTp2CveAO2Oud1KiQzS');

function PsCheckoutDeposit500() {
    const handleClick = async (event) => {
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                // Replace with the ID of your price
                { price: 'price_1Gt8H2AmH5VbdPbplEUMTZ9p', quantity: 1 },
            ],
            mode: 'payment',
            successUrl: 'https://dashboard.stripe.com/test/payments',
            cancelUrl: 'https://cpreact.com',
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };
    return (
        <Button variant="contained" color="primary" role="link" onClick={handleClick}>
            💰 1 Payment of $500
    </Button>
    );
}

export default PsCheckoutDeposit500;