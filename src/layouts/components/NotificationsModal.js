import React, { useEffect, useState } from 'react'
import API from 'src/config/api';

export default function NotificationsModal() {
    const modal = {
        border:"1px solid black",
        background:"white",
        position:"absolute",
        top:"30px",
        height:"200px",
        width:"200px",
        left:"-92px",
        borderRadius:"16px",
        padding:"16px 0",
    }
    const [data,setData] = useState([])
    const getData = async () => {
        const response = await API.get(`/notificationList`);
        if(response.data.code == 200){
            setData(response.data.data)
        }
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div style={modal} >
        {data.length == 0 && <h5 style={{color:"black",fontWeight:"400",padding:"0 16px 6px"}} >
            1. Select  "Crime tracker" profile section 
            2. Add up to three locations

            Receive a notification whenever a crime is reported within 500 meters (0.5 Km ) of your selected locations
            You can change selected location at any time
        </h5>}
        {data.length > 0 && data.map((item,index)=><h5 key={index} style={{color:"black",fontWeight:"400",borderBottom:"1px solid #e6e6e6",padding:"0 16px 6px"}} >
            <p>
                New crime reported at {item.address} @ {item.created_at} <br></br> {item.distance} meters away from {item.location_name},
            </p>
        </h5>
    )}
    </div>
  )
}
