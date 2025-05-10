import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { Role } from '../constants/permissions';

const PermissionModal = ({ isOpen, onClose, onUpdatePermissions, resourceName, currentPermissions = [] }) => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(Role.VIEWER);

  const handleAddPermission = () => {
    if (email.trim()) {
      onUpdatePermissions([...currentPermissions, { email: email.trim(), role: selectedRole }]);
      setEmail('');
      setSelectedRole(Role.VIEWER);
    }
  };

  const handleRemovePermission = (emailToRemove) => {
    onUpdatePermissions(currentPermissions.filter(p => p.email !== emailToRemove));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleAddPermission}
      title={`Manage Permissions - ${resourceName}`}
      confirmText="Add Permission"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add User
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={Role.VIEWER}>Viewer</option>
              <option value={Role.EDITOR}>Editor</option>
            </select>
          </div>
        </div>

        {currentPermissions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Permissions</h4>
            <div className="space-y-2">
              {currentPermissions.map(({ email, role }) => (
                <div key={email} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div>
                    <span className="text-sm text-gray-900">{email}</span>
                    <span className="ml-2 text-xs text-gray-500">{role}</span>
                  </div>
                  <button
                    onClick={() => handleRemovePermission(email)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

PermissionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdatePermissions: PropTypes.func.isRequired,
  resourceName: PropTypes.string.isRequired,
  currentPermissions: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  )
};

export default PermissionModal;