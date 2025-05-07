import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ icon, label, active = false, indented = false }) => {
  return (
    <div 
      className={`flex items-center px-4 py-2 my-1 rounded-md cursor-pointer transition-colors duration-200 ${
        active 
          ? 'bg-blue-100 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-100'
      } ${indented ? 'ml-4' : ''}`}
    >
      <div className="mr-3">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  indented: PropTypes.bool
};

export default NavItem;