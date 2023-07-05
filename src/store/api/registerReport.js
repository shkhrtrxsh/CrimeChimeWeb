import { createAsyncThunk } from '@reduxjs/toolkit'
import { format } from 'date-fns';
import API from 'src/config/api'
import { objectToFormData } from 'src/utils/formatObject';

export const getNearbyCrimes = createAsyncThunk("registerReport/getNearbyCrimes",async({latitude,longitude,toDate=null,fromDate=null})=>{
  try {
      const formData = objectToFormData({latitude,longitude,to_date:toDate&&format(toDate,"yyyy-MM-dd"),from_date:fromDate&&
      format(fromDate,"yyyy-MM-dd")})
      const res = await API({"url":"/report/area",method:"POST",data:formData});
      return res.data.data.data;
    } catch (error) {
        console.error(error);
        throw Error(error.message);
    }
})

export const getNearbyCrimes2 = createAsyncThunk("registerReport/getNearbyCrimes",async({latitude,longitude})=>{
  try {
      const formData = objectToFormData({lat:latitude,long:longitude})
      const res = await API({"url":"/report/getNearByReport",method:"POST",data:formData});
      return res.data.data;
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