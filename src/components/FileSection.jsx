import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronRight, Folder, FileText, Star } from 'lucide-react';
import FileGrid from './FileGrid';

const FileSection = ({ 
  title, 
  onRename, 
  onDelete, 
  onToggleStar, 
  onFolderClick,
  onUpdatePermissions,
  files, 
  collapsible = false, 
  expanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const getEmptyStateMessage = () => {
    switch (title.toLowerCase()) {
      case 'folders':
        return {
          icon: <Folder size={40} className="text-gray-400" />,
          message: "No folders yet"
        };
      case 'files':
      case 'your files':
        return {
          icon: <FileText size={40} className="text-gray-400" />,
          message: "No files uploaded yet"
        };
      case 'starred folders':
      case 'starred files':
        return {
          icon: <Star size={40} className="text-gray-400" />,
          message: "No starred items yet"
        };
      default:
        return {
          icon: <FileText size={40} className="text-gray-400" />,
          message: "No items found"
        };
    }
  };

  return (
    <div className="mb-8">
      <div 
        className={`flex items-center mb-4 ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        {collapsible && (
          isExpanded ? (
            <ChevronDown size={20} className="text-gray-500 mr-1" />
          ) : (
            <ChevronRight size={20} className="text-gray-500 mr-1" />
          )
        )}
        <h2 className="text-gray-800 font-medium">{title}</h2>
      </div>
      
      {(!collapsible || isExpanded) && (
        files.length > 0 ? (
          <FileGrid 
            files={files} 
            onRename={onRename} 
            onDelete={onDelete}
            onToggleStar={onToggleStar}
            onFolderClick={onFolderClick}
            onUpdatePermissions={onUpdatePermissions}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
            {getEmptyStateMessage().icon}
            <p className="mt-2 text-gray-500">{getEmptyStateMessage().message}</p>
          </div>
        )
      )}
    </div>
  );
};

FileSection.propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStar: PropTypes.func.isRequired,
  onFolderClick: PropTypes.func,
  onUpdatePermissions: PropTypes.func.isRequired,
  collapsible: PropTypes.bool,
  expanded: PropTypes.bool
};

export default FileSection;