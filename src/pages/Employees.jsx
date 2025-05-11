import React, { useState } from 'react';
import { employeesData } from '../data/dummy';
import { Header } from '../components';

const ITEMS_PER_PAGE = 5;

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const uniqueData = employeesData.filter((employee,index,self)=>
  index===self.findIndex((e)=>e.EmployeeID===employee.EmployeeID))
  const filteredData = uniqueData.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />

      <div className="mb-4 flex flex-wrap">
        <input
          type="text"
          placeholder="Search by employee name..."
          className="border border-gray-300 rounded px-3 py-1 w-full
          md:w-1/3 dark:bg-secondary-dark-bg dark:text-white dark:font-semibold "
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase cursor-pointer dark:bg-secondary-dark-bg dark:text-white">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3" onClick={() => handleSort('Name')}>
                Name{renderSortArrow('Name')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Title')}>
              Title {renderSortArrow('Title')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('HireDate')}>
              HireDate{renderSortArrow('HireDate')}
              </th>
              <th className="px-4 py-3" onClick={() => handleSort('Country')}>
              Country{renderSortArrow('Country')}
              </th>
              <th className="px-4 py-3" ownClick={() => handleSort('ReportsTo')}>
              ReportsTo{renderSortArrow('ReportsTo')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className=" dark:text-white text-center py-10 text-gray-500">
                  No records to display
                </td>
              </tr>
            ) : (
              paginatedData.map((employee) => (
                <tr key={employee.EmployeeID} className="border-b dark:text-white">
                  <td className="px-4 py-3">
                    <img
                      src={employee.EmployeeImage}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3">{employee.Name}</td>
                  <td className="px-4 py-3">{employee.Title}</td>
                  <td className="px-4 py-3">{employee.HireDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-white text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: "black"}}
                    >
                      {employee.Country}
                    </span>
                  </td>
                  <td className="px-4 py-3">{employee.ReportsTo}</td>
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
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 dark:bg-secondary-dark-bg dark:text-white"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 dark:bg-secondary-dark-bg dark:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Employees
