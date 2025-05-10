export const Permission = {
  VIEW: 'view',
  EDIT: 'edit',
  DOWNLOAD: 'download'
};

export const Role = {
  OWNER: 'owner',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

export const RolePermissions = {
  [Role.OWNER]: [Permission.VIEW, Permission.EDIT, Permission.DOWNLOAD],
  [Role.EDITOR]: [Permission.VIEW, Permission.EDIT, Permission.DOWNLOAD],
  [Role.VIEWER]: [Permission.VIEW, Permission.DOWNLOAD]
};