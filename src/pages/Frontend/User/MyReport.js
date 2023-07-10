import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getMyReport } from 'src/store/api/report';
import { Box, Button, Container, Grid } from '@mui/material'
import UserSideName from './components/UserSideNav';
import Page from '../../../components/Page';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NoMedia from 'src/assets/images/unavailable.svg'
import { setCrimeIndex, setNearbyReports } from 'src/store/reducers/registerReport';

const MyReport = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { reports } = useSelector((state) => ({ ...state.report }));

    useEffect(() => {
        dispatch(getMyReport({}))
    }, [])
    const videoExtensions = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'] //you can add more extensions
    let vistatus

    function isImage(url) {
        const imageExtensions = ['.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp'];
        const lowerCaseUrl = url.toLowerCase();
        return imageExtensions.some(extension => lowerCaseUrl.endsWith(extension));
      }
      
    function isVideo(url) {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.ogv', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.m4v', '.3gp'];
        const lowerCaseUrl = url.toLowerCase();
        return videoExtensions.some(extension => lowerCaseUrl.endsWith(extension));
    }

    return (
        <Page title="My Report">
            <Container sx={{
                marginTop: '20px'
            }}>
                <Grid container spacing={3}>
                    <UserSideName />
                    <Grid item md={9} xs={12}>
                        <Grid container spacing={3}>
                            {reports.data && reports.data.map((report, index) => {
                                let path = (report?.report_image&&report.report_image?.path);
                                if(!(path===null||path === '')){
                                    path=process.env.REACT_APP_API_URL+"/"+path;
                                }
                                return(
                                <Grid item md={4} xs={12} key={index}>
                                    <Card sx={{maxWidth:"300px",maxHeight:"450px",height:"450px"}}>
                                    {(!(path===null||path === '') &&isImage(path))? (
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            image={path}
                                            width="300px"
                                            height="300px"
                                            sx={{objectFit:"contain",maxWidth:"300px",maxHeight:"200px"}}
                                        />) :(!(path===null||path === '') &&isVideo(path))? (
                                            <video className="VideoInput_video" width="300px" height="300px" controls src={path} />
                                        ):(
                                            <Box sx={{display:"flex",width:"300px",height:"200px",alignItems:"center",justifyContent:"center"}}>
                                                No media Available
                                            </Box>
                                            )

                                    }
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {report.location}
                                            </Typography>
                                            
                                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '15px' }}>
                                                {report.description||"No Description"}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{    paddingLeft: '24px'}}>
                                            <Button onClick={() => {
                                                dispatch(setNearbyReports(reports.data));
                                                dispatch(setCrimeIndex({index,viewCrime:true}))
                                                navigate("/reportscrime")
                                                
                                            }} size="small">view Report</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default MyReport
