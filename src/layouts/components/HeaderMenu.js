import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { styled, useTheme, theme } from '@mui/material/styles';
import { Box, Drawer, Button, IconButton, Divider } from '@mui/material';
import Iconify from 'src/components/Iconify';
import useResponsive from '../../hooks/useResponsive';
import { IsAuth, User, IsAdmin } from 'src/helpers/RouteHelper';
import palette from 'src/theme/palette';
import { logout } from 'src/store/api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LinkButton = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    display: 'inline-block',
    color: theme.palette.secondary.main,
    marginLeft: '3px',
    marginRight: '3px',
    padding: '5px',
    "&:hover": {
        color: theme.palette.secondary.main,
    },
    "&.active": {
        color: theme.palette.secondary.main,
    }
}));


const LinkDrawerButton = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    width: '100%',
    display: 'block',
    padding: '8px 20px',
    "&:hover": {
        color: theme.palette.primary.main,
    },
    "&.active": {
        color: theme.palette.secondary.main,
    }
}));

const btnStyle = {
    background: palette.secondary.main,
    color: palette.primary.main,
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: '.3rem'
}


export default function HeaderMenu(props) {

    const [drawerState, setDrawerState] = useState(false);
    const isDesktop = useResponsive('up', 'md');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme()
    const isAuth = IsAuth();
    const user = User()
    const isAdmin = IsAdmin()

    const handleDrawerOpen = () => {
        setDrawerState(true);
    };

    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    const logoutSession = () => {
        dispatch(logout({ navigate }))
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
                {isAuth == 0 ?
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
                        {isAdmin === 1 ?
                            <LinkButton
                                to="/dashboard"
                                activeclassname="active"
                            >
                                Dashboard
                            </LinkButton>
                            : ''
                        }
                        <LinkButton
                            to="/reportscrime"
                            activeclassname="active"
                        >
                            View Crimes
                        </LinkButton>
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
                <IconButton onClick={handleDrawerOpen} sx={{ mr: 1, color: "#fff" }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
                <Drawer
                    open={drawerState}
                    onClose={handleDrawerClose}
                >
                    <Box
                        sx={{
                            width: 250,
                            marginTop: '30px'
                        }}
                        role="presentation"
                    >
                        <LinkDrawerButton
                            to="/"
                            onClick={handleDrawerClose}
                            activeclassname="active"
                        >
                            Home
                        </LinkDrawerButton>
                        {isAuth == 0 ?
                            <>
                                <LinkDrawerButton
                                    to="/login"
                                    onClick={handleDrawerClose}
                                    activeclassname="active"
                                >
                                    Login
                                </LinkDrawerButton>
                                <LinkDrawerButton
                                    to="/register"
                                    onClick={handleDrawerClose}
                                    activeclassname="active"
                                >
                                    Register
                                </LinkDrawerButton>
                            </>
                            :
                            <>

                                <LinkDrawerButton
                                    to="/profile"
                                    onClick={handleDrawerClose}
                                    activeclassname="active"
                                >
                                    User Profile
                                </LinkDrawerButton>
                                <LinkDrawerButton
                                    to="/reportscrime"
                                    onClick={handleDrawerClose}
                                    activeclassname="active"
                                >
                                    View Crimes
                                </LinkDrawerButton>
                                <LinkDrawerButton
                                    to="/my-report"
                                    onClick={handleDrawerClose}
                                    activeclassname="active"
                                >
                                    My Reports
                                </LinkDrawerButton>
                                {isAdmin === 1 ?
                                    <>
                                        <Divider sx={{ height: '2px' }} />
                                        <LinkDrawerButton
                                            to="/dashboard"
                                            onClick={handleDrawerClose}
                                            activeclassname="active"
                                        >
                                            Dashboard
                                        </LinkDrawerButton>
                                        <LinkDrawerButton
                                            to="/user"
                                            onClick={handleDrawerClose}
                                            activeclassname="active"
                                        >
                                            Users
                                        </LinkDrawerButton>
                                        <LinkDrawerButton
                                            to="/reports"
                                            onClick={handleDrawerClose}
                                            activeclassname="active"
                                        >
                                            All Reports
                                        </LinkDrawerButton>
                                        <Divider sx={{ height: '2px' }} />
                                    </>
                                    : ''

                                }
                                <Button
                                    onClick={logoutSession}
                                    activeclassname="active"
                                    variant="text"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        background: 'transparent',
                                        marginLeft:'12px',
                                        marginTop: '4px',
                                        fontSize: '16px'
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        }
                    </Box>
                </Drawer>
            </>

    );
}