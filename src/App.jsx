import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileSection from './components/FileSection';
import FloatingActionButton from './components/FloatingActionButton';
import { folderData, fileData } from '../src/data/mockData';
import { FileType } from './constants/fileTypes';
import { Role } from './constants/permissions';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [folders, setFolders] = useState(folderData);
  const [files, setFiles] = useState(fileData);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPath, setCurrentPath] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRename = (itemId, newName) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.id === itemId ? { ...folder, name: newName } : folder
      )
    );
    setFiles(prev =>
      prev.map(file =>
        file.id === itemId ? { ...file, name: newName } : file
      )
    );
  };
  
  const handleDelete = (itemId) => {
    setFolders(prev => prev.filter(folder => folder.id !== itemId));
    setFiles(prev => prev.filter(file => file.id !== itemId));
  };

  const handleToggleStar = (itemId) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.id === itemId ? { ...folder, starred: !folder.starred } : folder
      )
    );
    setFiles(prev =>
      prev.map(file =>
        file.id === itemId ? { ...file, starred: !file.starred } : file
      )
    );
  };

  const handleFolderClick = (folder) => {
    setCurrentPath([...currentPath, folder]);
  };

  const handleNavigateBack = () => {
    setCurrentPath(prev => prev.slice(0, -1));
  };

  const handleUpdatePermissions = (itemId, permissions) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.id === itemId ? { ...folder, permissions } : folder
      )
    );
    setFiles(prev =>
      prev.map(file =>
        file.id === itemId ? { ...file, permissions } : file
      )
    );
  };

  const handleAddItem = (newItem) => {
    const id = `${newItem.type}-${Date.now()}`;
    const parentFolderId = currentPath.length > 0 ? currentPath[currentPath.length - 1].id : null;
    
    const itemToAdd = {
      ...newItem,
      id,
      modified: new Date().toISOString(),
      starred: false,
      parentFolderId,
      permissions: [{ email: 'you@example.com', role: Role.OWNER }]
    };

    if (newItem.type === 'folder') {
      setFolders(prev => [{
        ...itemToAdd,
        type: FileType.FOLDER
      }, ...prev]);
    } else {
      const extension = newItem.file?.name.split('.').pop() || '';
      
      let type = FileType.DOCUMENT;
      if (['xls', 'xlsx'].includes(extension)) {
        type = FileType.SPREADSHEET;
      } else if (['ppt', 'pptx'].includes(extension)) {
        type = FileType.PRESENTATION;
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        type = FileType.IMAGE;
      } else if (['mp4', 'mov', 'avi'].includes(extension)) {
        type = FileType.VIDEO;
      }

      setFiles(prev => [{
        ...itemToAdd,
        type,
        extension,
        name: newItem.name || newItem.file.name
      }, ...prev]);
    }
  };

  const getCurrentItems = () => {
    const parentFolderId = currentPath.length > 0 ? currentPath[currentPath.length - 1].id : null;
    const currentFolders = folders.filter(folder => folder.parentFolderId === parentFolderId);
    const currentFiles = files.filter(file => file.parentFolderId === parentFolderId);
    return { folders: currentFolders, files: currentFiles };
  };

  const filteredItems = getCurrentItems();
  const filteredFolders = filteredItems.folders.filter(folder => 
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFiles = filteredItems.files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const starredFolders = folders.filter(folder => folder.starred);
  const starredFiles = files.filter(file => file.starred);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            {currentPath.length > 0 && (
              <button
                onClick={handleNavigateBack}
                className="mb-4 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
              >
                ← Back
              </button>
            )}
            <FileSection 
              title="Folders" 
              files={filteredFolders}
              onRename={handleRename}
              onDelete={handleDelete}
              onToggleStar={handleToggleStar}
              onFolderClick={handleFolderClick}
              onUpdatePermissions={handleUpdatePermissions}
              collapsible={true}
              expanded={true} 
            />
            <FileSection 
              title="Files" 
              files={filteredFiles}
              onRename={handleRename}
              onDelete={handleDelete}
              onToggleStar={handleToggleStar}
              onUpdatePermissions={handleUpdatePermissions}
              collapsible={true}
              expanded={true} 
            />
          </>
        );
      case 'folders':
        return (
          <FileSection 
            title="Your Folders" 
            files={filteredFolders}
            onRename={handleRename}
            onDelete={handleDelete}
            onToggleStar={handleToggleStar}
            onFolderClick={handleFolderClick}
            onUpdatePermissions={handleUpdatePermissions}
            collapsible={false}
          />
        );
      case 'files':
        return (
          <FileSection 
            title="Your Files" 
            files={filteredFiles}
            onRename={handleRename}
            onDelete={handleDelete}
            onToggleStar={handleToggleStar}
            onUpdatePermissions={handleUpdatePermissions}
            collapsible={false}
          />
        );
      case 'starred':
        return (
          <>
            {starredFolders.length > 0 && (
              <FileSection 
                title="Starred Folders" 
                files={starredFolders}
                onRename={handleRename}
                onDelete={handleDelete}
                onToggleStar={handleToggleStar}
                onFolderClick={handleFolderClick}
                onUpdatePermissions={handleUpdatePermissions}
                collapsible={false}
              />
            )}
            {starredFiles.length > 0 && (
              <FileSection 
                title="Starred Files" 
                files={starredFiles}
                onRename={handleRename}
                onDelete={handleDelete}
                onToggleStar={handleToggleStar}
                onUpdatePermissions={handleUpdatePermissions}
                collapsible={false}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      <div className="h-full">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
      
      <div className="flex-1 overflow-auto p-8">
        <Header 
          username="YN" 
          onSearch={handleSearch}
          breadcrumbs={currentPath.map(folder => folder.name)}
        />
        {renderContent()}
        <FloatingActionButton onAddItem={handleAddItem} />
      </div>
    </div>
  );
}

export default App;