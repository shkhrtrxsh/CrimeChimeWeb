import { WeaponChoices } from "src/constants/weapons";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const { capitalize } = require("./string");

export const crimeDetails=(values,index,vehicle_theft_choices,various_choices,mediaData)=>{
    const {date_time,user,location,perpetrators,weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons,rape,rape_people,murders,murders_people,farm_murder,assault,assault_people,vehicle_theft,vehicle_colour,vehicle_make,vehicle_model,vehicle_year,burglary,burglary_type,robbery,robbery_type,kidnapping,kidnapping_people,various,police_reporting,reported_to_police,police_case_num,description}=values[index]||{};
    return [
        { firstCol: 'Date/Time Occurred:', secondCol:  
          (
            <div>
              <p style={{ position: "absolute" }}>{date_time}</p>
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
        
        { firstCol: 'Address:', secondCol: <p>{location}</p> },
        { firstCol: 'Description of Crime:', secondCol: <p>{description||"No description available"}</p> },
        { firstCol: 'Description of Perpetrators:', secondCol: [null,-1].includes(perpetrators)?perpetrators:"" },
        { firstCol: 'Weapons:', secondCol: (()=>{
          switch(weapons){
            case 0:return ``
            case 1:return `None`
            default:return `Fully Automatic:${WeaponChoices[fully_auto_weapons]}, Semi Automatic:${WeaponChoices[semi_auto_weapons]}, Knife:${WeaponChoices[knife_weapons]}, Other:${WeaponChoices[other_weapons]}`
          }
        })() },
        { firstCol: 'Rape:', secondCol:(()=>{
          switch(rape && rape_people > 0){
            case 0:return null;//`Does not apply`
            case 1:return `Attempted Rape(${rape_people} involved)`
            default:return null//`Rape(${rape_people} involved)`
          }
        })() },
        { firstCol: 'Murder:', secondCol:(()=>{
          if(murders==1) {
            return `Murder(${murders_people} involved)`
          }
          // switch(murders){
          //   case 0:return ``
          //   case 1:return `Murder(${murders_people} involved)`
          //   default:return null;//`No`
          // }
        } )() },
        { firstCol: 'Farm Murder:', secondCol:(()=>{
          if(farm_murder==1) {
            return `It was a farm murder`
          }
          // switch(farm_murder){
          //   case 0:return ``
          //   case 1:return `It was a farm murder`
          //   default:return null;
          // }
        })() },
        { firstCol: 'Assault:', secondCol:(()=>{
          switch(assault){
            case 0:return ``
            case 1:return `Murder(${assault_people} involved)`
            default:return null;//`No`
          }
        })() },
        { firstCol: 'Vehicle Theft:', secondCol:(()=>{
          if(vehicle_theft===4){
            return null;//capitalize(vehicle_theft_choices[vehicle_theft])
          }else{
            return capitalize(`${vehicle_theft_choices[vehicle_theft]}`)
          }
        })() },
        { firstCol: 'Vehicle Type:', secondCol:(()=>{
          if(vehicle_theft===4){
            return null;//capitalize(vehicle_theft_choices[vehicle_theft])
          }else{
            return (vehicle_year||vehicle_colour||vehicle_make||vehicle_model)?capitalize(`${[vehicle_year,vehicle_colour,vehicle_make,vehicle_model].filter((el)=>el).join(" ")} Vehicle`):"Vehicle Description Unavailable"
          }
        })() },
        { firstCol: 'Burglary:', secondCol:(()=>{
          switch(burglary){
            case 0:return null//`Does not apply`
            case 1:return `Attempted Burglary of ${burglary_type} `
            default:return `Burglary of ${burglary_type}`
          }
        })() },
        { firstCol: 'Robbery:', secondCol:(()=>{
          switch(robbery){
            case 0:return null;//`Does not apply`
            case 1:return `Attempted Burglary of ${robbery_type} `
            default:return null;//`No`
          }
        })() },
        { firstCol: 'Kidnapping:', secondCol:(()=>{
          switch(kidnapping){
            case 0:return null;//`Does not apply`
            case 1:return `Attempted Kidnapping (${kidnapping_people} involved) `
            default:return null;//`No`
          }
        })() },
        { firstCol: 'Reason for crime:', secondCol: (!various||various?.length===0)?"":capitalize(various_choices[various]) },
        {firstCol: 'Police Visited Crime Scene:', secondCol: (police_reporting===0?"":(police_reporting===0?"Yes":"No"))},
        { firstCol: 'Formally reported to the police:', secondCol: (reported_to_police===0?"":(reported_to_police===0?"Yes":"No")) },
        { firstCol: 'Police Case Number:', secondCol: police_case_num?police_case_num:null },
        { firstCol: 'Media:', secondCol: mediaData },
      ];
}