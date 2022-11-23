import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from 'src/store/user';
import { getUsers, deleteUser, changeUserStatus } from 'src/apis';
import { makeStyles } from '@mui/styles';
import LinkButton from 'src/components/Button/LinkButton';
import { ASSET_URL } from 'src/env';
import EditDeleteOption from 'src/components/ActionOptions'
import {useNavigate, useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import Label from 'src/components/Label';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
  IconButton,
  Avatar,
  Button,  
} from '@mui/material';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  permissionBtn:{
    textAlign: 'center'
  },
  roleSlug: {
    marginRight: 10
  }
});


export default function User() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState({
    total:0,
    per_page:0,
    current_page:0
  });
  const [openDialog, setOpenDialog] = React.useState({
    status: false, 
    id: null 
  });
  const [changeStatusDialog, setChangeStatusDialog] = React.useState({
    status: false, 
    id: null,
    condition: null
  });

  const users = useSelector((state) => state.user.users); 

  useEffect(() => {
    getUsers(1).then(function (response) {
      console.log(response.data)
      if(response.data.status_code == 200){
        setPaginate({
          total:response.data.data.total,
          per_page:response.data.data.per_page,
          current_page:response.data.data.current_page -1
        });
        dispatch(userActions.setUsers(response.data.data.data)); 
      }  
    })
  },[]);

  const userRemove = (status, id) => {
    if(status === true){
      console.log(status)
      console.log(id)
      deleteUser({id:id}).then(function (response) {
        if(response.data.status_code == 200){
          getUsers().then(function (response) {
            if(response.data.status_code == 200){
              setPaginate({
                total:response.data.data.total,
                per_page:response.data.data.per_page,
                current_page:response.data.data.current_page -1
              });
              dispatch(userActions.setUsers(response.data.data.data)); 
            }  
          })
        }
      })
    }
  }

  const openPermissionPage = (url) => {
    navigate(url);
  }

  const changeUserStatusFun = (status, id, condition) => {
    if(status == true){
      const param = {
        id : id,
        status: condition
      }
      changeUserStatus(param).then(function (response) {
        if(response.data.status_code == 200){
          getUsers().then(function (response) {
            setPaginate({
              total:response.data.data.total,
              per_page:response.data.data.per_page,
              current_page:response.data.data.current_page -1
            });
            dispatch(userActions.setUsers(response.data.data.data));   
          })
        } 
      })
    }
  }

  const deleteOptionAction = (event) => {
    console.log(event)
    setOpenDialog((prevState) => ({
      ...prevState,
      status: event.status,
      id:event.id
    }));
  }

  const handlePageChange = (event, onPage) => {
    getUsers(onPage + 1).then(function (response) {
      if(response.data.status_code == 200){
        setPaginate({
          total:response.data.data.total,
          per_page:response.data.data.per_page,
          current_page:response.data.data.current_page -1
        });
        dispatch(userActions.setUsers(response.data.data.data)); 
      }  
    })
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <LinkButton to="/user/create" name="Add User"/>
      </Stack>
    </Container>
  );
}
