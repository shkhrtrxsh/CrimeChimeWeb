import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Checkbox, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage16 } from 'src/store/reducers/registerReport';
import axios from 'axios';
import { objectToFormData } from 'src/utils/formatObject';
import API from 'src/config/api';
import { loadGoogleMaps } from 'src/utils/googleMap';

const SubmitDialog = ({open,handleClose,confirm,onClickEvent})=>{
  return(
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirm?"Report Submitted Successfully":"Submit the Report?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{confirm?"OK":"Cancel"}</Button>
          {!confirm&&<Button onClick={onClickEvent} autoFocus>
            OK
          </Button>}
        </DialogActions>
      </Dialog>
  )
}

const Page16 = () => {
  const data = useSelector(state=>state.reportRegister.data);
  const {police_reporting,reported_to_the_police,police_case_num}=data;
  const dispatch = useDispatch();
  const [value, setValue] = useState({police_reporting,reported_to_the_police,police_case_num});
  const [open,setOpen] = useState(false);
  const [confirm,setConfirm] = useState(false);
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 16;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const handleChange = (event) => {
    const {name,value:val} = event.target;
    setValue({...value,[name]:val});
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const beforeBack = ()=>{
    dispatch(setPage16(value));
  }

  const beforeNext = ()=>{
    dispatch(setPage16(value));
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SubmitDialog open={open} handleClose={()=>setOpen(false)} confirm={confirm} onClickEvent={onClickEvent}/>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, width: {xs:'100%',md:'33.33%' }}}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ pt: 5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Police Reporting
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <LocalPoliceIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                      Did the police attend the scene of crime?
                    </Typography>
                    <Select name="police_reporting" value={value.police_reporting!==null?value.police_reporting:""} onChange={handleChange} sx={{ paddingX: 2,marginBottom:4,width:'95%',maxWidth:'310px' }}>
                      <MenuItem value={0}>Yes</MenuItem>
                      <MenuItem value={1}>No</MenuItem>
                      <MenuItem value={2}>Unknown</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1, pt: 5, textAlign: 'center' }}>
                      Was the crime formally reported to the police?
                    </Typography>
                    <Select value={value.reported_to_the_police!==null?value.reported_to_the_police:""} name="reported_to_the_police" onChange={handleChange} sx={{ paddingX: 2,marginBottom:4,width:'95%',maxWidth:'310px' }}>
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={2}>No</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1, pt: 5, textAlign: 'center' }}>
                      Was the crime formally reported to the police?
                    </Typography>
                    <TextField name="police_case_num" variant="outlined" onChange={handleChange} value={value?.police_case_num||""}/>
                  </Box>

                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '48px' }}>
              <NextButton nextLink="/page15" textValue="Back" beforeNext={beforeBack}/>

              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />

              <Typography variant="h6">#16/16</Typography>

              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />

              <NextButton nextLink="/page16" textValue="Submit" beforeNext={beforeNext}/>
            </Box>
            <ProgressBar activeStep={16}/>
          </Box>
        </Box>
        <Box
          sx={{
            width: '66.67%',
            height: '91vh',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            id="map"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Page16;
