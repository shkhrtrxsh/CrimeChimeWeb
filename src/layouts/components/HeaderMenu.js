import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { styled, useTheme, theme } from '@mui/material/styles';
import { Box, Drawer, Button, IconButton } from '@mui/material';
import Iconify from 'src/components/Iconify';
import useResponsive from '../../hooks/useResponsive';
import { IsAuth, User } from 'src/helpers/RouteHelper';
import palette from 'src/theme/palette';
import { logout } from 'src/store/api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LinkButton = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    display:'inline-block',
    color: theme.palette.secondary.main,
    marginLeft: '3px',
    marginRight: '3px',
    padding:'5px',
    "&:hover":{
        color: theme.palette.secondary.main,
    },
    "&.active":{
        color: theme.palette.secondary.main,
    }
}));


const LinkDrawerButton = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.secondary.main,
    width:'100%',
    display: 'block',
    padding:'8px 20px',
    "&:hover":{
        color: theme.palette.secondary.main,
    },
    "&.active":{
        color: theme.palette.secondary.main,
    }
}));

const btnStyle = {
    background:palette.secondary.main,
    color:palette.primary.main,
    paddingLeft:'16px',
    paddingRight:'16px',
    borderRadius: '.3rem'
}

const menus = [
    {
        title:"Home",
        url:"/",
        style:1,
        is_auth:2 // auth or non auth
    },
    {
        title:"Register",
        url:"/register",
        style:1,
        is_auth:0
    },
    {
        title:"Login",
        url:"/login",
        style:2,
        is_auth:0
    },
    {
        title:"Logout",
        url:"/logout",
        style:2,
        is_auth:1
    }
] 

export default function HeaderMenu(props) {

    const [drawerState, setDrawerState] = useState(false);
    const isDesktop = useResponsive('up', 'lg');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme()
    const isAuth = IsAuth();
    const user = User()

    const handleDrawerOpen = () => {
        setDrawerState(true);
    };
    
    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    const logoutSession = () => {
        dispatch(logout({navigate}))
    }
    

    return (
        isDesktop ?
            <>
                <LinkButton 
                    to="/"
                    activeclassname="active"
                >
                    Home
                </LinkButton>
                { isAuth == 0 ?
                <>
                    <LinkButton 
                        to="/register"
                        activeclassname="active"                        
                    >
                        Register
                    </LinkButton>
                    <LinkButton 
                        to="/login"
                        activeclassname="active"
                        style={btnStyle}
                    >
                        Login
                    </LinkButton>
                </>
                :
                <>
                    <LinkButton 
                        to="/profile"
                        activeclassname="active"                        
                    >
                        Profile
                    </LinkButton>
                    <Button 
                        onClick={logoutSession}
                        activeclassname="active"
                        style={btnStyle}
                    >
                        Logout
                    </Button>
                    </>
                }
            </>
        :
        <>
            <IconButton onClick={handleDrawerOpen} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
                <Iconify icon="eva:menu-2-fill" />
            </IconButton>
            <Drawer
                open={drawerState}
                onClose={handleDrawerClose}
            >
                 <Box
                    sx={{ 
                        width:250,
                        marginTop:'30px' 
                    }}
                    role="presentation"
                    >
                    {menus && menus.map((menu, index) => (
                        <LinkDrawerButton 
                        to={menu.url}
                        key={index}
                        onClick={handleDrawerClose}
                        activeclassname="active"
                        >
                            {menu.title}
                        </LinkDrawerButton>
                    ))}
                </Box>
            </Drawer>
        </>
        
    );
}