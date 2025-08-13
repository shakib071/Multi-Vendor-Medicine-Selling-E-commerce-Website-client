import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";


const Cart = () => {
    const navigate = useNavigate();
  // Fake cart data
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      company: "Square Pharmaceuticals",
      price: 5,
      quantity: 2,
      image: "https://lh3.googleusercontent.com/ogw/AF2bZyjlPPsBJ0uKeNGA-HYzCr2zOLM8sxbO78e3SrR3y8a3x94=s64-c-mo",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      company: "Incepta Pharmaceuticals",
      price: 8,
      quantity: 1,
      image: "https://lh3.googleusercontent.com/ogw/AF2bZyjlPPsBJ0uKeNGA-HYzCr2zOLM8sxbO78e3SrR3y8a3x94=s64-c-mo",
    },
  ]);

  

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
     navigate('/checkout');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-green-400" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-lg text-left text-gray-700">
              <thead className="bg-blue-100 text-blue-800 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Medicine Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Price/Unit</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">{item.company}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">
                      ${item.price}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <Plus size={14} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-blue-600 font-bold">
                      ${item.price * item.quantity}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
            <div className="flex items-center gap-6">
              <h2 className="text-lg font-bold">
                Total: <span className="text-green-600">${totalPrice}</span>
              </h2>
              <button onClick={handleCheckout} className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
