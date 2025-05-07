import React from 'react';
import { Home, Folder, Share2, Star, Plus } from 'lucide-react';
import NavItem from './NavItem.jsx';

const Sidebar = () => {
  return (
    <div className="bg-white h-full w-56 py-4 border-r border-gray-200 flex flex-col">
      <div className="px-4 mb-8">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 mx-auto">
          <span className="font-semibold text-lg">C</span>
        </div>
        <h2 className="text-center mt-2 font-medium text-gray-800">CloudDrive</h2>
      </div>
    
      <div className="flex-1">
        <NavItem icon={<Home size={18} />} label="Home" active={true} />
        <NavItem icon={<Folder size={18} />} label="Your folders" indented={true} />
        <NavItem icon={<Share2 size={18} />} label="Shared folders" indented={true} />
        <NavItem icon={<Star size={18} />} label="Starred" />
      </div>

      <div className="px-4 py-3 mt-auto">
        <div className="flex items-center bg-blue-50 text-blue-600 rounded-md px-3 py-2 font-medium text-sm">
          <Plus size={16} className="mr-2" />
          <span>New</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

