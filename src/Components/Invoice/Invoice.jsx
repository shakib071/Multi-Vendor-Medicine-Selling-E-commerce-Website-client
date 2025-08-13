
import { FaPrint } from "react-icons/fa";
import Logo  from '../../assets/medicalLogo.png';

const Invoice = () => {
  // Fake data
  const invoiceData = {
    invoiceId: "INV-2025-001",
    date: "14 Aug 2025",
    customer: {
      name: "Shakib Hasan",
      email: "shakib@example.com",
      address: "123 Main Street, Dhaka, Bangladesh",
    },
    items: [
      { name: "Paracetamol 500mg", company: "ACME Pharma", quantity: 2, price: 10 },
      { name: "Vitamin C Tablets", company: "HealthCare Ltd", quantity: 1, price: 8 },
      { name: "Cough Syrup", company: "MediLife", quantity: 3, price: 6 },
    ],
  };

  const totalAmount = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
            <div className="text-3xl flex items-center font-bold text-blue-600">
                <img className="w-12" src={Logo} alt="" />
                <h1 className=""> MedStore</h1>
            </div>
          
          <p className="text-gray-500">Your Trusted Online Pharmacy</p>
        </div>
        <div>
          <p className="font-semibold">Invoice #: {invoiceData.invoiceId}</p>
          <p className="text-gray-500">Date: {invoiceData.date}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
        <p>{invoiceData.customer.name}</p>
        <p>{invoiceData.customer.email}</p>
        <p>{invoiceData.customer.address}</p>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Medicine</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.company}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">${item.price}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                ${item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end mb-6">
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total Amount: <span className="text-green-600">${totalAmount}</span>
          </p>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          <FaPrint /> Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
