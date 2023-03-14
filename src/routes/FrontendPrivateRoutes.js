import AddReport from "src/pages/Frontend/AddReport";
import Profile from "src/pages/Frontend/User/Profile";
import EditProfile from "src/pages/Frontend/User/EditProfile";
import EditAddress from "src/pages/Frontend/User/EditAddress";
import MyReport from "src/pages/Frontend/User/MyReport";

const FrontendPrivateRoutes = [
    {
        path: '/report/add',
        element: <AddReport />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/profile/edit',
        element: <EditProfile />
    },
    {
        path: '/profile/address-edit',
        element: <EditAddress />
    },
    {
        path: '/my-report',
        element: <MyReport />
    },
]


export default FrontendPrivateRoutes;