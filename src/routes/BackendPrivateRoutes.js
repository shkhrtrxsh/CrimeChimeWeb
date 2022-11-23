import Dashboard from '../pages/Backend/Dashboard';
//User
import AddUser from '../pages/Backend/User/AddUser'
import User from '../pages/Backend/User/User'
import EditUser from '../pages/Backend/User/EditUser'
//Role
import AddRole from '../pages/Backend/RolePermission/Role/AddRole'
import Role from '../pages/Backend/RolePermission/Role/Role'
import EditRole from 'src/pages/Backend/RolePermission/Role/EditRole';
//Permission
import AddPermission from '../pages/Backend/RolePermission/Permission/AddPermission'
import Permission from '../pages/Backend/RolePermission/Permission/Permission'
import EditPermission from 'src/pages/Backend/RolePermission/Permission/EditPermission';
//Permission Module
import PermissionModule from '../pages/Backend/RolePermission/PermissionModule/PermissionModule'
import AddPermissionModule from '../pages/Backend/RolePermission/PermissionModule/AddPermissionModule'
import EditPermissionModule from '../pages/Backend/RolePermission/PermissionModule/EditPermissionModule'
//Role Permission
import RolePermission from 'src/pages/Backend/Permission/RolePermission';


const BackendPrivateRoutes = [
    {
        path: 'user/add',
        element: <AddUser />,
    },
    {
        path: 'user',
        element: <User />,
    },
    {
        path: 'user/:id/edit', 
        element: <EditUser />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'role/add',
        element: <AddRole />,
    },
    {
        path: 'role',
        element: <Role />,
    },
    {
        path: 'role/:id/edit', 
        element: <EditRole />
    },
    {
        path: 'role-permission/:slug', 
        element: <RolePermission />
    },
    {
        path: 'permission/add/:id',
        element: <AddPermission />,
    },
    {
        path: 'permission/:id',
        element: <Permission />,
    },
    {
        path: 'permission/:id/edit/:pid', 
        element: <EditPermission />
    },
    {
        path: 'permission-module',
        element: <PermissionModule />,
    },
    {
        path: 'permission-module/add',
        element: <AddPermissionModule />,
    },
    {
        path: 'permission-module/:id/edit',
        element: <EditPermissionModule />,
    },
]


export default BackendPrivateRoutes;