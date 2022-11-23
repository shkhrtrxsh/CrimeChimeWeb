import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Box, Drawer, Button, IconButton } from '@mui/material';
import Iconify from 'src/components/Iconify';
import useResponsive from '../../hooks/useResponsive';


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


const menus = [
    {
        title:"Home",
        url:"/",
        style:1
    },
    {
        title:"Register",
        url:"/register",
        style:1
    },
    {
        title:"Login",
        url:"/login",
        style:2
    },
    // {
    //     title:"About Me",
    //     url:"about-me"
    // },
    // {
    //     title:"Contact Me",
    //     url:"contact-me"
    // },
] 

export default function HeaderMenu(props) {

    const [drawerState, setDrawerState] = useState(false);
    const isDesktop = useResponsive('up', 'lg');

    const handleDrawerOpen = () => {
        setDrawerState(true);
      };
    
      const handleDrawerClose = () => {
        setDrawerState(false);
      };

    return (
        isDesktop ?
        menus && menus.map((menu, index) => (
            <LinkButton 
            to={menu.url}
            key={index}
            activeclassname="active"
            >
                {menu.title}
            </LinkButton>
        ))
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