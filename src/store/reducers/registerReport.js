import { createSlice } from '@reduxjs/toolkit'
import { getNearbyCrimes, getNearbyCrimes2, googleMapSearchLocation } from '../api/registerReport';

const initialState = {
    activeStep:null,
    beforeNext:null,
    beforeBack:null,
    zoom:12,
    lock:false,
    loading:false,
    error:null,
    map:null,
    data:{
        crime:1,
        specific_crime:1,
        location:"Johannesberg,South Africa",
        longitude:28.034088,
        latitude:-26.195246,
        google_place_id:null,
        description:null,
        perpetrators:-1,
        perpetrators_des:null,
        weapons:0,
        fully_auto_weapons:0,
        semi_auto_weapons:0,
        knife_weapons:0,
        other_weapons:0,
        murders:"3",
        murders_people:null,
        rape:"0",
        rape_people:null,
        assault:"0",
        assault_people:null,
        vehicle_theft:"4",
        vehicle_make:null,
        vehicle_model:null,
        vehicle_colour:null,
        vehicle_year:null,
        burglary:0,
        burglary_type:"other",
        robbery:0,
        robbery_type:"other",
        kidnapping:"0",
        kidnapping_people:null,
        bribery:"0",
        various:[],
        police_reporting:2,
        reported_to_the_police:2,
        police_case_num:null,
        fileName:null,
        date_time:null,
        flag:null,
        
    },
    warnings:{
        futureTimeWarning:false,
        futureDateWarning:false
    },
    markers:null,
    nearbyData:[],
    marker:null,
    location:[],
    crimeIndex:{
        index:0,
        viewCrime:false,
    },
    duplicate:{
        index:0,
        open:0
    }
}

const registerReport = createSlice({
  name: "registerReport",
  initialState,
  reducers: {
    setDuplicate:(state,action)=>{
        state.duplicate={...state.duplicate,...action.payload}
    },
    setCrimeIndex:(state,action)=>{
        state.crimeIndex={...state.crimeIndex,...action.payload}
    },
    setMarkers:(state,action)=>{
        state.markers=[...state.markers,...action.payload]
    },
    clearReport:(state,_)=>{
        Object.keys(initialState).forEach((name)=>{
            state[name]=initialState[name];
        })
    },
    setNearbyReports:(state,action)=>{
        state.nearbyData=[...action.payload];
    },
    clearNearbyReports:(state,_)=>{
        state.nearbyData=[];
    },
    setWarnings: (state, action) => {
        state.warnings = action.payload;
      },
    setMap:(state,action)=>{
        state.map=action.payload
    },
    setMarker:(state,action)=>{
        state.marker=action.payload
    },
    // addMarkers:(state,action)=>{
    //     state.markers=action.payload
    // },
    // clearMarkers:(state,action)=>{
    //     const index=action?.payload
    //     if(index)state.markers.splice(index,1);
    //     else state.markers=[];
    // },
    setLock:(state,action)=>{
        state.lock=action.payload;
    },
    setProgressBar:(state,action)=>{
        const {activeStep,beforeNext,beforeBack=null} = action.payload;
        state={...state,activeStep,beforeNext,beforeBack};
    },
    setZoom:(state,action)=>{
        state.zoom=action.payload;
    },
    setPage:(state,action)=>{
        state.data={...state.data,...action.payload};
    },
},
    extraReducers:{
        // Permission Add Api
        [getNearbyCrimes.pending]: (state, action) => {
            state.loading = true;
          },
        [getNearbyCrimes.fulfilled]: (state, action) => {
        state.loading = false;
        state.nearbyData = action.payload||[];
        },
        [getNearbyCrimes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [getNearbyCrimes2.pending]: (state, action) => {
            state.loading = true;
          },
        [getNearbyCrimes2.fulfilled]: (state, action) => {
        state.loading = false;
        state.nearbyData = action.payload||[];
        },
        [getNearbyCrimes2.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [googleMapSearchLocation.pending]: (state, action) => {
            state.loading = true;
          },
        [googleMapSearchLocation.fulfilled]: (state, action) => {
        state.loading = false;
        state.location = action.payload||[];
        },
        [googleMapSearchLocation.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    }

});

export const {setLock,setZoom,setPage,setProgressBar,clearMarkers,addMarkers,setMap,setMarker,setWarnings,clearReport,clearNearbyReports,setCrimeIndex,setNearbyReports,setDuplicate} =registerReport.actions;

export const registerReportReducer = registerReport.reducer;