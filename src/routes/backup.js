import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import AppLayoutWithSidebar from '../layouts/AppLayoutWithSidebar';
import AppLayout from '../layouts/AppLayout';

//
import Blog from '../pages/Blog';
import User from '../pages/User';
import Login from '../pages/Auth/Login';
import NotFound from '../pages/Error/Page404';
import Register from '../pages/Auth/Register';
import Products from '../pages/Products';
import DashboardApp from '../pages/Backend/Dashboard';

import AddRole from '../pages/Backend/UserRole/Role/AddRole'
import Role from '../pages/Backend/UserRole/Role/Role'
import EditRole from 'src/pages/Backend/UserRole/Role/EditRole';
import RolePermission from 'src/pages/Backend/UserRole/RolePermission';
import BackendPrivateRoutes from './BackendPrivateRoutes';

// ----------------------------------------------------------------------

export default function Router() {

  const isAuth = localStorage.getItem("_token") ? true : false ; 
  const routesPermission = JSON.parse(localStorage.getItem("_routes")) ? JSON.parse(localStorage.getItem("_routes")) : null;

  const inArray = (needle, haystack) => {
    for(var i = 0; i < haystack.length; i++) {
        if(haystack[i] === needle) return true;
    }
    return false;
  }

  BackendPrivateRoutes.forEach(route => {
    if(routesPermission){
      if(!inArray(route.path, routesPermission)){
        // route.element = AccessDenied[0].element
      }
    }
  });

  const RouteIndexing = [

    {
      path: '/login',
      element: isAuth === false ? <Login /> : <Navigate to="/" /> 
    },
    {
      path: '/register',
      element: isAuth === false ? <Register />  : <Navigate to="/" /> 
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: 'role/:id', element: <EditRole />
        },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
       
      ],
    },
    {
      path: '/',
      element: isAuth === false ? <AppLayoutWithSidebar /> : <Navigate to="/login"  />,
      children: BackendPrivateRoutes
    }
  ]


  return useRoutes([
    {
      path: '/',
      element: <AppLayoutWithSidebar />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: 'role/:id', element: <EditRole />
        },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
       
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
