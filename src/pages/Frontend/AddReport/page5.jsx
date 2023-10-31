import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { setLock, setPage } from "src/store/reducers/registerReport";

function Page5() {
  const {
    murders: value,
    murders_people: count,
    farm_murder,
    victim_name,
  } = useSelector((state) => state.reportRegister.data);
  console.log(farm_murder);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const setCount = (murders_people) => dispatch(setPage({ murders_people }));
  const setValue = (murders) => dispatch(setPage({ murders }));
  const setFarm = (farm_murder) => dispatch(setPage({ farm_murder }));
  const setVictim = (victim_name) => dispatch(setPage({ victim_name }));
  const [unknownVictimName, setUnknownVictimName] = useState(
    victim_name === "unknown"
  );

  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (value === 0) {
      setCount(1);
    } else {
      dispatch(setLock(false));
      setCount(null);
    }
    setValue(value);
  };

  const handleFarmMurderChange = (event) => {
    // Toggling between 1 and 0
    const isFarmMurder = farm_murder === 1 ? 0 : 1;
    setFarm(isFarmMurder);
  };

  // Handle "Unknown" checkbox change
  const handleUnknownChange = () => {
    setUnknownVictimName(!unknownVictimName);
    if (unknownVictimName) {
      // If unchecking "Unknown," set an empty string for victim_name
      setVictim("");
    } else {
      // If checking "Unknown," set "unknown" for victim_name
      setVictim("unknown");
    }
  };

  // Handle victim name input change
  const handleVictimNameChange = (event) => {
    const name = event.target.value;
    dispatch(setPage({ victim_name: name }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ paddingTop: "40px" }}
        >
          <Grid item xs={10}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                borderBottom={2}
                borderColor="warning.main"
                style={{ marginRight: "5px", width: "20px" }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                Murders/Deaths
              </Typography>
              <Box
                borderBottom={2}
                borderColor="warning.main"
                style={{ marginLeft: "5px", width: "20px" }}
              />
            </Box>
            <Typography
              variant="h2"
              align="center"
              style={{
                fontWeight: "bold",
                paddingBottom: "20px",
                fontSize: "12px",
              }}
            >
              Was anyone killed?
            </Typography>
          </Grid>

          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                //justifyItems="center",
                my: 3,
                pl: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === 0}
                    value={0}
                    onChange={handleChange}
                  />
                }
                label="Unknown"
                sx={{ paddingTop: "10px" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === 3}
                    value={3}
                    onChange={handleChange}
                  />
                }
                label="No"
                sx={{ paddingTop: "20px", paddingBottom: "20px" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === 1}
                    value={1}
                    onChange={handleChange}
                  />
                }
                label="Yes"
                sx={{ paddingBottom: "20px" }}
              />
            </Box>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Select
                value={count || ""}
                onChange={(e) => {
                  const count = e.target.value;
                  if (!count || count <= 0) {
                    dispatch(setLock(true));
                    setError("*required");
                  } else {
                    dispatch(setLock(false));
                    setError("");
                  }
                  setCount(count);
                }}
                disabled={value === 0}
                error={error ? true : false}
              >
                {Array.from({ length: 30 }, (_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
              <Typography
                variant="h6"
                sx={{ fontWeight: "normal", px: 2, textAlign: "center" }}
              >
                If yes, then how many?
              </Typography>
            </div>
            <Box>
              <Typography
                variant="h2"
                align="center"
                style={{
                  fontWeight: "normal",
                  paddingBottom: "0px",
                  fontSize: "15px",
                  paddingLeft: "5px",
                  paddingTop: "20px",
                }}
              >
                Was this a farm murder?
              </Typography>
              <box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={farm_murder === 1}
                      onChange={handleFarmMurderChange}
                    />
                  }
                  label="Yes"
                  sx={{
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    textAlign: "center",
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={farm_murder === 0}
                      onChange={handleFarmMurderChange}
                    />
                  }
                  label="No"
                  sx={{
                    paddingTop: "20px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    textAlign: "center",
                  }}
                />
              </box>

              <Typography
                variant="h2"
                align="center"
                style={{
                  fontWeight: "normal",
                  paddingBottom: "0px",
                  fontSize: "15px",
                  paddingLeft: "5px",
                  paddingTop: "20px",
                }}
              >
                Name of the person(s) killed?
              </Typography>
              <box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={unknownVictimName}
                      onChange={handleUnknownChange}
                    />
                  }
                  label="Unknown"
                  sx={{ paddingTop: "10px" }}
                />
              </box>

              <TextField
                value={unknownVictimName ? "" : victim_name}
                onChange={handleVictimNameChange}
                label="name (use , if more than one name)"
                placeholder=""
                fullWidth
                disabled={unknownVictimName}
              />
            </Box>
          </div>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}

export default Page5;
