import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MoreVertical, Star } from "lucide-react";
import { FileType } from "../constants/fileTypes";
import FileIcon from "./FileIcon";

const FileCard = ({ file, onRename, onShare, onDelete, onToggleStar }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickOutside = (e) => {
    if (e.target.closest(".file-card-menu") === null) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleAction = (action) => (e) => {
    e.stopPropagation();
    action(file);
    setShowMenu(false);
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    onToggleStar(file.id);
  };

  return (
    <div className="group bg-white rounded-lg overflow-visible shadow-sm hover:shadow-md transition-shadow duration-300 file-card relative">
      <div className="p-4 cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <FileIcon type={file.type} extension={file.extension} />
            <p className="text-sm font-medium text-gray-800">{file.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStarClick}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Star
                size={16}
                className={
                  file.starred
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-500"
                }
              />
            </button>
            <button
              onClick={toggleMenu}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 top-10 mt-1 py-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 file-card-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleAction(onRename)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Rename
                </button>
                <button
                  onClick={handleAction(onShare)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share
                </button>
                <button
                  onClick={handleAction(onDelete)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {file.type === FileType.PRESENTATION && (
          <div className="bg-gray-100 rounded w-full h-50 mb-3"></div>
        )}

        <div className="mt-2">
          {file.modified && (
            <p className="text-xs text-gray-500 mt-1">
              Modified {new Date(file.modified).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

FileCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    extension: PropTypes.string,
    modified: PropTypes.string,
    starred: PropTypes.bool,
  }).isRequired,
  onRename: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStar: PropTypes.func.isRequired,
};

export default FileCard;
