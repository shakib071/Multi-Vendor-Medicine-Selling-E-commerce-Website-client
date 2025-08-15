import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { FaCreditCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import PaymentForm from "./PaymentForm";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const total = location.state || 0;
  const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Publisher_key);

  return (
    <div className="max-w-3xl text-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2 mb-6">
        <MdPayment className="text-green-500" /> Checkout
      </h1>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        <div className="flex gap-5 text-gray-700">
          <span>Grand Total:</span>
          <span className="font-bold text-xl text-green-600">${total}</span>
        </div>
      </div>

      {/* Secure Stripe Payment Form */}
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FaCreditCard /> Secure Payment
          </h3>
          <Elements stripe={stripePromise}>
            <PaymentForm total={total} navigate={navigate} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;