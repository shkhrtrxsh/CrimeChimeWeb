import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Select, MenuItem, useTheme, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ak from '../../../assets/images/ak.png';
import pistol from '../../../assets/images/pistolnew.png';
import knife from '../../../assets/images/knife.png';
import others from '../../../assets/images/others.png';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage } from 'src/store/reducers/registerReport';
import { css } from '@emotion/css';
import { WeaponChoices } from 'src/constants/weapons';

function Page4() {
  const data = useSelector(state => state.reportRegister.data);
  const { weapons, fully_auto_weapons, semi_auto_weapons, knife_weapons, other_weapons } = data;
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    const weaponSum = fully_auto_weapons + semi_auto_weapons + knife_weapons + other_weapons;
    if (weaponSum <= 0 && weapons === -1) {
      setError("*Weapons count should be atleast one");
      dispatch(setLock(true));
    } else {
      setError("");
      dispatch(setLock(false));
    }
  }, [weapons, fully_auto_weapons, semi_auto_weapons, knife_weapons, other_weapons])

  const handleChange = (event) => {
    dispatch(setPage({ weapons: Number(event.target.value) }));
  };
  const handleCount = (e) => {
    const { name, value } = e.target;
    dispatch(setPage({ [name]: value }));
  }

  const theme = useTheme();
  const fields = [
    {
      name: "fully_auto_weapons",
      label: (
        <>
          Fully automatic<br />
          <span style={{ fontSize: '14px', textAlign: 'left' }}>(machine gun, assault rifle)</span>
        </>
      ),
      imageSrc: ak,
      imageAlt: "Fully automatic(machine gun, assault rifle)",
      imageStyle: { width: "60px", height: "auto" }
    },
    {
      name: "semi_auto_weapons",
      label: (
        <>
          Semi automatic<br />
          <span style={{ fontSize: '14px', textAlign: 'left' }}>(pistol, handgun)</span>
        </>
      ),
      imageSrc: pistol,
      imageAlt: "Semi automatic(pistol, handgun)",
      imageStyle: { width: "40px", height: "40px", transform: "scaleX(-1)" }
    },
    {
      name: "knife_weapons",
      label: "Knife",
      imageSrc: knife,
      imageAlt: "Knife",
    },
    {
      name: "other_weapons",
      label: "Others",
      imageSrc: others,
      imageAlt: "Others",
    },
  ]



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '40px' }}>
          <Grid item xs={10} sx={{ paddingBottom: '20px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>
                Weapons
              </Typography>
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
            </Box>
            <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
              Perpetrator(s) had weapon(s)?
            </Typography>
          </Grid>
          <Box paddingLeft="40px" display="flex" className={css`
              flex-direction: column;
            `}>
            <FormControlLabel
              control={<Checkbox checked={weapons === -1} value={-1} onChange={handleChange} />}
              label="Perpetrator used or fired this weapon"
              sx={{ paddingBottom: weapons === -1?'0px':'20px' }}
            />
            <Box display={weapons===-1?"block":"none"} mb={4}>
              {error && <FormHelperText sx={{ color: 'red', ml: 2 }}>{error}</FormHelperText>}
              <Box component={"ul"} sx={{ mt: 4 }}>
                {fields.map((f, ind) => {
                  return (
                    <li style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3', width: "100%" }} key={ind}>
                      <Select sx={{ width: "80px", marginBottom: "5px" }} disabled={weapons >= 0} name={f.name} value={data[f.name] || 3} onChange={handleCount} >
                        {WeaponChoices.map((_, ind) => {
                          return (
                            <MenuItem value={ind + 1} key={ind}>{WeaponChoices[ind]}</MenuItem>
                          )
                        })}
                      </Select>
                      <Typography sx={{ fontWeight: 'normal', fontSize: '16px', paddingX: 2, textAlign: 'left' }}>
                        {f.label}
                      </Typography>
                      <img src={f.imageSrc} style={{ width: '40px', height: '40px', ...f.imageStyle }} alt={f.imageAlt} />
                    </li>
                  )
                })}
              </Box>
            </Box>
            <FormControlLabel
              control={<Checkbox checked={weapons === 1} value={1} onChange={handleChange} />}
              label="Perpetrator did not use or fire this weapon"
              sx={{ paddingBottom: '20px' }}
            />
            <FormControlLabel
              control={<Checkbox checked={weapons === 0} value={0} onChange={handleChange} />}
              label="Unknown if weapon was used or fired"
              sx={{ paddingBottom: '20px' }}
            />


          </Box>
        </Grid>
      </Container>
    </LocalizationProvider>

  )
};

export default Page4