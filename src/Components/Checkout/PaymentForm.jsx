import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxios from '../../Hooks/AxiosHook/useAxios'

const PaymentForm = ({ total, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const axiosInstance = useAxios()
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      
      const res = await axiosInstance.post('/create-chechout-session',{ totalAmount : total });

      const { clientSecret } = await res.data;

      // 2. Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (stripeError) {
        throw stripeError;
      }

      // 3. Handle successful payment
      if (paymentIntent.status === 'succeeded') {
        console.log("success");
        navigate('/invoice', { state: { paymentId: paymentIntent.id } });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
          processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;