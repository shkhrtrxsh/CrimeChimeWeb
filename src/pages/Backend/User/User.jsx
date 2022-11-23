import React, { Fragment, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { getUsers, deleteUser, userStatus} from 'src/store/api/user';
import { ActiveInactiveButton, LinkButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import Iconify from 'src/components/Iconify';
import palette from 'src/theme/palette';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator';
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
import {SearchInTable} from 'src/components/Table';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [url, setUrl] = useState('');
  const [openDialog, setOpenDialog] = useState({
    status: false, 
    id: null 
  });
  const [changeStatusDialog, setChangeStatusDialog] = useState({
    status: false, 
    id: null,
    condition: null
  });

  const { users } = useSelector((state) => ({ ...state.user }));

  useEffect(() => {
    const param = getSearchQueryParams(searchParams)
    dispatch(getUsers({param}))
  },[searchParams]);

  const callDeleteFunc = (status, id) => {
    if(status === true){
      dispatch(deleteUser({id}))
    }
  }

  const changeStatusFunc = (status, id, condition) => {    
    if(status === true){
      const formValue = {
        id : id,
        status: condition
      }
      dispatch(userStatus({ formValue }))

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
    navigate(`/user?${param}`)
  }

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value)
    navigate(`/user?${param}`)
  }

  const setSearchByParam = (param) => {
    navigate(`/user?${param}`)
  }


  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="User List" 
        rightButton={{name: "add user", link: "/user/add"}} 
      />
      <Card>
        <SearchInTable searchByParam={setSearchByParam} />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">E-mail</TableCell>
                {/* <TableCell align="left">Mobile</TableCell> */}
                <TableCell align="left">Roles</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data && users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  {/* <TableCell align="left">{user.mobile}</TableCell> */}
                  <TableCell align="left">
                  { user.roles && user.roles.map((role, index) => (
                    <ActiveInactiveButton 
                      // onClick={() => setChangeStatusDialog({ status: true, id: user.id })}
                      status={1}
                      key={index}
                    >
                      {role.name}
                    </ActiveInactiveButton>
                    ))}
                  </TableCell>  
                  <TableCell align="left">
                    <ActiveInactiveButton 
                      onClick={() => setChangeStatusDialog({ status: true, id: user.id })}
                      status={user.status}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </ActiveInactiveButton>
                  </TableCell>                
                  <TableCell align="right">
                    <ActionOptions 
                      delete_id={user.id} 
                      edit_url={`/user/${user.id}/edit`}
                      show_url={'/user/'+user.id} 
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
          count={users.total}
          rowsPerPage={users.per_page}
          page={users.current_page - 1}
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
