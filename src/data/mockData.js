import { FileType } from '../constants/fileTypes';

const getRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

export const folderData = [
  {
    id: 'folder-1',
    name: 'Documents',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: null,
    tags: 'work,important',
    description: 'Contains all work-related documents'
  },
  {
    id: 'folder-2',
    name: 'Images',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: null,
    tags: 'media,assets',
    description: 'Collection of project images and assets'
  },
  {
    id: 'folder-3',
    name: 'Work Projects',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: null,
    tags: 'work,projects',
    description: 'Active work projects'
  },
  {
    id: 'folder-4',
    name: 'Personal',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: 'folder-1',
    tags: 'personal',
    description: 'Personal documents and files'
  }
];

export const fileData = [
  {
    id: 'file-1',
    name: 'Presentation.pptx',
    type: FileType.PRESENTATION,
    extension: 'pptx',
    modified: getRecentDate(),
    parentFolderId: null,
    size: 2500000,
    tags: 'work,presentation',
    description: 'Q1 Project Overview'
  },
  {
    id: 'file-2',
    name: 'Budget.xlsx',
    type: FileType.SPREADSHEET,
    extension: 'xlsx',
    modified: getRecentDate(),
    parentFolderId: 'folder-1',
    size: 1500000,
    tags: 'finance,budget',
    description: 'Annual budget spreadsheet'
  },
  {
    id: 'file-3',
    name: 'Report.docx',
    type: FileType.DOCUMENT,
    extension: 'docx',
    modified: getRecentDate(),
    parentFolderId: 'folder-1',
    size: 800000,
    tags: 'report,draft',
    description: 'Monthly progress report'
  },
  {
    id: 'file-4',
    name: 'Meeting Notes.docx',
    type: FileType.DOCUMENT,
    extension: 'docx',
    modified: getRecentDate(),
    parentFolderId: 'folder-3',
    size: 500000,
    tags: 'meetings,notes',
    description: 'Team meeting notes'
  }
];

export const recentFilesData = [
  ...folderData,
  ...fileData
];