import { FileType } from '../constants/fileTypes';

const getRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};


export const folderData = [
  {
    id: 'folder-1',
    name: 'folder-1',
    type: FileType.FOLDER,
    modified: getRecentDate()
  },
  {
    id: 'folder-2',
    name: 'folder-2',
    type: FileType.FOLDER,
    modified: getRecentDate()
  },
  {
    id: 'folder-3',
    name: 'folder-3',
    type: FileType.FOLDER,
    modified: getRecentDate()
  },
  {
    id: 'folder-4',
    name: 'folder-4',
    type: FileType.FOLDER,
    modified: getRecentDate()
  }
];


export const fileData = [
  {
    id: 'file-1',
    name: 'file-1.pptx',
    type: FileType.PRESENTATION,
    extension: 'pptx',
    modified: getRecentDate()
  },
  {
    id: 'file-2',
    name: 'file-2.pptx',
    type: FileType.PRESENTATION,
    extension: 'pptx',
    modified: getRecentDate()
  },
  {
    id: 'file-3',
    name: 'file-3.pptx',
    type: FileType.PRESENTATION,
    extension: 'pptx',
    modified: getRecentDate()
  },
  {
    id: 'file-4',
    name: 'file-4.pptx',
    type: FileType.PRESENTATION,
    extension: 'pptx',
    modified: getRecentDate()
  }
];

export const recentFilesData = [
  ...folderData,
  ...fileData
];