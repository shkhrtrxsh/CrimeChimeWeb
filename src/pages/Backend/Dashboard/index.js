// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../../sections/@dashboard/app';

import { useSelector, useDispatch } from 'react-redux';
import { dashboard } from 'src/store/api/user';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.user }));

  console.log(user)
  useEffect(() => {
    dispatch(dashboard({}));
  }, [])

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {user ?
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant='h4'>Users</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Registered Users" total={user.user ? user.user.total : 0} icon={'mdi:user'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Active Users" total={user.user ? user.user.active : 0} icon={'mdi:user'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Inactive Users" total={user.user ? user.user.inactive : 0} icon={'mdi:user'} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant='h4' sx={{ marginTop: '20px' }}>Reports</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Reported Crime" total={user.user ? user.report.total : 0} icon={'mdi:user'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Active Report" total={user.user ? user.report.active : 0} icon={'mdi:user'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Inactive Report" total={user.user ? user.report.inactive : 0} icon={'mdi:user'} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppCurrentVisits
                title="Crimes"
                chartData={[
                  { label: 'Violent Crime', value: user.user ? user.report.violent_crime : 0 },
                  { label: 'Theft', value: user.user ? user.report.theft : 0 },
                  { label: 'Property Damage', value: user.user ? user.report.property_damage : 0 },
                ]}
                chartColors={[
                  theme.palette.chart.red[0],
                  theme.palette.chart.green[0],
                  theme.palette.chart.grey[0],
                ]}
              />
            </Grid>
          </Grid>
          : ""
        }
      </Container>
    </Page>
  );
}
