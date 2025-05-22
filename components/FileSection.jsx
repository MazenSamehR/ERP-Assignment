import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
        <FileGrid 
          files={files} 
          onRename={onRename} 
          onDelete={onDelete}
          onToggleStar={onToggleStar}
          onFolderClick={onFolderClick}
          onUpdatePermissions={onUpdatePermissions}
        />
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