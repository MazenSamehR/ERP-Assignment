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
    parentFolderId: null
  },
  {
    id: 'folder-2',
    name: 'Images',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: null
  },
  {
    id: 'folder-3',
    name: 'Work Projects',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: null
  },
  {
    id: 'folder-4',
    name: 'Personal',
    type: FileType.FOLDER,
    modified: getRecentDate(),
    parentFolderId: 'folder-1'
  }
];

export const fileData = [
  {
    id: 'file-1',
    name: 'Presentation.pptx',
    type: FileType.PRESENTATION,
    extension: 'pptx',
    modified: getRecentDate(),
    parentFolderId: null
  },
  {
    id: 'file-2',
    name: 'Budget.xlsx',
    type: FileType.SPREADSHEET,
    extension: 'xlsx',
    modified: getRecentDate(),
    parentFolderId: 'folder-1'
  },
  {
    id: 'file-3',
    name: 'Report.docx',
    type: FileType.DOCUMENT,
    extension: 'docx',
    modified: getRecentDate(),
    parentFolderId: 'folder-1'
  },
  {
    id: 'file-4',
    name: 'Meeting Notes.docx',
    type: FileType.DOCUMENT,
    extension: 'docx',
    modified: getRecentDate(),
    parentFolderId: 'folder-3'
  }
];

export const recentFilesData = [
  ...folderData,
  ...fileData
];