import { Box } from '@mui/material';

const VerticalProgressBar = ({ progress = 0, maxVal }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "3px" }}>
      {Array(maxVal)
        .fill(0)
        .map((_, ind) => {
          const isProgress = ind < progress;
          return (
            <Box
              sx={{
                width: "6px",
                
                height: "15px",
                flexGrow: 1,
                backgroundColor: isProgress ? "yellow" : 'rgb(251, 249, 249), 0.5)',
                borderRadius: 0,
                mb: 1,
                ml: 1,
                border: '1px solid gray',
              }}
              key={ind}
            ></Box>
          );
        })}
    </Box>
  );
}

export default VerticalProgressBar;

