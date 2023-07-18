import { WeaponChoices } from "src/constants/weapons";

const { capitalize } = require("./string");

export const crimeDetails=(values,index,vehicle_theft_choices,various_choices,mediaData)=>{
    const {date_time,location,perpetrators,weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons,rape,rape_people,murder,murder_people,assault,assault_people,vehicle_theft,vehicle_colour,vehicle_make,vehicle_model,vehicle_year,burglary,burglary_type,robbery,robbery_type,kidnapping,kidnapping_people,various,police_reporting,reported_to_police,police_case_num,description}=values[index]||{};
    return [
        { firstCol: 'Time of Occurence:', secondCol: <p>{date_time}</p> },
        { firstCol: 'Address:', secondCol: <p>{location}</p> },
        { firstCol: 'Description:', secondCol: <p>{description||"No Description Available."}</p> },
        { firstCol: 'Perpetrators:', secondCol: [null,-1].includes(perpetrators)?perpetrators:"Unknown" },
        { firstCol: 'Weapons:', secondCol: (()=>{
          switch(weapons){
            case 0:return `Unknown`
            case 1:return `None`
            default:return `Fully Automatic:${WeaponChoices[fully_auto_weapons]}, Semi Automatic:${WeaponChoices[semi_auto_weapons]}, Knife Weapons:${WeaponChoices[knife_weapons]}, Other:${WeaponChoices[other_weapons]}`
          }
        })() },
        { firstCol: 'Rape:', secondCol:(()=>{
          switch(rape){
            case 0:return null;//`Does not apply`
            case 1:return `Attempted Rape(${rape_people} involved)`
            default:return `Rape(${rape_people} involved)`
          }
        })() },
        { firstCol: 'Murder:', secondCol:(()=>{
          switch(murder){
            case 0:return `Unknown`
            case 1:return `Murder(${murder_people} involved)`
            default:return null;//`No`
          }
        })() },
        { firstCol: 'Assault:', secondCol:(()=>{
          switch(assault){
            case 0:return `Unknown`
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
        { firstCol: 'Reason for crime:', secondCol: (!various||various?.length===0)?"Unknown":capitalize(various_choices[various]) },
        {firstCol: 'Police Visited Crime Scene:', secondCol: (police_reporting===0?"Unknown":(police_reporting===0?"Yes":"No"))},
        { firstCol: 'Formally reported to the police:', secondCol: (reported_to_police===0?"Unknown":(reported_to_police===0?"Yes":"No")) },
        { firstCol: 'Police Case Number:', secondCol: police_case_num?police_case_num:null },
        { firstCol: 'Media:', secondCol: mediaData },
      ];
}