import rbac from 'rbacjs';

const rolesConfig = [
  {
    roles: ['USER'],
    permissions: ['READ'],
  },
  {
    roles: ['ADMIN'],
    permissions: ['DELETE', 'READ', 'EDIT', 'EDIT.BUTTON'],
  },
];
/* eslint-disable-next-line */
export default new rbac({ rolesConfig });
