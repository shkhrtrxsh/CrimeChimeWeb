import React, { Fragment, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReports, deleteReport, reportStatus} from 'src/store/api/report';
import { ActiveInactiveButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import { fDateTime } from 'src/utils/formatTime';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper, 
  Card
} from '@mui/material';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator';
import {SearchInTable} from 'src/components/Table';
import { getSearchQueryParams, setSearchQueryParams, recordPerPage } from 'src/helpers/SearchHelper';

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

  const { reports } = useSelector((state) => ({ ...state.report }));

  useEffect(() => {
    const param = getSearchQueryParams(searchParams)
    dispatch(getReports({param}))
  },[searchParams]);

  const callDeleteFunc = (status, id) => {
    if(status === true){
      dispatch(deleteReport({id}))
    }
  }

  const changeStatusFunc = (status, id, condition) => {    
    if(status === true){
      const formValue = {
        id : id,
        status: condition
      }
      dispatch(reportStatus({ formValue }))
    }
  }

  const deleteOptionAction = (event) => {
    setOpenDialog((prevState) => ({
      ...prevState,
      status: event.status,
      id:event.id
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

  const setSearchByParam = (param) => {
    navigate(`/reports?${param}`)
  }

  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="Report List" 
        rightButton={{name: "add report", link: "/report/add"}} 
      />
      <Card>
        <SearchInTable searchByParam={setSearchByParam} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell align="left">Crime</TableCell>
                <TableCell align="left">Specific Crime</TableCell>
                <TableCell align="left">Reporter</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.data && reports.data.map((report) => (
                <TableRow key={report.id}>
                  <TableCell component="th" scope="row">{report.location}</TableCell>
                  <TableCell align="left">{report.crime.name}</TableCell>
                  <TableCell align="left">{report.specific_crime.name}</TableCell>  
                  <TableCell align="left">{report.user.name}</TableCell>                  
                  <TableCell align="left">
                    <ActiveInactiveButton 
                      onClick={() => setChangeStatusDialog({ status: true, id: report.id })}
                      status={report.status}
                    >
                      {report.status ? "Active" : "Inactive"}
                    </ActiveInactiveButton>
                  </TableCell>
                  <TableCell align="left">{fDateTime(report.created_at)}</TableCell>
                  <TableCell align="right">
                    <ActionOptions 
                      delete_id={report.id}
                      show_url={'/report?target=single&id='+report.id}
                      add_note={'/add_not/'+report.id}
                      deleteAction={deleteOptionAction}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={recordPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          count={reports.total}
          rowsPerPage={reports.per_page}
          page={reports.current_page - 1}
          onPageChange={handlePageChange}
        />
      </Card>
      <ConfirmDeleteDialog 
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog}
        confirmDialog={callDeleteFunc}
      />

      <ChangeStatusDialog 
        openDialog={changeStatusDialog} 
        setOpenDialog={setChangeStatusDialog}
        confirmDialog={changeStatusFunc}
      />

    </Fragment>
  );
}
