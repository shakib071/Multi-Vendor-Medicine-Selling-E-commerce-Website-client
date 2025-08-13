// src/components/Checkout.jsx
import { FaCreditCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const fakeTotal = 245.75; // Fake grand total

  const handlePay = () => {
    navigate('/invoice')
  }

  return (
    <div className="max-w-3xl text-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2 mb-6">
        <MdPayment className="text-green-500" /> Checkout
      </h1>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        <div className="flex justify-between text-gray-700">
          <span>Grand Total:</span>
          <span className="font-bold text-xl text-green-600">${fakeTotal}</span>
        </div>
      </div>

      {/* Payment Form (UI only) */}
      <form className="space-y-4 ">
        <div>
          <label className="block text-sm font-medium mb-1">Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaCreditCard className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVC</label>
            <input
              type="text"
              placeholder="123"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Pay ${fakeTotal}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
