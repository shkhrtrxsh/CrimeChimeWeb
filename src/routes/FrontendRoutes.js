import Home from 'src/pages/Frontend/Home'
import ViewReport from 'src/pages/Frontend/ViewReport';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import OtpVerify from '../pages/Auth/OtpVerify';
import ViewReportMap from 'src/pages/Frontend/ViewReport/ViewReportMap';
import ViewCrime from 'src/pages/Frontend/ViewCrime/ViewCrime';

const FrontendRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'reportshome', 
        element: <Home />
    },
    {
        path: 'reportscrime', 
        element: <ViewCrime />
    },
    {
        path: '/report',
        element: <ViewReport />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/auth/verify',
        element: <OtpVerify />
    },
]


export default FrontendRoutes;