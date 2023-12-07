import { createAsyncThunk } from '@reduxjs/toolkit';
import  API from "../../config/api";
import { toast } from "react-toastify";


export const addCorporate = createAsyncThunk(
    "addCorAdmin",
    async ({ formValue, navigate }, { rejectWithValue }) => {
      try {
        const response = await API.post("/addCorAdmin", formValue);
        console.log(response);
        if(response.data.code === 200){
          toast.success(response.data.data.message);
          navigate("/corporate");
          return response.data;
        }else{
          toast.error(response.data.message,{
            toastId:'sjsjj'
          })
        }
        // toast.error("Something went wrong");

      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const listIndustryType = createAsyncThunk(
  'industryType/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/listIndustryType'); // Replace with your actual API endpoint
      if (response.data.success === true) {
        // Process the response data into the desired format
        const processedData = response.data.data.map((item) => [item.id, item.name]);
        return processedData;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const editUser = createAsyncThunk(
  "user/edit",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put("/user", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        navigate("/user");
        return response.data;
      }
      toast.error("Something went wrong");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/update", formValue, {headers: {
        'content-type': 'multipart/form-data',
      }});
      if(response.data.status === 200){
        toast.success(response.data.message);
        navigate("/profile");
        return response.data;
      }
      toast.error("Something went wrong");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user",
  async ({param}, { rejectWithValue }) => {
    try {
      const response = await API.get("/user?"+param);
      if(response.data.status === 200){        
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showCorporate = createAsyncThunk(
  "corlists/showCorporate",
  async ({ rejectWithValue }) => {
    try {
      const response = await API.get(`corporateList`);
      if(response.data.success === true){
        console.log(response);
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete("/user/"+id);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something went wrong");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userStatus = createAsyncThunk(
  "user/status",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/status", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something went wrong");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showCorporateSIngle = createAsyncThunk(
  "user/show/auth",
  async ({}, { rejectWithValue}) => {
    try {
      const response = await API.get(`/user/auth`);
      if(response.data.status === 200){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateUserAddress = createAsyncThunk(
  "user/update-address",
  async ({ value, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put("/user/update-address", value);
      if(response.data.status === 200){
        toast.success(response.data.message);
        // navigate("/profile");
        return response.data;
      }
      toast.error("Something went wrong");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const dashboard = createAsyncThunk(
  "dashboard",
  async ({}, { rejectWithValue}) => {
    try {
      const response = await API.get(`/dashboard`);
      if(response.data.status === 200){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const corporateCount = createAsyncThunk(
  "corporateCount",
  async ({}, { rejectWithValue}) => {
    try {
      const response = await API.get(`/corporateCount`);
      if(response.data.status === 200){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateCorporate = createAsyncThunk(
  "updateCorAdmin",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/updateCorAdmin", formValue);
      if(response.status === 200){
        toast.success(response.data.message);
        navigate("/corporate");
        return response.data;
      }else{
        toast.error(response.data.message,{
          toastId:'wjhdgaja'
        })
        
      }
      // toast.error("Something went wrong");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);