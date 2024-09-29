// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm = ({ product }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [paymentStatus, setPaymentStatus] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: cardElement,
//         });

//         if (error) {
//             setPaymentStatus(error.message);
//         } else {
//             // In a real application, you would send the paymentMethod and product details
//             // to your server to process the payment.
//             setPaymentStatus(`Payment successful for ${product.name} at ${product.price}!`);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" disabled={!stripe}>Pay {product.price}</button>
//             <div>{paymentStatus}</div>
//         </form>
//     );
// };

// export default CheckoutForm;

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);  // Start loading

        const cardElement = elements.getElement(CardElement);

        // Step 1: Create payment method with card details
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentStatus(error.message);
            setIsLoading(false);  // Stop loading
        } else {
            // Step 2: Send payment method and product details to your backend
            try {
                const response = await fetch('http://localhost:8080/create-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethodId: paymentMethod.id,
                        product, // Send product details (name, price)
                    }),
                });

                const data = await response.json();

                if (data.error) {
                    setPaymentStatus(data.error);
                } else {
                    setPaymentStatus(`Payment successful for ${product.name} at ${product.price}!`);
                }
            } catch (err) {
                setPaymentStatus('Payment failed. Please try again.');
            } finally {
                setIsLoading(false);  // Stop loading
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || isLoading}>
                {isLoading ? 'Processing...' : `Pay ${product.price}`}
            </button>
            <div>{paymentStatus}</div>
        </form>
    );
};

export default CheckoutForm;

