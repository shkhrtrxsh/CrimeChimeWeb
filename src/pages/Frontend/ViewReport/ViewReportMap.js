import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { styled, useTheme } from '@mui/material/styles';
import {
    Stack,
    Typography,
    Drawer,
    Paper
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getReportByArea } from 'src/store/api/report';
import { CurrentLocationCoordinates } from 'src/helpers/LocationHelper';

import { APPBAR_DESKTOP } from 'src/constants/theme'
import SearchFilter from './SearchFilter';
import { mapSettings } from 'src/helpers/LocationHelper';
import { Box } from '@mui/system';



const containerStyle = {
    width: '100%',
    height: `calc(100vh - ${APPBAR_DESKTOP}px)`
};

const OuterPaperStyle = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width: '500px',
    },
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '60px'
}));

const ImageList = styled('img')(({ theme }) => ({
    width:'47%',
    margin: '1% 1.5%',
    display: 'inline-block',
    boxShadow: `${theme.shadows[3]} !important`,
    borderRadius: Number(theme.shape.borderRadius),
}));

const ViewReportMap = (props) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const theme = useTheme();
    const [detailToggleState, setDetailToggleState] = useState(false);
    const [reportDetail, setReportDetail] = useState(null);
    const [newViewport, setNewViewport] = useState({
        lat:0,
        lng:0
    })

    const detailToggleDrawer = (event) => {
        setDetailToggleState(event);
    };

    let position = CurrentLocationCoordinates()

    

    const { reports } = useSelector((state) => ({ ...state.report }));

    useEffect(() => {
        let query = '';
        if (searchParams.get('id')) {
            query += `id=${searchParams.get('id')}`
        } else {
            if (searchParams.get('iahi') !== null && searchParams.get('iahi') !== "") {
                query += `iahi=${searchParams.get('iahi')}&`
            }
            if (searchParams.get('ialo') !== null && searchParams.get('ialo') !== "") {
                query += `ialo=${searchParams.get('ialo')}&`
            }
            if (searchParams.get('wahi') !== null && searchParams.get('wahi') !== "") {
                query += `wahi=${searchParams.get('wahi')}&`
            }
            if (searchParams.get('walo') !== null && searchParams.get('walo') !== "") {
                query += `walo=${searchParams.get('walo')}&`
            }
            if (searchParams.get('location') !== null && searchParams.get('location') !== "") {
                query += `location=${searchParams.get('location')}&`
            }
            if (searchParams.get('crime') !== null && searchParams.get('crime') !== "") {
                query += `crime=${searchParams.get('crime')}&`
            }
            if (searchParams.get('specific-crime') !== null && searchParams.get('specific-crime') !== "") {
                query += `specific-crime=${searchParams.get('specific-crime')}`
            }
            
        }
        dispatch(getReportByArea({ query }))
        
    }, [searchParams])

    useEffect(() => {
        if (searchParams.get('target') === 'single' && reports.data !== null && reports.data.length !== 0) {
            setNewViewport({
                lat : Number(reports.data[0].latitude),
                lng : Number(reports.data[0].longitude)
            })
        }
    }, [reports])

    const reportDetails = (report) => {
        setReportDetail(report)
        setDetailToggleState(true)
    }

    const viewportPosition = (pos) => {
        setNewViewport({
            lat:pos.lat,
            lng:pos.lng
        })
    }

    const printDate = (created_at) => {
        let objectDate = new Date(created_at);
        return objectDate.getDate() + '/' + objectDate.getMonth() + '/' + objectDate.getFullYear()
    }

    return (
        <>
            <Drawer
                anchor="left"
                open={detailToggleState}
                onClose={() => detailToggleDrawer(false)}
                sx={{ "& .MuiDrawer-paper" : {
                    
                    [theme.breakpoints.down('md')]: {
                        width:'85%',
                    },
                }}}
            >
                <OuterPaperStyle>
                    <Stack spacing={3}>
                        <Typography component="h4" color="text.secondary">Address: </Typography>
                        <Typography variant="h5" component="h5" sx={{marginTop:'0px !important'}}>
                            { reportDetail && reportDetail.location }
                        </Typography>
                        <Box>
                            <img style={{
                                width: '50px',
                                paddingRight: '8px',
                                paddingTop: '4px',
                                float: 'left'
                            }}
                                src={reportDetail && process.env.REACT_APP_API_URL + '/' + reportDetail.crime.icon_3d} />
                            <Typography variant="h6" component="h6">
                                {reportDetail && reportDetail.crime.name}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {reportDetail && reportDetail.specific_crime.name}
                            </Typography>
                        </Box>
                        <Typography component="h4" color="text.secondary">Description: <span style={{color: "#999999", fontSize: "13px", float: "right"}}>{reportDetail && printDate(reportDetail.created_at)}</span></Typography>
                        <Typography variant="body2" sx={{marginTop:'0px !important'}}>                            
                            {reportDetail && reportDetail.description}
                        </Typography>
                        <Box>
                            <Typography component="h4" color="text.secondary">Images & Attachments: </Typography>
                            {reportDetail ? reportDetail.report_images.map((image, index) => (
                                <ImageList src={reportDetail && process.env.REACT_APP_API_URL + '/' + image.path} key={index} />
                            )) : 
                                <ImageList src={process.env.REACT_APP_API_URL + '/assets/image/no-image.jpg'} />
                            }                            
                        </Box>
                    </Stack>
                </OuterPaperStyle>
            </Drawer>

            <SearchFilter viewportPosition={viewportPosition} />
            
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={newViewport.lng == 0 ? position : newViewport}
                zoom={7}
                options={mapSettings}
            >
                {reports.data && reports.data.map((report, index) => (
                    <Marker key={index}
                        position={{
                            lat: Number(report.latitude),
                            lng: Number(report.longitude)
                        }}
                        icon={process.env.REACT_APP_API_URL + '/' + report.crime.icon_3d}
                        onClick={() => { reportDetails(report) }}
                        // onMouseOver={() => {console.log('mouse over')}}
                        // onMouseDown={() => {console.log('mouse down')}}

                    />
                ))}

            </GoogleMap>
        </>
    )
}

export default ViewReportMap;