import React from 'react';
import PropTypes from 'prop-types';
import { Folder, FileText, FileImage, Film, FileSpreadsheet } from 'lucide-react';
import { FileType } from '../constants/fileTypes';

const FileIcon = ({ type }) => {
  const getIconColor = () => {
    switch (type) {
      case FileType.FOLDER:
        return 'text-blue-600 bg-blue-100';
      case FileType.DOCUMENT:
        return 'text-teal-600 bg-teal-100';
      case FileType.SPREADSHEET:
        return 'text-green-600 bg-green-100';
      case FileType.PRESENTATION:
        return 'text-amber-600 bg-amber-100';
      case FileType.IMAGE:
        return 'text-purple-600 bg-purple-100';
      case FileType.VIDEO:
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getIcon = () => {
    switch (type) {
      case FileType.FOLDER:
        return <Folder size={24} />;
      case FileType.PRESENTATION:
        return <div className="text-xs font-semibold">PPTX</div>;
      case FileType.DOCUMENT:
        return <FileText size={24} />;
      case FileType.SPREADSHEET:
        return <FileSpreadsheet size={24} />;
      case FileType.IMAGE:
        return <FileImage size={24} />;
      case FileType.VIDEO:
        return <Film size={24} />;
      default:
        return <FileText size={24} />;
    }
  };

  return (
    <div className={`flex items-center justify-center h-8 w-8 rounded-md ${getIconColor()}`}>
      {getIcon()}
    </div>
  );
};

FileIcon.propTypes = {
  type: PropTypes.string.isRequired,
  extension: PropTypes.string
};

export default FileIcon;