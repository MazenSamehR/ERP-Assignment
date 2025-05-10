import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MoreVertical, Star, Tag, Info, Edit3, Trash, Share, Lock } from "lucide-react";
import { FileType } from "../constants/fileTypes";
import FileIcon from "./FileIcon";
import Modal from "./Modal";
import PermissionModal from "./PermissionModal";

const FileCard = ({ file, onRename, onDelete, onToggleStar, onFolderClick, onUpdatePermissions }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [tags, setTags] = useState(file.tags ? file.tags.split(',').filter(Boolean) : []);
  const [newTag, setNewTag] = useState("");

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

  const handleCardClick = () => {
    if (file.type === FileType.FOLDER && onFolderClick) {
      onFolderClick(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      file.tags = updatedTags.join(',');
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    file.tags = updatedTags.join(',');
  };

  return (
    <>
      <div 
        className={`group bg-white rounded-lg overflow-visible shadow-sm hover:shadow-md transition-shadow duration-300 file-card relative ${
          file.type === FileType.FOLDER ? 'cursor-pointer' : ''
        }`}
        onClick={handleCardClick}
      >
        <div className="p-4">
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
                    onClick={() => {
                      setShowMenu(false);
                      setShowDetailsModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Info size={16} className="mr-2" />
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowTagsModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Tag size={16} className="mr-2" />
                    Manage Tags
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowPermissionModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Lock size={16} className="mr-2" />
                    Permissions
                  </button>
                  <button
                    onClick={handleAction(onRename)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Rename
                  </button>
                  <button
                    onClick={handleAction(onDelete)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <Trash size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-2">
            {file.modified && (
              <p className="text-xs text-gray-500 mt-1">
                Modified {new Date(file.modified).toLocaleDateString()}
              </p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onConfirm={() => setShowDetailsModal(false)}
        title="File Details"
        confirmText="Close"
      >
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-sm text-gray-900">{file.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Type</p>
            <p className="text-sm text-gray-900">{file.type}</p>
          </div>
          {file.extension && (
            <div>
              <p className="text-sm font-medium text-gray-500">Extension</p>
              <p className="text-sm text-gray-900">.{file.extension}</p>
            </div>
          )}
          {file.size && (
            <div>
              <p className="text-sm font-medium text-gray-500">Size</p>
              <p className="text-sm text-gray-900">{formatFileSize(file.size)}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Modified</p>
            <p className="text-sm text-gray-900">
              {new Date(file.modified).toLocaleString()}
            </p>
          </div>
          {file.description && (
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-sm text-gray-900">{file.description}</p>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={showTagsModal}
        onClose={() => {
          setShowTagsModal(false);
          setNewTag("");
        }}
        onConfirm={() => setShowTagsModal(false)}
        title="Manage Tags"
        confirmText="Done"
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTag();
                }
              }}
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
              >
                <span className="text-sm text-gray-700">{tag}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <PermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onUpdatePermissions={(permissions) => {
          onUpdatePermissions(file.id, permissions);
          setShowPermissionModal(false);
        }}
        resourceName={file.name}
        currentPermissions={file.permissions || []}
      />
    </>
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
    size: PropTypes.number,
    description: PropTypes.string,
    tags: PropTypes.string,
    permissions: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStar: PropTypes.func.isRequired,
  onFolderClick: PropTypes.func,
  onUpdatePermissions: PropTypes.func.isRequired
};

export default FileCard;