import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getMyReport } from 'src/store/api/report';
import { Button, Container, Grid } from '@mui/material'
import UserSideName from './components/UserSideNav';
import Page from '../../../components/Page';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MyReport = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { reports } = useSelector((state) => ({ ...state.report }));

    useEffect(() => {
        dispatch(getMyReport({}))
    }, [])



    return (
        <Page title="My Report">
            <Container sx={{
                marginTop: '20px'
            }}>
                <Grid container spacing={3}>
                    <UserSideName />
                    <Grid item md={9} xs={12}>
                        <Grid container spacing={3}>
                            {reports.data && reports.data.map((report, index) => (
                                <Grid item md={6} xs={12} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            image={report.report_image ? process.env.REACT_APP_API_URL + '/' + report.report_image.path : process.env.REACT_APP_API_URL + '/assets/image/no-image.jpg'}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {report.location}
                                            </Typography>
                                            <Typography variant="body1" color="text.primary">
                                                <img style={{
                                                    width: '45px',
                                                    paddingRight: '8px',
                                                    paddingTop: '4px',
                                                    float: 'left'
                                                }}
                                                    src={process.env.REACT_APP_API_URL + '/' + report.crime.icon} 
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src=process.env.REACT_APP_API_URL + '/assets/image/no-image.jpg'
                                                    }}
                                                />

                                                {report.crime.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                {report.specific_crime.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '15px' }}>
                                                {report.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{    paddingLeft: '24px'}}>
                                            <Button onClick={() => {navigate('/report?target=single&id='+report.id)}} size="small">view Report</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default MyReport
