import { WeaponChoices } from "src/constants/weapons";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AK from '../assets/images/ak.png'
import Knife from '../assets/images/knife2.png'
import Others from '../assets/images/others.png'
import Pistol from '../assets/images/pistol.png'
import API from "src/config/api";
import { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';
import { useLocation } from "react-router-dom";

const { capitalize } = require("./string");
const various_choices = ["I believe this crime to be drug-related","Crime occurred at ATM","Does not apply","I believe this crime to be gang-related" ,"Arson was involved","Vandalism was involved" ,"Social an unrest","Bombs were involved"]

export const CrimeDetails=(values,index,vehicle_theft_choices,various_choices,mediaData,reportType)=>{
    const [data,setData] = useState('')
    const [date_time,set_date_time] = useState('')
    const [user,setUser] = useState('')
    const [location,setLocation] = useState('')
    const [latitude,setlatitude] = useState('')
    const [longitude,setLongitude] = useState('')
    const [perpetrators, setperpetrators] = useState('')
    const [roleID, setroleID] = useState('')
    const [perpetrators_des, setperpetrators_des] = useState('')
    const [shoplifting, setshoplifting] =  useState('')
    const [bribery,setbribery ] = useState('')
    const [weapons,setweapons ] =  useState('')
    const [fully_auto_weapons,setfully_auto_weapons ] =  useState('')
    const [semi_auto_weapons,setsemi_auto_weapons ] =  useState('')
    const [knife_weapons,setknife_weapons ] =  useState('')
    const [other_weapons,setother_weapons ] =  useState('')
    const [rape, setrape] =  useState('')
    const [rape_people,setrape_people ] =  useState('')
    const [murders,setmurders ] =  useState('')
    const [murders_people,setmurders_people ] =  useState('')
    const [farm_murder,setfarm_murder ] =  useState('')
    const [victim_name,setvictim_name ] =  useState('')
    const [assault,setassault ] =  useState('')
    const [assault_people,setassault_people ] =  useState('')
    const [vehicle_theft,setvehicle_theft ] =  useState('')
    const [vehicle_colour,setvehicle_colour ] =  useState('')
    const [vehicle_make,setvehicle_make ] =  useState('')
    const [vehicle_model,setvehicle_model ] =  useState('')
    const [vehicle_year,setvehicle_year ] =  useState('')
    const [burglary, setburglary] =  useState('')
    const [burglary_type,setburglary_type ] =  useState('')
    const [robbery,setrobbery ] =  useState('')
    const [robbery_type,setrobbery_type ] =  useState('')
    const [kidnapping,setkidnapping ] =  useState('')
    const [kidnapping_people,setkidnapping_people ] =  useState('')
    const [various,setvarious] = useState('')
    const [police_reporting,setpolice_reporting ] =  useState('')
    const [reported_to_the_police,setreported_to_the_police ] = useState('')
    const [police_case_num,setpolice_case_num ] =  useState('')
    const [description,setdescription ] =  useState('')
    const utcDate = new Date(date_time);
    const localDateString = utcDate.toLocaleString();
    const temp = values[index];
    const cleanedString = various.replace(/[\[\]"]/g, '');
    const cleanedArray = cleanedString.split(',').map(Number);
    // Check if variousnew is an array before using map
    // if (Array.isArray(cleanedArray)) {
      const mappedChoices = cleanedArray.map(index => various_choices[index]);
      const resultString = mappedChoices.join('<br />');
    // } else {
    //   console.error('variousnew is not an array:', cleanedArray);
    // }
    const [edited,setEdited] = useState(false)
    const myFunction = (data) => {
      set_date_time(data.date_time)
      setUser(data.user)
      setLocation(data.location)
      setlatitude(data.latitude)
      setLongitude(data.longitude)
      setperpetrators(data.perpetrators)
      setroleID(data.role_id)
      setperpetrators_des(data.perpetrators_des)
      setshoplifting(data.shoplifting)
      setbribery(data.bribery)
      setweapons(data.weapons)
      setfully_auto_weapons(data.fully_auto_weapons)
      setsemi_auto_weapons(data.semi_auto_weapons)
      setknife_weapons(data.knife_weapons)
      setother_weapons(data.other_weapons)
      setrape(data.rape)
      setrape_people(data.rape_people)
      setmurders(data.murders)
      setmurders_people(data.murders_people)
      setfarm_murder(data.farm_murder)
      setvictim_name(data.victim_name)
      setassault(data.assault)
      setassault_people(data.assault_people)
      setvehicle_theft(data.vehicle_theft)
      setvehicle_colour(data.vehicle_colour)
      setvehicle_make(data.vehicle_make)
      setvehicle_model(data.vehicle_model)
      setvehicle_year(data.vehicle_year)
      setburglary(data.burglary)
      setburglary_type(data.burglary_type)
      setrobbery(data.robbery)
      setrobbery_type(data.robbery_type)
      setkidnapping(data.kidnapping)
      setkidnapping_people(data.kidnapping_people)
      setvarious(data.various)
      setpolice_reporting(data.police_reporting)
      setreported_to_the_police(data.reported_to_the_police)
      setpolice_case_num(data.police_case_num)
      setdescription(data.description)

    }
    const [wholeData,setWholeData] = useState(null)
    const location2 = useLocation();
    const queryParams = new URLSearchParams(location2.search);
    const getReport = async () => {
      const response = await API.get(`/reportDetails/${queryParams.get('id')}`);
      if(response.data.data.edit_report.length > 0){
        if(reportType){
          setData(response.data.data)
          myFunction(response.data.data);
          setEdited(false)
          if(response.data.data.edit_report != null){
            setWholeData(response.data.data.edit_report)
          }
        }else{
          setWholeData(response.data.data.edit_report)
          setData(response.data.data.edit_report[0])
          myFunction(response.data.data.edit_report[0])
          setEdited(true)
        }
      }else{
        setEdited(false)
        setData(response.data.data)
        myFunction(response.data.data);
      }
    }
    const handlerChangeUser = (e) => {
      const temp = e.currentTarget.getAttribute("value")
      setData(temp)
      myFunction(temp)
    }
    useEffect(()=>{
      getReport();
    },[reportType])

    if(!data){
      return [
        { firstCol: `Edited by`, secondCol: (()=>{ return (<>
          {edited && wholeData && wholeData.length >= 1 && <FormControl sx={{ width: '100%' }}>
            <InputLabel id="industry-type-label" style={{color:"white !important"}}>Users</InputLabel>
            <Select
              labelId="Users"
              id="edited-users"
              value={wholeData != null ? wholeData[0]:"Select"}
              label="Users"
              onChange={handlerChangeUser}
            >
              {wholeData?.map((item,index) => (
                <MenuItem key={index} value={wholeData[index]}>
                  {item.user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          {/* {!edited && wholeData && wholeData.length == 1 && <p style={{border:"1px solid white",padding:"12px"}}>{wholeData[0].user.username}</p>} */}
          {/* {!edited && wholeData && wholeData.length == 1 && <p>This reported is edited , you can check new.</p>} */}
          </>); 
        })() },
          { firstCol: 'Time of occurrence:', secondCol:  
            (
              <div>
                <p style={{ position: "absolute" }}>{localDateString}</p>
                {user && user.corporate !== null && user.corporate !== undefined ? (
                  <>
                    <img
                      src={user.corporate.logo}
                      style={{ height: "30px", width: "30px", border: "2px solid #333", borderRadius: "50%", float:"right"}}
                      alt="No Data Available"
                    />
                    {user.corporate.is_verify == 1 ? <CheckBoxIcon style={{ height: "30px", width: "30px", color: "#29C250", float:"right" }} /> : ''}
                  </>
                ) : ''
                }
              </div>
            ),
          },
          
          { firstCol: 'Address:', secondCol: (()=>{ 
            const formattedLatitude = parseFloat(latitude).toFixed(5);
            const formattedLongitude = parseFloat(longitude).toFixed(5);  
            return (
              <div>
                <p>{location}</p><br></br>
                <p>{formattedLatitude}</p>
                <p>{formattedLongitude}</p>
              </div>
            ); 
          })() },
          { firstCol: 'Description:', secondCol: <p>{description||"No description available"}</p> },
          // { firstCol: 'Description of Perpetrators:', secondCol: [null,-1].includes(perpetrators)?perpetrators:"" },
          { firstCol: 'Perpetrators:', secondCol: perpetrators?[`${parseInt(perpetrators) >= 0 ? (perpetrators) : "Preperator(s) detail not available"}`,roleID==1 ? ",".perpetrators_des :'']:"Preperator(s) detail not available" },
          { firstCol: 'Weapons:', secondCol: (()=>{
            switch(weapons){
              case 0:return ``
              case 2:return ``
              case 1:return (
                <div>
                  {WeaponChoices[fully_auto_weapons] != undefined && <div style={{display:"flex"}}>
                    Fully Automatic: {WeaponChoices[fully_auto_weapons]} <img src={AK} style={{height:"35px",width:"35px"}} /> <br />
                  </div>}
                  {WeaponChoices[semi_auto_weapons] != undefined && <div style={{display:"flex"}}>
                  Semi Automatic: {WeaponChoices[semi_auto_weapons]} <img src={Pistol} style={{height:"25px",width:"25px"}} /><br />
                  </div>}
                  {WeaponChoices[knife_weapons] != undefined && <div style={{display:"flex"}}>
                  Knife: {WeaponChoices[knife_weapons]} <img src={Knife} style={{height:"20px",width:"25px"}} /> <br />
                  </div>}
                  {WeaponChoices[other_weapons] != undefined && <div style={{display:"flex"}}>
                  Unusual weapon: {WeaponChoices[other_weapons]} <img src={Others} style={{height:"20px",width:"25px"}} /><br />
                  </div>}

                </div>
              );
              // default:return `Fully Automatic: ${WeaponChoices[fully_auto_weapons]}, Semi Automatic: ${WeaponChoices[semi_auto_weapons]}, Knife: ${WeaponChoices[knife_weapons]}, Other: ${WeaponChoices[other_weapons]}`;
            }
          })() },
          { firstCol: 'Rape:', secondCol:(()=>{
            if(rape==0){
              return null
            }
            if(rape==1){
              return `Attempted Rape (${rape_people})`
            }
            if(rape==2){
              return `Rape (${rape_people})`
            }
          })() },
          { firstCol: 'Murder:', secondCol:(()=>{
            if(murders==1) {
              return (
                <div>
                  {`Murder (${murders_people})`}
                  <br />
                  {farm_murder === 1 && `It was a farm murder`}<br />
                  {victim_name != "unknown" && victim_name != 'null' && victim_name != null (
                    <span>{'Name(s) of victim(s)'}{victim_name.replace(/"/g, '')}</span>
                  )}
                </div>
              );
            }
          } )() },
          // { firstCol: 'Farm Murder:', secondCol:(()=>{
          //   if(farm_murder==1) {
          //     return `It was a farm murder`
          //   }
          // })() },
          // { firstCol: 'Name(s) of victim(s)', secondCol:(()=>{
          //   if(victim_name != "unknown" && victim_name != 'null' && victim_name != null ) {
          //     const originalString = victim_name;
          //     const stringWithoutQuotes = originalString.replace(/"/g, '');
          //     return stringWithoutQuotes
          //   }
          // })() },
          { firstCol: 'Assault:', secondCol:(()=>{
            if(assault==1){
              return `Murder (${assault_people} involved)`
            }else{
              return null;
            }
          })() },
          { firstCol: 'Vehicle related:', secondCol:(()=>{
            if(vehicle_theft==4){
              return null;//capitalize(vehicle_theft_choices[vehicle_theft])
            }else{
              return( <div>
                {capitalize(`${vehicle_theft_choices[vehicle_theft]}`)},<br></br>
                {(vehicle_year||vehicle_colour||vehicle_make||vehicle_model)?capitalize(`${[vehicle_year,vehicle_colour,vehicle_make,vehicle_model].filter((el)=>el).join(" ")} Vehicle`):"Vehicle Description Unavailable"}
              </div>);
            }
          })() },
          { firstCol: 'Vehicle Type:', secondCol:(()=>{
            if(vehicle_theft==4){
              return null;//capitalize(vehicle_theft_choices[vehicle_theft])
            }else{
              return (vehicle_year||vehicle_colour||vehicle_make||vehicle_model)?capitalize(`${[vehicle_year,vehicle_colour,vehicle_make,vehicle_model].filter((el)=>el).join(" ")} Vehicle`):"Vehicle Description Unavailable"
            }
          })() },
          { firstCol: 'Burglary/Shoplifting:', secondCol:(()=>{
            if(burglary==0){
              return null;
            }
            if(burglary==1){
              return `Attempted Burglary (${burglary_type}) `;
            }
            if(burglary==2){
              return `Burglary (${burglary_type})`;
            }
            if(burglary==3){
              return `Attempted Shoplifting`
            }
            if(burglary==4){
              return `Shoplifting`;
            }
          })() },
          { firstCol: 'Robbery:', secondCol:(()=>{
            if(robbery==0){
              return null;
            }
            if(robbery==1){
              return `Attempted Burglary of ${robbery_type} `
            }
            if(robbery==2){
              return `Robbery (${robbery_type})`;
            }
          })() },
          { firstCol: 'Kidnapping:', secondCol:(()=>{
            if(kidnapping==0){
              return null;
            }
            if(kidnapping==1){
              return `Attempted Kidnapping of ${kidnapping_people} `
            }
            if(kidnapping==2){
              return `kidnapped (${kidnapping_people})`;
            }
          })() },
          { firstCol: 'Bribery:', secondCol:(()=>{
            if(bribery==0){
              return null;
            }
            if(bribery==1){
              return `Bribe request by polic officer`
            }
            if(bribery==2){
              return `Bribe request by civil servant,`;
            }
            if(bribery==3){
              return `Bribe request by politician`;
            }
          })() },
          // { firstCol: 'Shoplifting:', secondCol:(()=>{
          //   if(shoplifting==0){
          //     return null;
          //   }
          //   if(shoplifting==1){
          //     return `Attempted Shoplifting`
          //   }
          //   if(shoplifting==2){
          //     return `Shoplifting`;
          //   }
          // })() },
          // { firstCol: 'Reason for crime:', secondCol: (various)?capitalize(various_choices[various]):"" },
          { firstCol: 'Reason for crime:', secondCol: cleanedArray.length > 0 ? <div dangerouslySetInnerHTML={{ __html: resultString }} />  : null },
          { firstCol: 'Police Visited Crime Scene:', secondCol: (police_reporting==1?"Yes": police_reporting == 0 ? "unknown" : "No") },
          { firstCol: 'Formally reported to the police:', secondCol: (reported_to_the_police==1?"Yes": police_reporting == 0 ? "unknown" : "No") },
          { firstCol: 'Police Case Number:', secondCol: police_case_num?police_case_num:null },
          { firstCol: 'Media:', secondCol: mediaData },
      ];
    }else{
      return [
        { firstCol: `Edited by`, secondCol: (()=>{ return (<>
          {edited && wholeData && wholeData.length >= 1 && <FormControl sx={{ width: '100%' }}>
            <InputLabel id="industry-type-label" style={{color:"white !important"}}>Users</InputLabel>
            <Select
              labelId="Users"
              id="edited-users"
              value={wholeData != null ? wholeData[0]:"Select"}
              label="Users"
              onChange={handlerChangeUser}
            >
              {wholeData?.map((item,index) => (
                <MenuItem key={index} value={wholeData[index]}>
                  {item.user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          {/* {!edited && wholeData && wholeData.length == 1 && <p style={{border:"1px solid white",padding:"12px"}}>{wholeData[0].user.username}</p>} */}
          {/* {!edited && wholeData && wholeData.length == 1 && <p>This reported is edited , you can check new.</p>} */}
          </>); 
        })() },
        { firstCol: 'Time of occurrence:', secondCol:  
          (
            <div>
              <p style={{ position: "absolute" }}>{localDateString}</p>
              {user && user.corporate !== null && user.corporate !== undefined ? (
                <>
                  <img
                    src={user.corporate.logo}
                    style={{ height: "30px", width: "30px", border: "2px solid #333", borderRadius: "50%", float:"right"}}
                    alt="No Data Available"
                  />
                  {user.corporate.is_verify == 1 ? <CheckBoxIcon style={{ height: "30px", width: "30px", color: "#29C250", float:"right" }} /> : ''}
                </>
              ) : ''
              }
            </div>
          ),
        },
        
        { firstCol: 'Address:', secondCol: (()=>{ 
          const formattedLatitude = parseFloat(latitude).toFixed(5);
          const formattedLongitude = parseFloat(longitude).toFixed(5);  
          return (
            <div>
              <p>{location}</p><br></br>
              <p>{formattedLatitude}</p>
              <p>{formattedLongitude}</p>
            </div>
          ); 
        })() },
        { firstCol: 'Description:', secondCol: <p>{description||"No description available"}</p> },
        // { firstCol: 'Description of Perpetrators:', secondCol: [null,-1].includes(perpetrators)?perpetrators:"" },
        { firstCol: 'Perpetrators:', secondCol: perpetrators?[`${parseInt(perpetrators) >= 0 ? (perpetrators) : "Preperator(s) detail not available" }`,roleID==1 ? ",".perpetrators_des :'']:"Preperator(s) detail not available" },
        
        { firstCol: 'Weapons:', secondCol: (()=>{
          switch(weapons){
            case '0':return ``
            case '1':return `None`
            default:return (
              <div>
                {WeaponChoices[fully_auto_weapons] != undefined && <div style={{display:"flex"}}>
                  Fully Automatic: {WeaponChoices[fully_auto_weapons]} <img src={AK} style={{height:"35px",width:"35px"}} /> <br />
                </div>}
                {WeaponChoices[semi_auto_weapons] != undefined && <div style={{display:"flex"}}>
                Semi Automatic: {WeaponChoices[semi_auto_weapons]} <img src={Pistol} style={{height:"25px",width:"25px"}} /><br />
                </div>}
                {WeaponChoices[knife_weapons] != undefined && <div style={{display:"flex"}}>
                Knife: {WeaponChoices[knife_weapons]} <img src={Knife} style={{height:"20px",width:"25px"}} /> <br />
                </div>}
                {WeaponChoices[other_weapons] != undefined && <div style={{display:"flex"}}>
                  Unusual weapon: {WeaponChoices[other_weapons]} <img src={Others} style={{height:"20px",width:"25px"}} /><br />
                </div>}

              </div>
            );
            // default:return `Fully Automatic: ${WeaponChoices[fully_auto_weapons]}, Semi Automatic: ${WeaponChoices[semi_auto_weapons]}, Knife: ${WeaponChoices[knife_weapons]}, Other: ${WeaponChoices[other_weapons]}`;
          }
        })() },
        { firstCol: 'Rape:', secondCol:(()=>{
          if(rape==0){
            return null
          }
          if(rape==1){
            return `Attempted Rape (${rape_people})`
          }
          if(rape==2){
            return `Rape (${rape_people})`
          }
        })() },
        { firstCol: 'Murder:', secondCol:(()=>{
          if(murders==1) {
            return (
              <div>
                {`Murder (${murders_people})`}
                <br />
                {farm_murder === 1 && `It was a farm murder`}<br />
                {victim_name != "unknown" && victim_name != 'null' && victim_name != null && 
                (
                  <span>{'Name(s) of victim(s)'}<br />{victim_name.replace(/"/g, '')}</span>
                )
                }
              </div>
            );
          }
        } )() },
        // { firstCol: 'Farm Murder:', secondCol:(()=>{
        //   if(farm_murder==1) {
        //     return `It was a farm murder`
        //   }
        // })() },
        // { firstCol: 'Name(s) of victim(s)', secondCol:(()=>{
        //   if(victim_name != "unknown" && victim_name != 'null' && victim_name != null ) {
        //     const originalString = victim_name;
        //     const stringWithoutQuotes = originalString.replace(/"/g, '');
        //     return stringWithoutQuotes
        //   }
        // })() },
        { firstCol: 'Assault:', secondCol:(()=>{
          if(assault==1){
            return `Murder (${assault_people} involved)`
          }else{
            return null;
          }
        })() },
        { firstCol: 'Vehicle related:', secondCol:(()=>{
          if(vehicle_theft==4){
            return null;//capitalize(vehicle_theft_choices[vehicle_theft])
          }else{
            return( <div>
              {capitalize(`${vehicle_theft_choices[vehicle_theft]}`)}<br></br>
              {(vehicle_year||vehicle_colour||vehicle_make||vehicle_model)?capitalize(`Vehicle Type(${[vehicle_year,vehicle_colour,vehicle_make,vehicle_model].filter((el)=>el).join(" ")})`):"Vehicle Description Unavailable"}
            </div>);
          }
        })() },
        // { firstCol: 'Vehicle Type:', secondCol:(()=>{
        //   if(vehicle_theft==4){
        //     return null;//capitalize(vehicle_theft_choices[vehicle_theft])
        //   }else{
        //     return (vehicle_year||vehicle_colour||vehicle_make||vehicle_model)?capitalize(`${[vehicle_year,vehicle_colour,vehicle_make,vehicle_model].filter((el)=>el).join(" ")} Vehicle`):"Vehicle Description Unavailable"
        //   }
        // })() },
        { firstCol: 'Burglary/Shoplifting:', secondCol:(()=>{
          if(burglary==0){
            return null;
          }
          if(burglary==1){
            return `Attempted Burglary (${burglary_type}) `;
          }
          if(burglary==2){
            return `Burglary (${burglary_type})`;
          }
          if(burglary==3){
            return `Attempted Shoplifting`
          }
          if(burglary==4){
            return `Shoplifting`;
          }
        })() },
        { firstCol: 'Robbery:', secondCol:(()=>{
          if(robbery==0){
            return null;
          }
          if(robbery==1){
            return `Attempted Burglary of ${robbery_type} `
          }
          if(robbery==2){
            return `Robbery (${robbery_type})`;
          }
        })() },
        { firstCol: 'Kidnapping:', secondCol:(()=>{
          if(kidnapping==0){
            return null;
          }
          if(kidnapping==1){
            return `Attempted Kidnapping of ${kidnapping_people} `
          }
          if(kidnapping==2){
            return `kidnapped (${kidnapping_people})`;
          }
        })() },
        { firstCol: 'Bribery:', secondCol:(()=>{
          if(bribery==0){
            return null;
          }
          if(bribery==1){
            return `Bribe request by polic officer`
          }
          if(bribery==2){
            return `Bribe request by civil servant,`;
          }
          if(bribery==3){
            return `Bribe request by politician`;
          }
        })() },
        // { firstCol: 'Shoplifting:', secondCol:(()=>{
        //   if(shoplifting==0){
        //     return null;
        //   }
        //   if(shoplifting==1){
        //     return `Attempted Shoplifting`
        //   }
        //   if(shoplifting==2){
        //     return `Shoplifting`;
        //   }
        // })() },
        // { firstCol: 'Reason for crime:', secondCol: (various)?capitalize(various_choices[various]):"" },
        { firstCol: 'Reason for crime:', secondCol: cleanedArray.length > 0 ? <div dangerouslySetInnerHTML={{ __html: resultString }} /> : null },
        { firstCol: 'Police Visited Crime Scene:', secondCol: (police_reporting==1?"Yes":"No") },
        { firstCol: 'Formally reported to the police:', secondCol: (reported_to_the_police==1?"Yes":"No") },
        { firstCol: 'Police Case Number:', secondCol: police_case_num?police_case_num:null },
        { firstCol: 'Media:', secondCol: mediaData },
    ];
    }
}