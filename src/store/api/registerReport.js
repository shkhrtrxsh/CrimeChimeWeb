import { createAsyncThunk } from '@reduxjs/toolkit'
import { format } from 'date-fns';
import API from 'src/config/api'
import { objectToFormData } from 'src/utils/formatObject';
import { clearNearbyReports } from '../reducers/registerReport';

export const getNearbyCrimes = createAsyncThunk("registerReport/getNearbyCrimes",async({latitude,longitude,toDate=null,fromDate=null,nameOfDeceased,
  verifiedGroup,murder,
  rape,
  assault,
  burglary,
  robbery,
  kidnapping,
  bribery,
  shoplifting,},{rejectWithValue,dispatch},)=>{
  try {
      const formData = objectToFormData({latitude,longitude,nameOfDeceased,
        verifiedGroup,murder,
        rape,
        assault,
        burglary,
        robbery,
        kidnapping,
        bribery,
        shoplifting,to_date:toDate&&format(toDate,"yyyy-MM-dd"),from_date:fromDate&&
      format(fromDate,"yyyy-MM-dd")})
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      var res = await API({"url":"/report/area",method:"POST",data:formData});
    } catch (error) {
        console.error(error);
        throw Error(error.message);
    }
    try {
      const data = res.data.data;
      if(data!==null){
        return data;
      }else{
        dispatch(clearNearbyReports());
        throw Error(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }

})

export const getNearbyCrimes2 = createAsyncThunk("registerReport/getNearbyCrimes",async({latitude,longitude,doFunc})=>{
  try {
      const formData = objectToFormData({latitude,longitude})
      const res = await API({"url":"/report/getNearByReport",method:"POST",data:formData});
      const data=res.data.data;
      if(!data||data.length===0)doFunc();
      return data;
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