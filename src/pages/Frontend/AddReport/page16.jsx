import React, { useEffect, useState} from 'react';
import { Container, Typography, Grid, Box, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage, setPage16 } from 'src/store/reducers/registerReport';
import { objectToFormData } from 'src/utils/formatObject';
import API from 'src/config/api';
import ProgressBar from 'src/layouts/Report/ProgressBar';

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
          {confirm?"Success":"Submit Report"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirm?"Report Submitted Successfully":"Are you sure you want to Report the crime?"}
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
  const value = useSelector(state=>state.reportRegister.data);
  const {police_reporting,reported_to_the_police,police_case_num}=value;
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const [open,setOpen] = useState(false);
  const [confirm,setConfirm] = useState(false);

  const setValue=(value)=>dispatch(setPage(value));

  const handleChange = (event) => {
    const {name,value:val} = event.target;
    setValue({...value,[name]:val});
  };

  const beforeBack = ()=>{
    dispatch(setPage16(value));
  }

  const beforeNext = ()=>{
    dispatch(setPage16(value));
    setOpen(true);
  }

  const onClickEvent = async()=>{
    try {
      const formData =objectToFormData(value);
      await API.post("/report",formData);
    } catch (error) {
      console.log(error);
    }
    setConfirm(true);
  }

  useEffect(()=>{
    if(police_case_num||reported_to_the_police===2){
      dispatch(setLock(false));
      setError("")
    }else if(reported_to_the_police===1){
      dispatch(setLock(true));
      setError("*required")
    }
  },[police_case_num,reported_to_the_police])
  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SubmitDialog open={open} handleClose={()=>setOpen(false)} confirm={confirm} onClickEvent={onClickEvent} />
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
                  <Box sx={{ display: 'flex',alignItems:'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px:1, textAlign: 'left' }}>
                      Did the police attend the scene of crime?
                    </Typography>
                    <Select name="police_reporting" value={value.police_reporting!==null?value.police_reporting:""} onChange={handleChange} sx={{ paddingX: 2,width:'95%',maxWidth:'310px',height:"50px" }}>
                      <MenuItem value={0}>Yes</MenuItem>
                      <MenuItem value={1}>No</MenuItem>
                      <MenuItem value={2}>Unknown</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ display: 'flex',alignItems:'center',mt:3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1,  textAlign: 'left' }}>
                      Was the crime formally reported to the police?
                    </Typography>
                    <Select value={value.reported_to_the_police!==null?value.reported_to_the_police:""} name="reported_to_the_police" onChange={handleChange} sx={{ paddingX: 2,width:'95%',maxWidth:'310px', height:"50px" }}>
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={2}>No</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ display: 'flex',mt:2,alignItems:"center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1,  textAlign: 'left' }}>
                      Please Specify the Case Number
                    </Typography>
                    <TextField name="police_case_num" variant="outlined" onChange={handleChange} value={value?.police_case_num||""} disabled={value.reported_to_the_police===2} error={error?true:false} helperText={error}/>
                  </Box>

                </Box>
              </Grid>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
};

export default Page16;
