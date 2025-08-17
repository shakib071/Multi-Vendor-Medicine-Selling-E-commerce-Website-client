
import React, { useRef, useState } from "react";
import { Download, Filter, ArrowUpDown } from "lucide-react";
import useAllSoldMed from "../../../Hooks/getAllSoldMeds/useAllSoldMed";
import Loading from '../../Loading/Loading';
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import { toPng } from 'html-to-image';
import { DownloadTableExcel } from "react-export-table-to-excel";

const AdminSalesReport = () => {
  const reportRef = useRef(null);
  const tableRef  = useRef(null);
  const { data, isLoading } = useAllSoldMed();
  const salesData = data?.flatMap((sale) => sale.soldItems);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  const getTimeAndDate = (utcDate) => {
    const date = new Date(utcDate);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${hours}:${minutes}${ampm}`;
  };

  
  const generatePDF = async () => {
    if (!reportRef.current) return;

      const dataUrl = await toPng(reportRef.current);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('saler report.pdf');

    
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your pdf has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    
  };


  const filteredSales = salesData?.filter((sale) => {
    if (!startDate && !endDate) return true;
    const saleDate = new Date(sale.addedDate);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && saleDate < start) return false;
    if (end && saleDate > end) return false;

    return true;
  });



  //  Sort filtered data by total price
  const sortedSales = [...(filteredSales || [])].sort((a, b) => {
    const priceA = a.price * a.quantity;
    const priceB = b.price * b.quantity;
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });


  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 rounded-2xl min-h-screen">
      <title>Sales Report - CureCart</title>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-blue-700">💊 Sales Report</h2>
        <div className="flex flex-col gap-4 items-center">
          <button onClick={generatePDF} className="flex items-center text-xl gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
            <Download size={16} /> Download PDF
          </button>
          <DownloadTableExcel
            filename="medicines"
            sheet="medicines-data"
            currentTableRef={tableRef.current}
            >
            <button className="flex items-center text-xl gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
              <Download size={16} /> Export to Excel
            </button>
          </DownloadTableExcel>
        </div>
      </div>
     

     
      <div>
        <p className="text-xl mb-2">Filter</p>
        <div className="flex flex-wrap items-center gap-5 bg-white p-3 mb-4 rounded-lg shadow">
          {/* Date filter */}
          <Filter size={18} className="text-gray-500" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="outline-none text-sm text-gray-700"
          />
          <span className="text-gray-400 text-lg">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="outline-none text-sm text-gray-700"
          />

          {/* Sorting button */}
          <button
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
            className="flex items-center gap-2 bg-blue-200 hover:bg-blue-700 hover:text-white px-3 py-1 rounded-lg ml-auto"
          >
            <ArrowUpDown size={16} />
            Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
          </button>
        </div>
      </div>

      
      <div ref={reportRef} className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table ref={tableRef} className="w-full text-left">
          <thead className="bg-blue-600 text-white text-sm uppercase">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Seller Email</th>
              <th className="p-3">Buyer Email</th>
              <th className="p-3 cursor-pointer">Total Price</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedSales && sortedSales.length > 0 ? (
              sortedSales.map((sale, index) => (
                <tr
                  key={index}
                  className={`border-b text-lg hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium text-gray-800">{sale.name}</td>
                  <td className="p-3 text-gray-600">{sale.salerEmail}</td>
                  <td className="p-3 text-gray-600">{sale.buyerEmail}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ${(sale.price * sale.quantity).toFixed(2)}
                  </td>
                  <td className="p-3 text-gray-500">
                    {getTimeAndDate(sale.addedDate)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No sales found for this date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalesReport;
