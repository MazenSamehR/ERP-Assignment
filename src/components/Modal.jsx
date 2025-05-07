import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, onConfirm, title, children, confirmText = 'Create' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-white/50 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">{title}</h3>
        {children}
        <div className="mt-6 flex justify-end space-x-3">
          <button   
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-normal text-black bg-transparent rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string,    
};

export default Modal;