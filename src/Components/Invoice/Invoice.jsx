import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import Logo from '../../assets/medicalLogo.png';
import useUserCartMed from "../../Hooks/getUserCart/useUserCartMed";
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';
import jsPDF from "jspdf";
import { toPng } from 'html-to-image';
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Invoice = () => {
  const invoiceRef = useRef(null);
  const { loading, user } = useAuth();
  const { data: invoiceData, isLoading } = useUserCartMed(user?.uid);
  const location = useLocation();
  const navigate = useNavigate();
  console.log('state',location.state);

  if(!location?.state){
    navigate(`/cart/${user?.uid}`);
  }

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

      const dataUrl = await toPng(invoiceRef.current);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');

    
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your pdf has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    
  };

  const calculateTotal = () => {
    return invoiceData?.medicines.reduce(
      (sum, item) => sum + (item.quantity * item.price),
      0
    ).toFixed(2);
  };

  if (loading || isLoading) return <Loading />;

  return (
    <div className="flex justify-center p-4">
      <title>Invoice - CureCart</title>
      <div 
        ref={invoiceRef}
        className="w-[210mm] bg-[#ffffff] p-8 " // A4 paper size
        style={{
          minHeight: '297mm', // A4 height
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img className="w-16 h-16" src={Logo} alt="MedStore Logo" />
            <div>
              <h1 className="text-3xl font-bold text-[#2563eb]">MedStore</h1>
              <p className="text-[#5a5c5f]">Your Trusted Online Pharmacy</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">Invoice #: INV-{Date.now().toString().slice(-6)}</p>
            <p className="text-[#73767d]">Date: {formatDate()}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Bill To:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Customer Name:</p>
              <p>{user?.displayName || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f3f4f6]">
                <th className="border p-3 text-left">Medicine</th>
                <th className="border p-3 text-left">Company</th>
                <th className="border p-3 text-center">Qty</th>
                <th className="border p-3 text-center">Price</th>
                <th className="border p-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.medicines?.map((med, index) => (
                <tr key={index}>
                  <td className="border p-3">{med.name}</td>
                  <td className="border p-3">{med.company}</td>
                  <td className="border p-3 text-center">{med.quantity}</td>
                  <td className="border p-3 text-center">${med.price.toFixed(2)}</td>
                  <td className="border p-3 text-center">${(med.price * med.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end border-t pt-4">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Subtotal:</span>
              <span>${calculateTotal()}</span>
            </div>
           
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-[#16a34a]">${calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t text-center text-sm text-[#5a5c5f]">
          <p>Thank you for your purchase!</p>
          <p className="mt-2">CureCart • 123 Pharmacy St • Healthcare City</p>
        </div>
      </div>

      {/* Download Button (outside printable area) */}
      <div className="fixed bottom-20 right-20">
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
        >
          <FaPrint className="text-lg" />
          <span>Download Invoice</span>
        </button>
      </div>
    </div>
  );
};

export default Invoice;