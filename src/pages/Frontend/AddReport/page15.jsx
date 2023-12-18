import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography,useTheme, Grid, TextField, Box, Divider, LinearProgress, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, setPage, } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { isImage, isVideo } from 'src/utils/ext';

const Page15 = () => {
  const value = useSelector(state=>state.reportRegister.data);
  const {fileName,files} = value;
  const dispatch = useDispatch();
  const setValue = (value)=>dispatch(setPage(value));
  const ref = useRef();
  const source = useRef();
  const canvas = useRef();
  const theme = useTheme();
  
  useEffect(()=>{
    if(fileName){
      if (isVideo(fileName)) {
        source.current.src=files;
        source.current.style.display="block";
        canvas.current.style.display="none";
      } else if (isImage(fileName)) {
        canvas.current.style.display="block";
        canvas.current.src=files;
        source.current.style.display="none";
      }
    }
  },[files])

  const handleFileChange = (event) => {
    const files = event.target.files[0];
    const fileURL = URL.createObjectURL(files)
    
    const fileName = files.name;
    if (files) {
      setValue(files);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }} mt={5}>
              <Grid item xs={10} sx={{ pt: 0 }}>
              <Box display="flex" alignItems="center" justifyContent="center">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Media/Description
                </Typography>
               
                <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
                </Box>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  Describe or upload the media here
                </Typography>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5, width:"400px"}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' ,alignItems:"center", width:"400px"}}>
                {value?.fileName&&<Typography>{value?.fileName}</Typography>}
                  <Box sx={{ p: 5,pt:2, display: 'flex', justifyContent: 'center' }}>
                    <input
                      accept="image/*, video/*"
                      id="file-input"
                      type="file"
                      ref={ref}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file-input">
                      <Button component="span" variant="contained" sx={{backgroundColor: '#FFEE58'}}>
                        Upload image or video
                        <input type="file" hidden />
                      </Button>
                    </label>
                  </Box>
                  <video id="video" controls ref={source} width="300px" height="150px" style={{ display: 'none' }}>
                    <source src="" type="video/mp4"/>
                  </video>
                  <img src="" alt="crime" style={{ display: 'none',width:"300px",height:"150px",maxWidth:"300px",maxHeight:"300px" }} ref={canvas}/>
                  <Box sx={{ p: 5, display: 'flex', justifyContent: 'center' ,width:"500px"}}>
                    <TextField label="Describe the crime..." multiline rows={8} variant="outlined" sx={{ borderRadius: 'none'  ,width:"600px"}} value={value?.description||""} onChange={(e)=>setValue({...value,description:e.target.value})}/>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
};

export default Page15;
