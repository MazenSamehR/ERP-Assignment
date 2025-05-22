import React from 'react';
import PropTypes from 'prop-types';
import { Home, Folder, FileText, Star, Plus } from 'lucide-react';
import NavItem from './NavItem.jsx';

const Sidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="bg-white h-full w-56 py-4 border-r border-gray-200 flex flex-col">
      <div className="px-4 mb-8">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 mx-auto">
          <span className="font-semibold text-lg">C</span>
        </div>
        <h2 className="text-center mt-2 font-medium text-gray-800">CloudDrive</h2>
      </div>
    
      <div className="flex-1">
        <div onClick={() => onSectionChange('home')}>
          <NavItem icon={<Home size={18} />} label="Home" active={activeSection === 'home'} />
        </div>
        <div onClick={() => onSectionChange('folders')}>
          <NavItem icon={<Folder size={18} />} label="Your folders" active={activeSection === 'folders'} indented={true} />
        </div>
        <div onClick={() => onSectionChange('files')}>
          <NavItem icon={<FileText size={18} />} label="Your files" active={activeSection === 'files'} indented={true} />
        </div>
        <div onClick={() => onSectionChange('starred')}>
          <NavItem icon={<Star size={18} />} label="Starred" active={activeSection === 'starred'} />
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired
};

export default Sidebar;