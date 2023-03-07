import { createAsyncThunk } from '@reduxjs/toolkit';
import  API from "../../config/api";
import { toast } from "react-toastify";


export const addReport = createAsyncThunk(
    "report/add",
    async ({ formValue, navigate }, { rejectWithValue }) => {
      try {
        const response = await API.post("/report", formValue, {headers: {
            'content-type': 'multipart/form-data',
          }});
        if(response.data.status === 200){
          toast.success(response.data.message);
          navigate("/report?target=single&id="+response.data.data.id);
          return response.data;
        }
        toast.error("Something wrong in report");

      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);


export const editReport = createAsyncThunk(
  "report/edit",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put("/report", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        navigate("/report/" + formValue.report_module_id);
        return response.data;
      }
      toast.error("Something wrong in report");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getReports = createAsyncThunk(
  "report",
  async ({param, id}, { rejectWithValue }) => {
    try {
      const response = await API.get(`/report?${param}`);
      if(response.data.status === 200){
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showReport = createAsyncThunk(
  "report/show",
  async ({ id, by }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/report/show/${id}?by=${by}`);
      if(response.data.status === 200){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "report/delete",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete("/report/"+id);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something wrong in report");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const reportStatus = createAsyncThunk(
  "report/status",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await API.post("/report/status", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something wrong in report");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const getCrimes = createAsyncThunk(
    "crime",
    async ({}, { rejectWithValue }) => {
      try {
        const response = await API.get(`/crime`);
        if(response.data.status === 200){
          return response.data.data;
        }
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const getSpecificCrimesById = createAsyncThunk(
    "specific-crime-by-id",
    async ({id}, { rejectWithValue }) => {
        console.log(id)
      try {
        const response = await API.get(`/crime/${id}`);
        if(response.data.status === 200){
          return response.data.data;
        }
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const uploadReportImage = createAsyncThunk(
    "upload report image",
    async ({file}, { rejectWithValue }) => {
        console.log(file)
      try {
        const response = await API.post(`/report/image-upload`, {file:file}, {headers: {
            'content-type': 'multipart/form-data',
          }});
        if(response.data.status === 200){
          return response.data.data;
        }
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const getReportByArea = createAsyncThunk(
  "report",
  async ({query}, { rejectWithValue }) => {
    try {
      const response = await API.get(`/report/area?${query}`);
      if(response.data.status === 200){
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyReport = createAsyncThunk(
  "report/my",
  async ({query}, { rejectWithValue }) => {
    try {
      const response = await API.get(`/report/my`);
      if(response.data.status === 200){
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);