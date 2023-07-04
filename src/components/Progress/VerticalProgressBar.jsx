import { Box } from '@mui/material';

const VerticalProgressBar = ({ progress = 0, maxVal }) => {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
        {Array(maxVal).fill(0).map(($_,ind)=>{
            return(
                <Box sx={{width:"10px",height:"15px",flexGrow:1,bgcolor:(ind<progress)?"#ffe600":'rgba(0,0,0,0.1)',border:"1px solid black",mb:1,ml:1}} key={ind}></Box>
            )
        })}
    </Box>
  );
}

export default VerticalProgressBar;

