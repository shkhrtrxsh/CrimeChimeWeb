import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { APPBAR_DESKTOP } from 'src/constants/theme'
import { Box, Typography, Fab, Modal, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { CurrentLocationCoordinates, mapSettings } from 'src/helpers/LocationHelper';
import useResponsive from 'src/hooks/useResponsive';
import { styled, useTheme } from '@mui/material/styles';

const containerStyle = {
    width: '100%',
    height: `calc(100vh - ${APPBAR_DESKTOP + 110}px )`
};

const BoxButtonStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '15px',
    top: APPBAR_DESKTOP + 15 + 110 + 'px',
    '& .MuiButtonBase-root.MuiFab-root': {
        marginRight: '10px'
    }
}));

const MapDivStyle = styled('div')(({ theme }) => ({
    height: `calc(100vh - ${APPBAR_DESKTOP + 110}px )`,
    width: '100%',
    '& .gm-control-active.gm-fullscreen-control': {
        display: 'none'
    }
}));


const HomeMap = () => {
    const position = CurrentLocationCoordinates()
    const isDesktop = useResponsive('up', 'md');
    const [open, setOpen] = React.useState(true);
    const theme = useTheme()

    const handleClose = () => setOpen(false);

    return (
        <>
            <Box sx={{
                background: theme.palette.secondary.main,
                textAlign: 'center',
                padding: '40px'
            }}>
                <Typography variant='h5'>
                    Advertisment
                </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{
                    background: theme.palette.secondary.main,
                    textAlign: 'center',
                    width: '30%',
                    height: `calc(100vh - ${APPBAR_DESKTOP + 110}px )`,
                    [theme.breakpoints.down('md')]: {
                        display: 'none',
                    },
                }}>
                    <Typography variant='h5' sx={{ paddingTop: '150px' }}>
                        Advertisment
                    </Typography>
                </Box>
                <MapDivStyle>
                    <BoxButtonStyle>
                        <Fab
                            size="medium"
                            color="primary"
                            aria-label="add report"
                            to="/report/add"
                            component={Link}
                            variant={isDesktop ? 'extended' : 'circular'}
                        >
                            <AddIcon />
                            {isDesktop &&
                                <Typography component='h6'>Report Crime</Typography>
                            }
                        </Fab>
                        <Fab
                            size="medium"
                            color="primary"
                            aria-label="reported crimes"
                            to="/report"
                            component={Link}
                            variant={isDesktop ? 'extended' : 'circular'}
                        >
                            <VisibilityIcon />
                            {isDesktop &&
                                <Typography component='h6' sx={{ marginLeft: '3px' }}>View Crime</Typography>
                            }
                        </Fab>
                    </BoxButtonStyle>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={position}
                        zoom={10}
                        options={mapSettings}
                    >
                        <Marker
                            position={position}
                        />
                    </GoogleMap>
                </MapDivStyle>
            </Box>
            <Modal
                keepMounted
                open={open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    [theme.breakpoints.down('sm')]: {
                        width: '90%',
                    },
                }}>
                    <Typography id="keep-mounted-modal-description">
                    CrimeChime is a revolutionary force for good meant to keep South Africans and visitors of this beautiful country safe. Please be mindful of your submissions, only report crimes you have experienced first hand in order to protect the integrity of this platform. CrimeChime is firmly opposed to vigilantism. Be safe, be smart, and be well. Thank you!
                    </Typography>
                    <Box
                        sx={{
                            marginTop:5
                        }}
                    >
                    <Button
                        sx={{
                            margin: "auto",
                            display: "block"
                        }}
                        onClick={handleClose}
                    >I understand</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default HomeMap;