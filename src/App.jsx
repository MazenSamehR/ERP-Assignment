import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileSection from './components/FileSection';
import FloatingActionButton from './components/FloatingActionButton';
import { folderData, fileData } from '../src/data/mockData';
import { FileType } from './constants/fileTypes';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [folders, setFolders] = useState(folderData);
  const [files, setFiles] = useState(fileData);
  const [activeSection, setActiveSection] = useState('home');

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

  const handleAddItem = (newItem) => {
    const id = `${newItem.type}-${Date.now()}`;
    const itemToAdd = {
      ...newItem,
      id,
      modified: new Date().toISOString(),
      starred: false
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

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const starredItems = [...folders.filter(folder => folder.starred), ...files.filter(file => file.starred)];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <FileSection 
              title="Folders" 
              files={filteredFolders} 
              onRename={handleRename}
              onDelete={handleDelete}
              onToggleStar={handleToggleStar}
              collapsible={true}
              expanded={true} 
            />
            <FileSection 
              title="Files" 
              files={filteredFiles} 
              onRename={handleRename}
              onDelete={handleDelete}
              onToggleStar={handleToggleStar}
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
            collapsible={false}
          />
        );
      case 'shared':
        return (
          <FileSection 
            title="Shared Folders" 
            files={[]} 
            onRename={handleRename}
            onDelete={handleDelete}
            onToggleStar={handleToggleStar}
            collapsible={false}
          />
        );
      case 'starred':
        return (
          <FileSection 
            title="Starred Items" 
            files={starredItems} 
            onRename={handleRename}
            onDelete={handleDelete}
            onToggleStar={handleToggleStar}
            collapsible={false}
          />
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
        <Header username="YN" onSearch={handleSearch} />
        {renderContent()}
        <FloatingActionButton onAddItem={handleAddItem} />
      </div>
    </div>
  );
}

export default App;