import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReports, deleteReport, reportStatus } from 'src/store/api/report';
import { ActiveInactiveButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import { fDateTime } from 'src/utils/formatTime';
import NoData from 'src/assets/svg/no-data.svg';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Card,
  Tooltip,
  Link,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator';
import { SearchInTable } from 'src/components/Table';
import { getSearchQueryParams, setSearchQueryParams, recordPerPage } from 'src/helpers/SearchHelper';
import { StyledGrid } from 'src/pages/Frontend/User/StyledGrid';
import { NoDataDialogRoot } from 'src/layouts/components/NoDataDialogRoot';
import { setError } from 'src/store/reducers/report';
import redEye from '../../../assets/images/red eye.png'
import greenEye from '../../../assets/images/green eye.png'
import API from 'src/config/api';
import SingleReport from './SingleReport';
export default function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = React.useState({
    status: false,
    id: null
  });
  const [changeStatusDialog, setChangeStatusDialog] = React.useState({
    status: false,
    id: null,
    condition: null
  });

  const { reports,error } = useSelector((state) => ({ ...state.report }));
  useEffect(() => {
    const param = getSearchQueryParams(searchParams)
    dispatch(getReports({ param }))
  }, [searchParams]);

  const callDeleteFunc = (status, id) => {
    if (status === true) {
      dispatch(deleteReport({ id }))
    }
  }

  const changeStatusFunc = (status, id, condition) => {
    if (status === true) {
      const formValue = {
        id: id,
        status: condition
      }
      dispatch(reportStatus({ formValue }))
    }
  }

  const deleteOptionAction = (event) => {
    setOpenDialog((prevState) => ({
      ...prevState,
      status: event.status,
      id: event.id
    }));
  }

  const handlePageChange = (event, onPage) => {
    let param = setSearchQueryParams(searchParams, onPage)
    navigate(`/reports?${param}`)
  }

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value)
    navigate(`/reports?${param}`)
  }
  
  const admin = reports?.admin ? true : false;
  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="Report List"
        rightButton={{ name: "add report", link: "/report/add" }}
      />
      <NoDataDialogRoot error={error} handleClose={()=>dispatch(setError(null))}/>
      <Card>
        <SearchInTable />
        {reports ? <React.Fragment><TableContainer component={Paper}>
          
          <Table aria-label="simple table">
            <TableHead>
              {/* <TableRow>
                {admin && <TableCell align="left"></TableCell>}
                <TableCell>Location</TableCell>
                {admin && <TableCell align="left">Reporter</TableCell>}
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow> */}
              
              <TableRow>
                <TableCell>Public Report Approval</TableCell>
                <TableCell>Date/Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="left">Crime Type</TableCell>
                <TableCell align="left">Mob. #</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Corp./Group</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.data && reports.data.map((report, index) => {
  
                const latitude = Number(report.latitude);
                const longitude = Number(report.longitude);
                const formattedLatitude = latitude.toFixed(4);
                const formattedLongitude = longitude.toFixed(4);
                return (
                  <SingleReport key={index} index={index} handler={deleteOptionAction} report={report} formattedLatitude={formattedLatitude} formattedLongitude={formattedLongitude} />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
          <TablePagination
            rowsPerPageOptions={recordPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            component="div"
            count={reports.total}
            rowsPerPage={10}//reports.per_page}
            page={reports.current_page - 1}
            onPageChange={handlePageChange}
          /></React.Fragment> :
          <StyledGrid item md={9} xs={12}>
            <img src={NoData} alt="No Data Available" />
            <Typography variant="h4">Crime Records doesn't Exist</Typography>
          </StyledGrid>
        }
      </Card>
      

    </Fragment>
  );
}
