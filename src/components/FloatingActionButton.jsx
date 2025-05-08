import React, { useState } from "react";
import { Plus, Folder, FileText, Upload, AlertCircle } from "lucide-react";
import { toast, Toaster } from 'react-hot-toast';
import Modal from "./Modal";

const FloatingActionButton = ({ onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileTags, setFileTags] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileError, setFileError] = useState("");

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        name: newFolderName,
        type: 'folder',
        createdAt: new Date().toISOString(),
      };
      onAddItem(newFolder);
      setNewFolderName('');
      setShowNewFolderModal(false);
      toast.success('Folder created successfully');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (file.size > MAX_FILE_SIZE) {
        setSelectedFile(null);
        setFileError(
          `File size exceeds ${formatFileSize(MAX_FILE_SIZE)}. Selected file size: ${formatFileSize(file.size)}`
        );
        return;
      }

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setFileName(file.name);
        setFileError("");
      } else {
        setSelectedFile(null);
        setFileError(
          "Unsupported file type. Please upload PDF, Word, Excel, or PowerPoint files only."
        );
      }
    }
  };

  const handleFileUpload = () => {
    if (selectedFile && fileName.trim()) {
      const newFile = {
        file: selectedFile,
        name: fileName,
        tags: fileTags,
        description: fileDescription,
        type: 'file',
        size: selectedFile.size,
        uploadedAt: new Date().toISOString(),
      };
      onAddItem(newFile);
      setShowFileUploadModal(false);
      resetFileUploadForm();
      toast.success('File uploaded successfully');
    }
  };

  const resetFileUploadForm = () => {
    setSelectedFile(null);
    setFileName("");
    setFileTags("");
    setFileDescription("");
    setFileError("");
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="fixed bottom-8 right-8">
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col-reverse space-y-reverse space-y-3 items-center mb-2">
            <button
              className="flex cursor-pointer items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 shadow-md hover:bg-blue-100 transition-colors duration-200"
              onClick={() => setShowNewFolderModal(true)}
            >
              <Folder size={20} />
            </button>
            <button
              className="flex items-center cursor-pointer justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 shadow-md hover:bg-blue-100 transition-colors duration-200"
              onClick={() => setShowFileUploadModal(true)}
            >
              <FileText size={20} />
            </button>
          </div>
        )}

        <button
          className={`flex items-center cursor-pointer justify-center h-14 w-14 rounded-full shadow-lg focus:outline-none transition-all duration-300 ${
            isOpen ? "bg-gray-700 rotate-45" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={toggleMenu}
        >
          <Plus size={24} className="text-white" />
        </button>
      </div>

      <Modal
        isOpen={showNewFolderModal}
        onClose={() => {
          setShowNewFolderModal(false);
          setNewFolderName("");
        }}
        onConfirm={handleCreateFolder}
        title="Create new folder"
      >
        <input
          type="text"
          placeholder="Add title"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoFocus
        />
      </Modal>

      <Modal
        isOpen={showFileUploadModal}
        onClose={() => {
          setShowFileUploadModal(false);
          resetFileUploadForm();
        }}
        onConfirm={handleFileUpload}
        title="Add new file"
        confirmText="Add"
      >
        <div className="space-y-4">
          <div className="relative">
            <div
              className={`w-full px-3 py-2 border rounded-md ${
                fileError ? "border-red-300" : "border-gray-300"
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              />
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{selectedFile ? selectedFile.name : "browser file"}</span>
                <Upload size={16} />
              </div>
            </div>
            {fileError && (
              <div className="mt-2 flex items-start text-sm text-red-600">
                <AlertCircle size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-transparent focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Tags"
              value={fileTags}
              onChange={(e) => setFileTags(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-transparent focus:border-blue-500"
            />
          </div>

          <textarea
            placeholder="Description"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            rows={3}
            className="w-full min-h-25 max-h-50 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-transparent focus:border-blue-500"
          />
        </div>
      </Modal>
    </>
  );
};

export default FloatingActionButton;