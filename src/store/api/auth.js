import { createAsyncThunk } from '@reduxjs/toolkit';
import  API from "../../config/api";
import { toast } from "react-toastify";


export const login = createAsyncThunk(
    "auth/login",    
    async ({ formValue, navigate }, { rejectWithValue }) => {

      try {
        const response = await API.post("/auth/login", formValue);
        if(response.data.status === 200){
          toast.success("OTP Sent");
          navigate("/auth/verify");
          return response.data;
        }
        toast.error("Your account does not exist. Please register to report a crime.");

      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const otpVerify = createAsyncThunk(
  "auth/otp-verify",
  
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/otp-verify", formValue);
      if(response.data.status === 200){
        toast.success("Login Successful");
        navigate("/");
        return response.data;
      }
      toast.error("Your account does not exist. Please register to report a crime.");

    } catch (err) {
      console.log(err)
      throw Error(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate,dispatchError }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", formValue);
      console.log(response.data.success,response.status)
      if(response.status === 200){
        if(response.data.success===false){
          toast.error("Something went wrong");
          const data=response.data.data;
          const errors={};
          console.log(data)
          data&&["name","email","phone"].forEach((key)=>{
            errors[key]=data[key]?(data[key][0]?data[key][0]:''):'';
          })
          console.log(errors)
          dispatchError({type:"SETTER",payload:errors});
          throw Error("Response failed due to validation error!")
        }
        toast.success("OTP Sent");
        navigate("/auth/verify");
        return response.data;
      }
      toast.error("Something went wrong");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/logout");
      if(response.data.status === 200){
        toast.success("User Logout Successfully");
        localStorage.clear();
        navigate("/");
        return response.data;
      }
      toast.error("Your account did not logout successfully");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);