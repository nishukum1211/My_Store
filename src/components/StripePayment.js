import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

// Replace with your actual Stripe public key
const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

const StripePayment = () => {
    const location = useLocation(); // Get product data from navigation state
    const { item } = location.state || {}; // Fallback in case state is undefined

    return (
        <div className='payment-container'>
            {item ? (
                <>
                    <h1>Proceed to Pay for {item.name}</h1>
                    <h3>Price: {item.price}</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm product={item} />
                    </Elements>
                </>
            ) : (
                <h1>No product selected</h1>
            )}
        </div>
    );
};

export default StripePayment;
