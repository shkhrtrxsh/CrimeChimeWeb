import Dashboard from '../pages/Backend/Dashboard';
//User
import AddUser from '../pages/Backend/User/AddUser'
import User from '../pages/Backend/User/User'
import EditUser from '../pages/Backend/User/EditUser'
import ShowUser from '../pages/Backend/User/ShowUser'
//Role
import AddRole from '../pages/Backend/Role/AddRole'
import Role from '../pages/Backend/Role/Role'
import EditRole from 'src/pages/Backend/Role/EditRole';
//Report
import Report from '../pages/Backend/Report/Report'
import Addnote from '../pages/Backend/Report/Addnote';



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
        path: 'user/:id',
        element: <ShowUser />,
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
        path: 'reports', 
        element: <Report />
    },
    {
        path: 'add_not/:id',
        element: <Addnote />
    },
]


export default BackendPrivateRoutes;