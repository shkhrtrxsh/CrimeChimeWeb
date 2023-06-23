import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { loadGoogleMaps } from 'src/utils/googleMap';
import GoogleMap from 'src/components/GoogleMap/GoogleMap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setPage13, setPage2, setPage3 } from 'src/store/reducers/registerReport';
import Page1 from '../../pages/Frontend/AddReport/page1'
import Page2 from '../../pages/Frontend/AddReport/page2'
import Page3 from '../../pages/Frontend/AddReport/page3'
import Page4 from '../../pages/Frontend/AddReport/page4'
import Page5 from '../../pages/Frontend/AddReport/page5'
import Page6 from '../../pages/Frontend/AddReport/page6'
import Page7 from '../../pages/Frontend/AddReport/page7'
import Page8 from '../../pages/Frontend/AddReport/page8'
import Page9 from '../../pages/Frontend/AddReport/page9'
import Page10 from '../../pages/Frontend/AddReport/page10'
import Page11 from '../../pages/Frontend/AddReport/page11'
import Page12 from '../../pages/Frontend/AddReport/page12'
import Page13 from '../../pages/Frontend/AddReport/page13'
import Page14 from '../../pages/Frontend/AddReport/page14'
import Page15 from '../../pages/Frontend/AddReport/page15'
import Page16 from '../../pages/Frontend/AddReport/page16'
import CancelIcon from '@mui/icons-material/Cancel';
import PageSubmit from 'src/pages/Frontend/AddReport/pageSubmit';
const ReportPageRouter = ({selectActive=1,setSelectActive})=>{
    const ReportPages=[
        <Page1/>,<Page2 setSelectActive={setSelectActive}/>,<Page3/>,<Page4/>,<Page5/>,<Page6/>,<Page7/>,<Page8/>,<Page9/>,<Page10/>,<Page11/>,<Page12/>,<Page13/>,<Page14/>,<Page15/>,<Page16 setSelectActive={setSelectActive}/>
    ]
    return ReportPages[selectActive-1];
}

const ReportWrapper = () => {
    const data = useSelector(state=>state.reportRegister.data);
    const {longitude,latitude} = data;
    const [cancel,setCancel] = useState(true);
    const [selectActive, setSelectActive] = useState(1);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname)
    useEffect(() => {
      loadGoogleMaps(dispatch,longitude,latitude);  
    }, [selectActive,dispatch,cancel]);

    const theme = useTheme();
    const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    if([2].includes(selectActive))return <ReportPageRouter selectActive={selectActive} setSelectActive={setSelectActive}/>
    //return <PageSubmit/>
    return (
        <div style={{ height: '100%',maxHeight:"91.3vh", display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
            <div style={{ width: isMdBreakpoint ? '33.33%' : '100%',display:'flex',flexDirection:'column',height:"100%" }}>
                <Box sx={{overflowY:"scroll"}}>
                    <ReportPageRouter selectActive={selectActive}/>
                </Box>
                {isMdBreakpoint||cancel ?null:
                    <Box sx={{ width: '100%', height: "100%",flexGrow:1,backgroundColor:"#ffe600" }}>
                        <Box sx={{display:"flex",flexDirection:"row-reverse",my:2}} onClick={()=>setCancel(true)}>
                            <CancelIcon sx={{ml:1,mr:3}}/>
                            <Typography >close</Typography>
                        </Box>
                        <Box id="map" sx={{ width: '100%', height: '100%'}}>
                        </Box>
                    </Box>
                }
                <Box sx={{flexGrow:1,height:"min-content"}}>
                    <ProgressBar activeStep={selectActive} setActiveStep={setSelectActive} backLink={selectActive-1} nextLink="/report/page2" cancelState={[cancel,setCancel]}/>
                </Box>
            </div>
            <div style={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
            <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
            </div>
        </div>
    );
}

export default ReportWrapper