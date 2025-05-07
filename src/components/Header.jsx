import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";

const Header = ({ username, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-gray-800 flex-1">
          Welcome, {username}
        </h1>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[32rem]">
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

        <div className="flex-1" />
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Header;
