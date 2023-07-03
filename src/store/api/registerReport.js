import { createAsyncThunk } from '@reduxjs/toolkit'
import API from 'src/config/api'
import { objectToFormData } from 'src/utils/formatObject';

export const getNearbyCrimes = createAsyncThunk("registerReport/getNearbyCrimes",async({lat,long,toDate,fromDate})=>{
    const formData = objectToFormData({lat,long,toDate,fromDate})
    try {
        const res = await API({"url":"/report/area",method:"GET",data:formData});
        return res.data.data.data;
    } catch (error) {
        console.error(error);
        throw Error(error.message);
    }
})

export const googleMapSearchLocation = createAsyncThunk(
    "reportRegister/location",
    async ({}) => {
      try {
        const response = await API.get("https://maps.googleapis.com/maps/api/place/y/json?input=Paris&types=geocode&key=AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw", { headers : {"Access-Control-Allow-Origin" : "*"}});
        response.headers({"Access-Control-Allow-Origin" : "*"});
        if(response.data.status === 200){
          return response.data.data;
        }
      } catch (err) {
        console.error(err);
        throw Error(err.message);
      }
    }
  );