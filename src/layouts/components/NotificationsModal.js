import React, { useEffect, useState } from 'react'
import API from 'src/config/api';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCrimeIndex,  setNearbyReports } from 'src/store/reducers/registerReport';

export default function NotificationsModal() {
    const modal = {
        border:"1px solid black",
        background:"white",
        position:"absolute",
        top:"30px",
        minHeight:"140px",
        maxHeight:"600px",
        width:"300px",
        left:"-132px",
        borderRadius:"16px",
        padding:"16px 0",
        overflowX:"auto"
    }
    const [data,setData] = useState([])
    const getData = async () => {
        const response = await API.get(`/notificationList`);
        if(response.data.code == 200){
            setData(response.data.data)
        }
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reports,error } = useSelector((state) => ({ ...state.report }));
    const handler = (e) => {   
        const id = e.currentTarget.getAttribute("id")     
        dispatch(setNearbyReports(reports.data));
        dispatch(setCrimeIndex({id,viewCrime:true}))
        navigate("/")
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div style={modal} >
        {data.length == 0 && <h5 style={{color:"black",fontWeight:"400",padding:"0 16px 6px"}} >
            No new notifications... <br/>
            1. Select  "Crime tracker" profile section. <br/>
            2. Add up to three locations.<br/>

            Receive a notification whenever a crime is reported within 500 meters (0.5 Km ) of your selected locations.<br/>
            You can change selected location at any time.
        </h5>}
        {data.length > 0 && data.map((item,index)=><h5 key={index} id={item.id} onClick={handler} style={{color:"black",fontWeight:"400",borderBottom:"1px solid #e6e6e6",padding:"0 16px 6px"}} >
            <p>
                New crime reported at {item.address} @ {item.created_at} <br></br> {item.distance} meters away from {item.location_name},
            </p>
        </h5>
    )}
    </div>
  )
}
