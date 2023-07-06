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
        toast.success("Login Successfully");
        navigate("/");
        return response.data;
      }
      toast.error("Your account does not exist. Please register to report a crime.");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", formValue);
      if(response.data.status === 200){
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
        toast.success(response.data.message);
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