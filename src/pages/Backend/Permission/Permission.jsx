import React, { Fragment, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPermissions, deletePermission, permissionStatus} from 'src/store/api/permission';
import { LinkButton, ActiveInactiveButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'
import {SearchInTable} from 'src/components/Table';
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
    dispatch(getPermissions({param}))
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
    navigate(`/permission?${param}`)
  }

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value)
    navigate(`/permission?${param}`)
  }

  const setSearchByParam = (param) => {
    navigate(`/permission?${param}`)
  }

  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="Permission Module List" 
        rightButton={{name: "add module", link: "/permission/add"}} 
      />
      <Card>
        <SearchInTable searchByParam={setSearchByParam} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Permission Module Name</TableCell>
                <TableCell align="left">Slug</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.data && permissions.data.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell component="th" scope="row">{permission.name}</TableCell>
                  <TableCell align="left">{permission.slug}</TableCell>
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
                      edit_url={'/permission/edit/'+permission.id} 
                      deleteAction={deleteOptionAction}
                      extra_url={{name:"Add Permission", url : '/add-more-permission/'+permission.id, icon : 'carbon:add'}}
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
