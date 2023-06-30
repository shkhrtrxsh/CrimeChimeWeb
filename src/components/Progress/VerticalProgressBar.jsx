import { Box } from '@mui/material';

const VerticalProgressBar = ({progress=0,maxVal}) => {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
        {Array(maxVal).fill(0).map(($_,ind)=>{
            return(
                <Box sx={{width:"15px",height:"15px",flexGrow:1,bgcolor:(ind<progress)?"black":'rgba(0,0,0,0.5)',borderRadius:"50%",mb:1,ml:1}} key={ind}></Box>
            )
        })}
    </Box>
  );
}

export default VerticalProgressBar;
