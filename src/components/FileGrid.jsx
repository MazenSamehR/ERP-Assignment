import React, { useState } from "react";
import PropTypes from "prop-types";
import FileCard from "./FileCard";
import Modal from "./Modal";

const FileGrid = ({ files, onRename, onDelete, onToggleStar, onFolderClick, onUpdatePermissions }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  
  const handleRename = (file) => {
    setSelectedFile(file);
    setNewFileName(file.name);
    setRenameModalOpen(true);
  };

  const handleDelete = (file) => {
    onDelete(file.id);
    setSelectedFile(null);
  };

  const confirmRename = () => {
    onRename(selectedFile.id, newFileName);
    setRenameModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onRename={handleRename}
          onDelete={handleDelete}
          onToggleStar={onToggleStar}
          onFolderClick={onFolderClick}
          onUpdatePermissions={onUpdatePermissions}
        />
      ))}

      <Modal
        isOpen={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        onConfirm={confirmRename}
        title="Rename File"
      >
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </Modal>
    </div>
  );
};

FileGrid.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      extension: PropTypes.string,
      modified: PropTypes.string,
      starred: PropTypes.bool,
    })
  ).isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStar: PropTypes.func.isRequired,
  onFolderClick: PropTypes.func,
  onUpdatePermissions: PropTypes.func.isRequired
};

export default FileGrid;