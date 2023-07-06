import { Box, useMediaQuery, useTheme } from '@mui/material';

const VerticalProgressBar = ({ progress = 0, maxVal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "65%" }}>
      {Array(maxVal)
        .fill(0)
        .map((_, ind) => {
          const isFilled = ind < progress;
          return (
            <Box
              key={ind}
              sx={{
                
                width: "10px",
                height: isMobile ? `${100 / maxVal}%` : `${80 / maxVal}%`,
                flexGrow: 1,
                bgcolor: isFilled ? "#ffe600" : 'rgba(251, 251, 251, 0.963)',
                border: "1px solid black",
                mb: isMobile ? '1%' : '1%',
                ml: '5px',
              }}
            ></Box>
          );
        })}
    </Box>
  );
};

export default VerticalProgressBar;



