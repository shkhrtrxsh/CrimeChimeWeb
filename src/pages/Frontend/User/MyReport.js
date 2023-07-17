import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getMyReport } from 'src/store/api/report';
import { Box, Button, Container, Grid, Tooltip } from '@mui/material';
import UserSideName from './components/UserSideNav';
import Page from '../../../components/Page';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { setCrimeIndex, setEdit, setNearbyReports, setPage } from 'src/store/reducers/registerReport';
import { css } from '@emotion/css';
import ClampLines from 'react-clamp-lines';
import styled from '@emotion/styled';
import NoData from 'src/assets/svg/no-data.svg';

const StyledGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    width:100%;
    height:calc( 100vh - 65px );
    max-height:calc( 100vh - 65px );
    justify-content: center;
    align-items: center;
`

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

    const handleEdit = (report)=>{
        let newReport = {...report,crime:null,specific_crime:null}; 
        const report_image=newReport.report_image
        newReport.files=newReport.fileName=(process.env.REACT_APP_API_URL+"/"+report_image?.path)||null; 
        newReport.report_image=null;
        //remove null values from newReport
        const keyList = Object.keys(newReport);
        keyList.forEach((key)=>{
            if((newReport[key]==null)){
                delete newReport.key;
            }
        })                                            
        dispatch(setEdit(true));
        dispatch(setPage(newReport));
        navigate("/report/add");
    }

    return (
        <Page title="My Report">
            <Container sx={{
                marginTop: '20px',
            }}>
                <Grid container spacing={3}>
                    <UserSideName />
                    {reports?.data?<Grid item md={9} xs={12}>
                        <Grid container spacing={3}>
                            {reports.data && reports.data.map((report, index) => {
                                let path = (report?.report_image&&report.report_image?.path);
                                if(!(path===null||path === '')){
                                    path=process.env.REACT_APP_API_URL+"/"+path;
                                }
                                return(
                                <Grid item lg={4} md={6} xs={12} key={index}>
                                    <Box sx={{width:"100%",display:'flex',justifyContent:"center"}}>
                                        <Card sx={{width:{xs:"100%"},maxWidth:{sm:"300px",md:"100%"},maxHeight:"450px",height:"450px",display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                        {(!(path===null||path === '') &&isImage(path))? (
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                image={path}
                                                width="300px"
                                                height="300px"
                                                sx={{objectFit:"contain",maxWidth:"300px",maxHeight:"200px"}}
                                            />) :(!(path===null||path === '') &&isVideo(path))? (
                                                <video className="VideoInput_video" width="300px" height="200px" sx={{maxWidth:"300px",maxHeight:"200px"}}  controls src={path} />
                                            ):(
                                                <Box sx={{display:"flex",width:"300px",height:"200px",alignItems:"center",justifyContent:"center"}}>
                                                    No media Available
                                                </Box>
                                                )
    
                                        }
                                            <CardContent>
                                                <Tooltip title={report.location}>
                                                    <Typography gutterBottom variant="h5" component="div" className={css`
                                                        max-height:100px;
                                                        min-height:100px;
                                                        height:100px;
                                                        
                                                    `}>
                                                        <ClampLines
                                                            text={report.location}
                                                            lines={3}
                                                            ellipsis="..."
                                                            innerElement="p"
                                                            stopPropagation={true}
                                                            buttons={false}
                                                        />
                                                    </Typography>
                                                </Tooltip>
                                                
                                                <Tooltip title={report?.description||""}>
                                                    <Typography variant="body2" color="text.secondary" className={css`
                                                        margin-top:15px;
                                                        max-height:22px;
                                                        min-height:22px;
                                                        height:22px;
                                                    `}>
                                                        <ClampLines
                                                            text={report?.description||"No Description"}
                                                            lines={2}
                                                            ellipsis="..."
                                                            innerElement="p"
                                                            stopPropagation={true}
                                                            buttons={false}
                                                        />
                                                    </Typography>
                                                </Tooltip>
                                            </CardContent>
                                            <CardActions sx={{    paddingLeft: '24px'}}>
                                                <Button onClick={() => {
                                                    dispatch(setNearbyReports(reports.data));
                                                    dispatch(setCrimeIndex({index,viewCrime:true}))
                                                    navigate("/reportscrime")
                                                    
                                                }} size="small">View Report</Button>
                                                <Button onClick={() => {
                                                    handleEdit(report);
                                                }} size="small">Edit Report</Button>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </Grid>
                            )
                            })}
                        </Grid>
                    </Grid>:<StyledGrid md={9} xs={12}>
                        <img src={NoData} alt="No Data Available"/>
                        <Typography variant="h4">No Records Found</Typography>
                    </StyledGrid>
                    }
                </Grid>
            </Container>
        </Page>
    );
}

export default MyReport
