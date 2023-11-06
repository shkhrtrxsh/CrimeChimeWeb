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
} from "@mui/material";
import { SearchInTable } from "src/components/Table";

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

  const corporateData = useSelector((state) => state?.corporate?.data);

  useEffect(() => {
    dispatch(showCorporate({}));
  }, []);

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
    navigate(`/user?${param}`);
  };

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value);
    navigate(`/user?${param}`);
  };

  const setSearchByParam = (param) => {
    navigate(`/user?${param}`);
  };
  console.log(corporateData);
  return (
    <Fragment>
      <BreadcrumbNavigator
        currentPage="Corporate List"
        rightButton={{ name: "add Corporate", link: "addCorAdmin" }}
      />
      <Card>
        <SearchInTable searchByParam={setSearchByParam} />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Corporate Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Industry Types</TableCell>
                <TableCell align="left">Logo</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {corporateData &&
                corporateData.map((cor) => (
                  <TableRow key={cor.id}>
                    <TableCell component="th" scope="row">
                      {cor.name}
                    </TableCell>
                    <TableCell align="left">{cor.address}</TableCell>
                    <TableCell align="left">{cor.cor_admon.name}</TableCell>
                    <TableCell align="left">{cor.cor_admon.phone}</TableCell>
                    <TableCell align="left">{cor.cor_admon.email}</TableCell>
                    <TableCell align="left">{cor.industry.name}</TableCell>
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
                        delete_id={cor.id}
                        show_url={"/user/" + cor.id}
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
          count={users.total}
          rowsPerPage={users.per_page}
          page={users.current_page - 1}
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
