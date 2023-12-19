import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { showCorporate, deleteUser, userStatus } from "src/store/api/corporate";
import { ActiveInactiveButton, LinkButton } from "src/components/Button";
import ActionOptions from "src/components/ActionOptions";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmDeleteDialog from "src/components/ConfirmDeleteDialog";
import ChangeStatusDialog from "src/components/ChangeStatusDialog";
import Iconify from "src/components/Iconify";
import palette from "src/theme/palette";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import {
  getSearchQueryParams,
  setSearchQueryParams,
  recordPerPage,
} from "src/helpers/SearchHelper";
import API from 'src/config/api';
import { toast } from 'react-toastify';

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
  Card,
  FormControl,
  Select, 
  MenuItem,
} from "@mui/material";
import { SearchInTable } from "src/components/Table";
import corporate from "src/store/reducers/corporate";

export default function CorporateList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [openDialog, setOpenDialog] = useState({
    status: false,
    id: null,
  });
  const [changeStatusDialog, setChangeStatusDialog] = useState({
    status: false,
    id: null,
    condition: null,
  });
  const [industryType,setindustryTypeList] = useState([])
  const [industryTypeId,setindustryTypeId] = useState('')

  const corporateData = useSelector((state) => state?.corporate?.data);

  useEffect(() => {
    dispatch(showCorporate({}));
  }, []);
  useEffect(()=>{
    getindustryType()
  },[])

  const callDeleteFunc = (status, id) => {
    if (status === true) {
      dispatch(deleteUser({ id }));
    }
  };

  const changeStatusFunc = (status, id, condition) => {
    if (status === true) {
      const formValue = {
        id: id,
        status: condition,
      };
      dispatch(userStatus({ formValue }));
    }
  };

  const deleteOptionAction = (event) => {
    setOpenDialog((prevState) => ({
      ...prevState,
      status: event.status,
      id: event.id,
    }));
  };

  const handlePageChange = (event, onPage) => {
    let param = setSearchQueryParams(searchParams, onPage);
    navigate(`/corporate?${param}`);
  };

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value);
    navigate(`/corporate?${param}`);
  };

  const setSearchByParam = (param) => {
    navigate(`/corporate?${param}`);
  };

  const getindustryType = async () => {
    const response = await API.get("/listIndustryType")
    if(response.data.code == 200){
      setindustryTypeList(response.data.data)
    }else{
      toast.error(response.data.message,{
        toastId:'lsooo'
      })
    }
  }

  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="Corporates/Groups"
        rightButton={{ name: "add Corporate", link: "/corporate/add" }}
      />
      <Card>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" color="form">
        <Select
          value={industryTypeId}
          onChange={(e) => { setindustryTypeId(e.target.value) }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{maxHeight:"250px",overflowX:"auto"}}
        >
          <MenuItem value="" >All industryType</MenuItem>
          {industryType?.map((item,index)=><MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
        {/* <SearchInTable searchByParam={setSearchByParam}/> */}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small">Corp./Group Name</TableCell>
                <TableCell align="left" size="small">Address</TableCell>
                <TableCell align="left" size="small">Corp./Group Admin</TableCell>
                <TableCell align="left" size="small">Mobile Number</TableCell>
                <TableCell align="left" size="small">Email</TableCell>
                <TableCell align="left" size="small">Industry Types</TableCell>
                <TableCell align="left" size="small">Logo</TableCell>
                <TableCell align="left" size="small">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {corporateData &&
                corporateData.map((cor) => (
                  <TableRow key={cor.id}>
                    <TableCell component="th" scope="row" size="small">
                      {cor.name}
                    </TableCell>
                    <TableCell align="left" size="small">{cor.address}</TableCell>
                    <TableCell align="left" size="small">{cor.cor_admin?.name}</TableCell>
                    <TableCell align="left" size="small">{cor.cor_admin?.phone}</TableCell>
                    <TableCell align="left" size="small" >{cor.cor_admin?.email}</TableCell>
                    <TableCell align="left" size="small">{cor.industry?.name}</TableCell>
                    <TableCell align="left">
                      <img
                        src={cor.logo}
                        style={{
                          height: "30px",
                          width: "30px",
                          border: "2px solid #333",
                          borderRadius: "50%",
                          float: "right",
                        }}
                        alt="No Data Available"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ActionOptions
                        // delete_id={cor.id}
                        edit_url={"/Corporate/" + cor.id}
                        deleteAction={deleteOptionAction}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={recordPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          count={corporateData?.total}
          rowsPerPage={corporateData?.per_page}
          page={corporateData?.current_page - 1}
          onPageChange={handlePageChange}
        /> */}
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
