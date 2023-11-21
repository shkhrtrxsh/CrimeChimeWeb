import { WeaponChoices } from "src/constants/weapons";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const { capitalize } = require("./string");
const various_choices = ["Does not apply","crime occured at ATM" ,"i believe crime to be drug-related","i believe crime to be gang-related" ,"Arson was involed"," Vandalism was involed" ,"social an unrest","Bombs were involved"]

export const crimeDetails=(values,index,vehicle_theft_choices,various_choices,mediaData)=>{
    const {date_time,user,location,latitude,longitude,perpetrators,perpetrators_des,shoplifting,bribery,weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons,rape,rape_people,murders,murders_people,farm_murder,victim_name,assault,assault_people,vehicle_theft,vehicle_colour,vehicle_make,vehicle_model,vehicle_year,burglary,burglary_type,robbery,robbery_type,kidnapping,kidnapping_people,various,police_reporting,reported_to_the_police,police_case_num,description}=values[index]||{};
    const utcDate = new Date(date_time);
    const localDateString = utcDate.toLocaleString();
    
    const cleanedString = various.replace(/[\[\]"]/g, '');
    const cleanedArray = cleanedString.split(',').map(Number);

    // Check if variousnew is an array before using map
    // if (Array.isArray(cleanedArray)) {
      const mappedChoices = cleanedArray.map(index => various_choices[index]);
      const resultString = mappedChoices.join(', ');
    // } else {
    //   console.error('variousnew is not an array:', cleanedArray);
    // }

    return [
        { firstCol: 'Date/Time Occurred:', secondCol:  
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
        
        { firstCol: 'Address:', secondCol: (()=>{ return (
          <div>
            <p>{location}</p><br></br>
            <p>{latitude}</p>
            <p>{longitude}</p>
          </div>
        ); 
        })() },
        { firstCol: 'Description of Crime:', secondCol: <p>{description||"No description available"}</p> },
        // { firstCol: 'Description of Perpetrators:', secondCol: [null,-1].includes(perpetrators)?perpetrators:"" },
        { firstCol: 'Perpetrators:', secondCol: perpetrators?[perpetrators,' , ',perpetrators_des]:"" },
        { firstCol: 'Weapons:', secondCol: (()=>{
          switch(weapons){
            case 0:return ``
            case 1:return `None`
            default:return (
              <div>
                Fully Automatic: {WeaponChoices[fully_auto_weapons]}<br />
                Semi Automatic: {WeaponChoices[semi_auto_weapons]}<br />
                Knife: {WeaponChoices[knife_weapons]}<br />
                Other: {WeaponChoices[other_weapons]}<br />
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
            return `Murder (${murders_people})`
          }
        } )() },
        { firstCol: 'Farm Murder:', secondCol:(()=>{
          if(farm_murder==1) {
            return `It was a farm murder`
          }
        })() },
        { firstCol: 'Victim Name:', secondCol:(()=>{
          if(victim_name!="unknown") {
            const originalString = victim_name;
            const stringWithoutQuotes = originalString.replace(/"/g, '');
            return stringWithoutQuotes
          }
        })() },
        { firstCol: 'Assault:', secondCol:(()=>{
          switch(assault){
            case 0:return ``
            case 1:return `Murder(${assault_people} involved)`
            default:return null;//`No`
          }
        })() },
        { firstCol: 'Vehicle related:', secondCol:(()=>{
          if(vehicle_theft===4){
            return null;//capitalize(vehicle_theft_choices[vehicle_theft])
          }else{
            return( <div>
              {capitalize(`${vehicle_theft_choices[vehicle_theft]}`)},<br></br>
              {(vehicle_year||vehicle_colour||vehicle_make||vehicle_model)?capitalize(`${[vehicle_year,vehicle_colour,vehicle_make,vehicle_model].filter((el)=>el).join(" ")} Vehicle`):"Vehicle Description Unavailable"}
            </div>);
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
          if(burglary==0){
            return null;
          }
          if(burglary==1){
            return `Attempted Burglary (${burglary_type}) `;
          }
          if(burglary==2){
            return `Burglary (${burglary_type})`;
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
            return `Number of person(s) kidnapped (${kidnapping_people})`;
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
        { firstCol: 'Shoplifting:', secondCol:(()=>{
          if(shoplifting==0){
            return null;
          }
          if(shoplifting==1){
            return `Attempted Shoplifting`
          }
          if(shoplifting==2){
            return `Shoplifting`;
          }
        })() },
        // { firstCol: 'Reason for crime:', secondCol: (various)?capitalize(various_choices[various]):"" },
        { firstCol: 'Reason for crime:', secondCol: cleanedArray.length > 0 ? resultString : "" },
        { firstCol: 'Police Visited Crime Scene:', secondCol: (police_reporting==1?"Yes":"No") },
        { firstCol: 'Formally reported to the police:', secondCol: (reported_to_the_police==1?"Yes":"No") },
        { firstCol: 'Police Case Number:', secondCol: police_case_num?police_case_num:null },
        { firstCol: 'Media:', secondCol: mediaData },
      ];
}