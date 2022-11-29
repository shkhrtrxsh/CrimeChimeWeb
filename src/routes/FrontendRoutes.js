import { Navigate, useRoutes } from 'react-router-dom';
import Home from 'src/pages/Frontend/Home'
import MyGoogleMap from 'src/pages/Frontend/MyGoogleMap'
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import OtpVerify from '../pages/Auth/OtpVerify';

const FrontendRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/map',
        element: <MyGoogleMap />
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