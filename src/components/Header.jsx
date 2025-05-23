import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search, Menu } from "lucide-react";

const Header = ({ username, onSearch, breadcrumbs = [], onMenuClick }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-full bg-white shadow-sm p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between md:justify-start">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-medium text-gray-800">
            Welcome, {username}
          </h1>
        </div>

        <div className="w-full md:w-auto md:flex-1 md:max-w-[32rem] md:mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full bg-gray-100 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-150"
            />
          </div>
        </div>
      </div>

      {breadcrumbs.length > 0 && (
        <div className="flex items-center mt-2 text-sm text-gray-500 overflow-x-auto">
          <span>Home</span>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className="mx-2">/</span>
              <span>{crumb}</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.string),
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;