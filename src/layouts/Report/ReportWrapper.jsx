import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { loadGoogleMaps } from 'src/utils/googleMap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setPage13, setPage2, setPage3 } from 'src/store/reducers/registerReport';
import Page1 from '../../pages/Frontend/AddReport/page1'
import Duplicate from '../../pages/Frontend/AddReport/duplicate'
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
import Page16, { SubmitDialog } from '../../pages/Frontend/AddReport/page16'
import CancelIcon from '@mui/icons-material/Cancel';
import PageSubmit from 'src/pages/Frontend/AddReport/pageSubmit';
import VerticalProgressBar from 'src/components/Progress/VerticalProgressBar';
import { objectToFormData } from 'src/utils/formatObject';
import API from 'src/config/api';
const ReportPageRouter = ({selectActive=1,setSelectActive,openState})=>{
    const ReportPages=[
        <Page1/>,<Page2 setSelectActive={setSelectActive}/>,<Duplicate/>,<Page3/>,<Page4/>,<Page5/>,<Page6/>,<Page7/>,<Page8/>,<Page9/>,<Page10/>,<Page11/>,<Page12/>,<Page13/>,<Page14/>,<Page15/>,<Page16 setSelectActive={setSelectActive} openState={openState}/>
    ]
    return ReportPages[selectActive-1];
}

const ReportWrapper = () => {
    const register = useSelector(state=>state.reportRegister);
    const {data,zoom,lock} = register;
    const {longitude,latitude,vehicle_theft} = data;
    const [cancel,setCancel] = useState(true);
    const [selectActive, setSelectActive] = useState(1);
    const openState = useState(false);
    const [open,setOpen] = useState(false);
    const [confirm,setConfirm] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname)
    useEffect(() => {
      loadGoogleMaps(dispatch,longitude,latitude,zoom);  
    }, [selectActive,dispatch,cancel]);

    const setActiveStep = (oldStep,newStep)=>{
        if(oldStep===9||oldStep===11){
            if(newStep===10&&vehicle_theft==="4"){
                setSelectActive(oldStep===9?11:9);
                return;
            }
        }
        setSelectActive(newStep);
    }
    const beforeNext = ()=>{
        setOpen(true);
      }

      const onClickEvent = async()=>{
        try {
          const formData =objectToFormData(data);
          await API.post("/report",formData);
        } catch (error) {
          console.log(error);
        }
        setConfirm(true);
      }
    const theme = useTheme();
    const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    if([2].includes(selectActive))return <ReportPageRouter selectActive={selectActive} setSelectActive={setSelectActive}/>
    //return <PageSubmit/>
    return (
        <Box sx={{ height: '100%',maxHeight:"91.3vh", display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
            <SubmitDialog open={open} handleClose={()=>setOpen(false)} confirm={confirm} onClickEvent={onClickEvent} />
            <Box sx={{height:"100%",position:"fixed",display:"flex",alignItems:"center",top:0}}>
                <VerticalProgressBar progress={selectActive} maxVal={17}/>
            </Box>
            <Box sx={{ width: isMdBreakpoint ? '33.33%' : '100%',display:'flex',flexDirection:'column',height:"100%" }}>
                <Box sx={{overflowY:"scroll",display:"flex",alignItems:"center"}}>
                    <ReportPageRouter selectActive={selectActive}/>
                </Box>
                {isMdBreakpoint||cancel ?null:
                    <Box sx={{ width: '100%', height: "100%",flexGrow:1,backgroundColor:"#ffe600" }}>
                        <Box sx={{display:"flex",flexDirection:"row-reverse",my:2}} onClick={()=>setCancel(true)}>
                            <CancelIcon sx={{ml:1,mr:3}}/>
                            <Typography>close</Typography>
                        </Box>
                        <Box id="map" sx={{ width: '100%', height: '100%'}}>
                        </Box>
                    </Box>
                }
                <Box sx={{flexGrow:1,height:"min-content"}}>
                    <ProgressBar activeStep={selectActive} setActiveStep={setActiveStep} backLink={selectActive-1} nextLink="/report/page2" cancelState={[cancel,setCancel]} lock={lock} beforeNext={selectActive===17?beforeNext:null} submit={selectActive===17}/>
                </Box>
            </Box>
            <Box sx={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
            <Box id="map" sx={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></Box>
            </Box>
        </Box>
    );
}

export default ReportWrapper