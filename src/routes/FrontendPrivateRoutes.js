import AddReport from "src/pages/Frontend/Report/AddReport";
import Profile from "src/pages/Frontend/User/Profile";

const FrontendPrivateRoutes = [
    {
        path: '/report/add',
        element: <AddReport />
    },
    {
        path: '/profile',
        element: <Profile />
    },
]


export default FrontendPrivateRoutes;