import React, { useState } from "react";
import FileCard from "./FileCard";
import Modal from "./Modal";

const FileManager = () => {
  const [files, setFiles] = useState([
    {
      id: "1",
      name: "Report Q1",
      type: "document",
      extension: "pdf",
      modified: "2024-09-01",
    },
    {
      id: "2",
      name: "Marketing Plan",
      type: "presentation",
      extension: "pptx",
      modified: "2024-09-04",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const handleRename = (file) => {
    setSelectedFile(file);
    setNewFileName(file.name);
    setRenameModalOpen(true);
  };

  const handleShare = (file) => {
    setSelectedFile(file);
    setShareModalOpen(true);
  };

  const handleDelete = (file) => {
    setFiles(files.filter((f) => f.id !== file.id));
  };

  const confirmRename = () => {
    setFiles(
      files.map((f) =>
        f.id === selectedFile.id ? { ...f, name: newFileName } : f
      )
    );
    setRenameModalOpen(false);
    setSelectedFile(null);
  };

  const confirmShare = () => {
    alert(`Shared "${selectedFile.name}" with your team.`);
    setShareModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onRename={handleRename}
          onShare={handleShare}
          onDelete={handleDelete}
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

      <Modal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onConfirm={confirmShare}
        title="Share File"
        confirmText="Send"
      >
        <p className="text-gray-700 mb-2">
          Share "{selectedFile?.name}" with your team?
        </p>
      </Modal>
    </div>
  );
};

export default FileManager;
