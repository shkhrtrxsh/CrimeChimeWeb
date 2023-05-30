import Home from 'src/pages/Frontend/Home'
import ViewReport from 'src/pages/Frontend/ViewReport';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import OtpVerify from '../pages/Auth/OtpVerify';
import ViewReportMap from 'src/pages/Frontend/ViewReport/ViewReportMap';
import Page1 from '../pages/Frontend/AddReport/page1'
import Page2 from '../pages/Frontend/AddReport/page2'
import Page3 from '../pages/Frontend/AddReport/page3'
import Page4 from '../pages/Frontend/AddReport/page4'
import Page5 from '../pages/Frontend/AddReport/page5'
import Page6 from '../pages/Frontend/AddReport/page6'
import Page7 from '../pages/Frontend/AddReport/page7'
import Page8 from '../pages/Frontend/AddReport/page8'
import Page9 from '../pages/Frontend/AddReport/page9'
import Page10 from '../pages/Frontend/AddReport/page10'
import Page11 from '../pages/Frontend/AddReport/page11'
import Page12 from '../pages/Frontend/AddReport/page12'
import Page13 from '../pages/Frontend/AddReport/page13'
import Page14 from '../pages/Frontend/AddReport/page14'
import Page15 from '../pages/Frontend/AddReport/page15'
import Page16 from '../pages/Frontend/AddReport/page16'

const FrontendRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/page1',
        element: <Page1/>
    },
    {
        path: '/page2',
        element: <Page2/>
    },
    {
        path: '/page3',
        element: <Page3/>
    },
    {
        path: '/page4',
        element: <Page4/>
    },
    {
        path: '/page5',
        element: <Page5/>
    },
    {
        path: '/page6',
        element: <Page6/>
    },
    {
        path: '/page7',
        element: <Page7/>
    },
    {
        path: '/page8',
        element: <Page8/>
    },
    {
        path: '/page9',
        element: <Page9/>
    },
    {
        path: '/page10',
        element: <Page10/>
    },
    {
        path: '/page11',
        element: <Page11/>
    },
    {
        path: '/page12',
        element: <Page12/>
    },
    {
        path: '/page13',
        element: <Page13/>
    },
    {
        path: '/page14',
        element: <Page14/>
    },
    {
        path: '/page15',
        element: <Page15/>
    },
    {
        path: '/page16',
        element: <Page16/>
    },
    {
        path: 'reportshome', 
        element: <Home />
    },
    {
        path: 'reportscrime', 
        element: <ViewReportMap />
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