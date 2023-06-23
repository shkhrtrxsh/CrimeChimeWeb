import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeStep:null,
    beforeNext:null,
    beforeBack:null,
    zoom:12,
    data:{
        location:null,
        longitude:null,
        latitude:null,
        crime:null,
        google_place_id:null,
        specific_crime:null,
        description:null,
        perpetrators:null,
        perpetrators_des:null,
        weapons:null,
        fully_auto_weapons:null,
        semi_auto_weapons:null,
        knife_weapons:null,
        other_weapons:null,
        murders:null,
        murders_people:null,
        rape:null,
        rape_people:null,
        assault:null,
        assault_people:null,
        vehicle_theft:null,
        vehicle_make:null,
        vehicle_model:null,
        vehicle_colour:null,
        vehicle_year:null,
        burglary:null,
        burglary_type:null,
        robbery:null,
        robbery_type:null,
        kidnapping:null,
        kidnapping_people:null,
        bribery:null,
        various:null,
        police_reporting:null,
        reported_to_the_police:null,
        police_case_num:null,
        fileName:null,
        datetime:null,
        flag:null
    }
}

const registerReport = createSlice({
  name: "registerReport",
  initialState,
  reducers: {
    setProgressBar:(state,action)=>{
        const {activeStep,beforeNext,beforeBack=null} = action.payload;
        state={...state,activeStep,beforeNext,beforeBack};
    },
    setZoom:(state,action)=>{
        state.zoom=action.payload;
    },
    setPage:(state,action)=>{
        console.log(action.payload)
        state.data={...state.data,...action.payload};
    },
    setPage2:(state,action)=>{
        const {location,longitude,latitude} = action.payload;
        state.data={...state.data,location,longitude,latitude};
    },
    setPage3:(state,action)=>{
        const {perpetrators,perpetrators_des} = action.payload;
        state.data = {...state.data,perpetrators,perpetrators_des};
    },
    setPage4:(state,action)=>{
        state.data = {...state.data,...action.payload};
    },
    setPage5:(state,action)=>{
        const {murders,murders_people=0} = action.payload
        state.data={...state.data,murders,murders_people};
    },
    setPage6:(state,action)=>{
        const {rape,rape_people=0} = action.payload
        state.data={...state.data,rape,rape_people};
    },
    setPage7:(state,action)=>{
        const {assault,assault_people=0} = action.payload
        state.data={...state.data,assault,assault_people};
    },
    setPage8:(state,action)=>{
        const {vehicle_theft} = action.payload
        state.data={...state.data,vehicle_theft};
    },
    setPage9:(state,action)=>{
        const {vehicle_make=null,vehicle_model=null,vehicle_colour=null,vehicle_year=null} = action.payload;
        state.data={...state.data,vehicle_make,vehicle_model,vehicle_colour,vehicle_year,};
    },
    setPage10:(state,action)=>{
        const {burglary=null,burglary_type=null} = action.payload;
        console.log(action.payload)
        state.data={...state.data,burglary,burglary_type};
    },
    setPage11:(state,action)=>{
        const {robbery=null,robbery_type=null} = action.payload;
        console.log(action.payload)
        state.data={...state.data,robbery,robbery_type};
    },
    setPage12:(state,action)=>{
        const {kidnapping,kidnapping_people} = action.payload;
        state.data={...state.data,kidnapping,kidnapping_people};
    },
    setPage13:(state,action)=>{
        const {bribery} = action.payload;
        state.data={...state.data,bribery};
    },
    setPage14:(state,action)=>{
        const {various} = action.payload;
        state.data={...state.data,various};
    },
    setPage15:(state,action)=>{
        console.log(action.payload)
        const {files,fileName,description} = action.payload;
        state.data={...state.data,files,description,fileName};
    },
    setPage16:(state,action)=>{
        const {police_reporting,reported_to_the_police,police_case_num} = action.payload;
        state.data={...state.data,police_reporting,reported_to_the_police,police_case_num};
    },
}
});

export const {setZoom,setPage,setPage2,setPage3,setPage4,setPage5,setPage6,setPage7,setPage8,setPage9,setPage10,setPage11,setPage12,setPage13,setPage14,setPage15,setPage16,setProgressBar} =registerReport.actions;

export const registerReportReducer = registerReport.reducer;