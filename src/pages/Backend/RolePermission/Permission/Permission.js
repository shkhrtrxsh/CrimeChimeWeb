import React, { Fragment, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPermissions, deletePermission, permissionStatus} from 'src/store/api/permission';
import { LinkButton, ActiveInactiveButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'
import {SearchInTable} from 'src/components/Table';
import Iconify from 'src/components/Iconify';
import { getSearchQueryParams, setSearchQueryParams, recordPerPage } from 'src/helpers/SearchHelper';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper, 
  Container, 
  Stack, 
  Typography,
  Card
} from '@mui/material';

export default function Permission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const [openDialog, setOpenDialog] = React.useState({
    status: false, 
    id: null 
  });
  const [changeStatusDialog, setChangeStatusDialog] = React.useState({
    status: false, 
    id: null,
    condition: null
  });

  const { permissions } = useSelector((state) => ({ ...state.permission }));

  useEffect(() => {
    const param = getSearchQueryParams(searchParams)
    const id = params.id
    dispatch(getPermissions({param, id}))
  },[searchParams]);

  const callDeleteFunc = (status, id) => {
    if(status === true){
      dispatch(deletePermission({id}))
    }
  }

  const changeStatusFunc = (status, id, condition) => {    
    if(status === true){
      const formValue = {
        id : id,
        status: condition
      }
      dispatch(permissionStatus({ formValue }))

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
    navigate(`/permission/${params.id}?${param}`)
  }

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value)
    navigate(`/permission/${params.id}?${param}`)
  }

  const setSearchByParam = (param) => {
    navigate(`/permission/${params.id}?${param}`)
  }

  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="Permission Lists" 
        rightButton={{name: "Add Permission", link: "/permission/add/"+params.id}} 
      />
      <Card>
        <SearchInTable searchByParam={setSearchByParam} />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">URL</TableCell>
                <TableCell align="left">API</TableCell>
                <TableCell align="left">Method</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.data && permissions.data.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell component="th" scope="row">{permission.name}</TableCell>
                  <TableCell align="left">{permission.url}</TableCell>
                  <TableCell align="left">{permission.api}</TableCell>
                  <TableCell align="left">{permission.method}</TableCell>
                  <TableCell align="left">
                    <ActiveInactiveButton 
                      onClick={() => setChangeStatusDialog({ status: true, id: permission.id })}
                      status={permission.status}
                    >
                      {permission.status ? "Active" : "Inactive"}
                    </ActiveInactiveButton>
                  </TableCell>              
                  <TableCell align="right">
                    <ActionOptions 
                      delete_id={permission.id} 
                      edit_url={`/permission/${params.id}/edit/${permission.id}`} 
                      deleteAction={deleteOptionAction}
                      // extra_url={{name:"Add Permission", url : '/add-more-permission/'+permission.id, icon : 'carbon:add'}}
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
          count={permissions.total}
          rowsPerPage={permissions.per_page}
          page={permissions.current_page - 1}
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
