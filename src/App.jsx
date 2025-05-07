import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileSection from './components/FileSection';
import FloatingActionButton from './components/FloatingActionButton';
import { folderData, fileData } from '../src/data/mockData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentFiles, setRecentFiles] = useState([...folderData, ...fileData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  }; 

  const handleRename = (fileId, newName) => {
    setRecentFiles(prev =>
      prev.map(file =>
        file.id === fileId ? { ...file, name: newName } : file
      )
    );
  };
  
  const handleDelete = (fileId) => {
    setRecentFiles(prev => prev.filter(file => file.id !== fileId));
  };
  

  const filteredFiles = recentFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      <div className="h-full">
        <Sidebar />
      </div>
      
      <div className="flex-1 overflow-auto p-8">
        <Header username="YN" onSearch={handleSearch} />
        
        <FileSection 
          title="Opened lately" 
          files={filteredFiles.slice(0, 4)} 
          onRename={handleRename}
          onDelete={handleDelete}
          collapsible={true}
          expanded={true} 
        />
        
        <FileSection 
          title="Opened lately" 
          files={filteredFiles.slice(4)} 
          onRename={handleRename}
          onDelete={handleDelete} 
        />

        <FloatingActionButton />
      </div>
    </div>
  );
}

export default App;