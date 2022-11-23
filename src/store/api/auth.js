import { createAsyncThunk } from '@reduxjs/toolkit';
import  API from "../../config/api";
import { toast } from "react-toastify";


export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate }, { rejectWithValue }) => {
      try {
        const response = await API.post("/auth/login", formValue);
        if(response.data.status === 200){
          toast.success("Login Successfully");
          navigate("/dashboard");
          return response.data;
        }
        toast.error("Email Address and Password is invalid");

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
        toast.success("Register Successfully");
        navigate("/dashboard");
        return response.data;
      }
      toast.error("Email Address and Password is invalid");

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
        navigate("/dashboard");
        return response.data;
      }
      toast.error("Email Address and Password is invalid");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);