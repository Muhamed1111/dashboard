import React, { useState } from 'react';
import { customersData } from '../data/dummy';
import { Header } from '../components';

const ITEMS_PER_PAGE = 8;

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [customers_1, setCustomers_1] = useState(customersData);

  const uniqueData = customers_1.filter(
    (customer, index, self) =>
      index === self.findIndex((c) => c.CustomerID === customer.CustomerID)
  );

  const filteredData = uniqueData.filter((customer) =>
    customer.CustomerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const filtered = customers_1.filter((c) => c.CustomerID !== id);
    setCustomers_1(filtered);
    setCurrentPage(1);
  };

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
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />

      <div className="mb-4 flex flex-wrap">
        <input
          type="text"
          placeholder="Search by customer name..."
          className="dark:bg-secondary-dark-bg dark:text-white border border-gray-300 rounded px-3 py-1 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className=" dark:bg-secondary-dark-bg dark:text-white bg-gray-100 text-xs uppercase cursor-pointer">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3" onClick={() => handleSort('CustomerName')}>
                Customer Name {renderSortArrow('CustomerName')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('CustomerEmail')}>
                Customer Email {renderSortArrow('CustomerEmail')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Status')}>
                Status {renderSortArrow('Status')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Weeks')}>
                Weeks {renderSortArrow('Weeks')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Budget')}>
                Budget {renderSortArrow('Budget')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Location')}>
                Location {renderSortArrow('Location')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No records to display
                </td>
              </tr>
            ) : (
              paginatedData.map((customer) => (
                <tr key={customer.CustomerID} className="border-b dark:text-white">
                  <td className="px-2 py-3 flex items-center gap-2 dark:text-white">
                    <button
                      className="px-2 py-1 bg-red-500 hover:bg-red-400  text-white rounded text-sm"
                      onClick={() => handleDelete(customer.CustomerID)}
                    >
                      🗑
                    </button>
                    <img
                      src={customer.CustomerImage}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3">{customer.CustomerName}</td>
                  <td className="px-4 py-3">{customer.CustomerEmail}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-white text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: customer.StatusBg }}
                    >
                      {customer.Status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{customer.Weeks}</td>
                  <td className="px-4 py-3">{customer.Budget}</td>
                  <td className="px-4 py-3">{customer.Location}</td>
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
          className="dark:bg-secondary-dark-bg dark:text-white px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="dark:bg-secondary-dark-bg dark:text-white px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers
