import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxios from '../../Hooks/AxiosHook/useAxios'
import useUserCartMed from '../../Hooks/getUserCart/useUserCartMed';
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';
import useSaleBuyId from '../../Hooks/getSaleBuyId/useSaleBuyId';

const PaymentForm = ({ total, navigate }) => {
  const stripe = useStripe();
  const {user,loading}= useAuth();
  const elements = useElements();
  const [error, setError] = useState(null);
  const axiosInstance = useAxios()
  const [processing, setProcessing] = useState(false);
  const {data:cartData, isLoading} = useUserCartMed(user?.uid);
  const {data:buysaleid, isLoading:bsLoading} = useSaleBuyId();
  console.log(buysaleid?.idSB);

  const  addSaleToSalerInDatabase = async() => {
    
    const medicines = cartData?.medicines;
    const length = medicines?.length || 0;
    for(let i=0;i<length;i++){
      console.log(medicines[i]);
      const {saler , ...medicine}= medicines[i];
      // console.log('saler os',saler?.uid,medicine);
      medicine.paid_status = "pending";
      medicine.buyerName = user?.displayName;
      medicine.sbId= buysaleid?.idSB;
      const res = await axiosInstance.post(`/saler-sold-items/${saler?.uid}`,{soldItems:medicine});
      console.log(res.data);
    }
  }


  const addUserPurchasedToDatabase = async(transaction_ID) => {
    const medicines = cartData?.medicines;
    const length = medicines?.length || 0;
      for(let i=0;i<length;i++){
      console.log(medicines[i]);
      const {saler , ...medicine}= medicines[i];
      medicine.paid_status = "pending";
      medicine.transaction_ID = transaction_ID,
      medicine.sbId= buysaleid?.idSB;
      console.log('user info',user?.uid,medicine);
      const res = await axiosInstance.post(`/user-purchased-items/${user?.uid}`,{purchasedItem:medicine});
      console.log(res.data);
    }
  }
  



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || bsLoading) {
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
        addSaleToSalerInDatabase();
        addUserPurchasedToDatabase(paymentIntent.id);
        navigate('/invoice', { state: { paymentId: paymentIntent.id } });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if(loading || isLoading){
    return <Loading></Loading>;
  }

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