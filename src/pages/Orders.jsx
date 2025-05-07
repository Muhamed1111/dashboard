import React, { useState } from 'react';
import { ordersData } from '../data/dummy';
import { Header } from '../components';

const ITEMS_PER_PAGE = 3;

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const uniqueData = ordersData.filter((order,index,self)=>
  index===self.findIndex((o)=>o.OrderID===order.OrderID))
  const filteredData = uniqueData.filter((order) =>
    order.CustomerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === 'string') {
      return sortConfig.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
  });

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽';
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />

      <div className="mb-4 flex flex-wrap">
        <input
          type="text"
          placeholder="Search by customer name..."
          className="border border-gray-300 rounded px-3 py-1 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase cursor-pointer">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3" onClick={() => handleSort('OrderItems')}>
                Item{renderSortArrow('OrderItems')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('CustomerName')}>
                Customer Name{renderSortArrow('CustomerName')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('TotalAmount')}>
                Total Amount{renderSortArrow('TotalAmount')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Status')}>
                Status{renderSortArrow('Status')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('OrderID')}>
                Order ID{renderSortArrow('OrderID')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No records to display
                </td>
              </tr>
            ) : (
              paginatedData.map((order) => (
                <tr key={order.OrderID} className="border-b">
                  <td className="px-4 py-3">
                    <img
                      src={order.ProductImage}
                      alt="product"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3">{order.OrderItems}</td>
                  <td className="px-4 py-3">{order.CustomerName}</td>
                  <td className="px-4 py-3">${order.TotalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-white text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: order.StatusBg }}
                    >
                      {order.Status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.OrderID}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders
