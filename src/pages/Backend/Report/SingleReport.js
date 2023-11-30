import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  deleteReport, reportStatus } from 'src/store/api/report';
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
import redEye from '../../../assets/images/red eye.png'
import greenEye from '../../../assets/images/green eye.png'
import API from 'src/config/api';
import { fDateTime } from 'src/utils/formatTime';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ActiveInactiveButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
export default function SingleReport({report,formattedLatitude,formattedLongitude,index,handler}) {
    const [toggle,setToggle] = useState(report.is_approve == '1' ? true : false)
    const dispatch = useDispatch();
    const [show,setShow] = useState(report.is_show == '1' ? true : false)
    const [openDialog, setOpenDialog] = useState({
        status: false,
        id: null
    });
    const [changeStatusDialog, setChangeStatusDialog] = React.useState({
        status: false,
        id: null,
        condition: null
    });
    
    const handleChange = async () => {
        const val = toggle;
        setToggle(p=>!p);
        const formValue = {
            id:report.id,
            is_approve: !val ? 1:0
        }
        const response = await API.post(`/setReportApproved`,formValue);
    };
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
    const showHandler = async () => {
        const val = show;
        setShow(p=>!p);
        const formValue = {
            id:report.id,
            showHide: !val ? 1:0
        }
        const response = await API.post(`/setShowReport`,formValue);
    };
    
  return (
    <>
        <TableRow>
            {/* {admin && <TableCell align="left" sx={{ fontSize: 10, userSelect: "none" }}>{report.is_updated === 1 &&
            <Tooltip title="User has edited the crime entry">
                <Link>
                (edited)
                </Link>
            </Tooltip>
            }</TableCell>}
            <TableCell component="th" scope="row">{report.location}</TableCell>
            {admin && <TableCell align="left">{report.user.name}</TableCell>}
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
                index={index}
                delete_id={report.id}
                show_url={'/report?target=single&id=' + report.id}
                add_note={'/add_not/' + report.id}
                deleteAction={deleteOptionAction}
            />
            </TableCell> */}
            <TableCell>
            <ToggleButtonGroup
                color="success"
                value={toggle}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
            </TableCell>
            <TableCell align="left">{fDateTime(report.date_time)}</TableCell>
            <TableCell component="th" scope="row">{report.location}<br></br>{formattedLatitude} S,<br></br>{formattedLongitude} E</TableCell>
            <TableCell align="left">
            {report.robbery != 0 ? (<>Robbery,<br /></>) : null}
            {report.murders != 0 ? (<>Murders,<br /></>) : null}
            {report.burglary !=0 ? (<>Burglary,<br /></>) : null}
            {report.kidnapping != 0 ? (<>Kidnapping,<br /></>) : null}
            {report.rape != 0 ? (<>Rape,<br /></>) : null}
            {report.weapons != 0 ? (<>Weapons,<br /></>) : null}
            </TableCell>
            <TableCell align="left">{report.user.phone}</TableCell>
            <TableCell align="left">{report.user.username}</TableCell>
            <TableCell align="left"><div>{report.user.corporate ? report.user.corporate.name : '' }{report.user.corporate ? report.user.corporate.is_verify==1 ? <CheckBoxIcon style={{ color: "#29C250",position: "absolute" }} /> : '' : ''}</div></TableCell> 
            <TableCell align="right">
                <ActionOptions
                    index={index}
                    delete_id={report.id}
                    show_url={'/report?target=single&id=' + report.id}
                    add_note={'/add_not/' + report.id}
                    deleteAction={(event) => {
                        // handler(event.status,event.id)
                        setOpenDialog((prevState) => ({
                            ...prevState,
                            status: event.status,
                            id: event.id
                        }));
                    }}
                />
            </TableCell> 
            <TableCell align="center">
                {!show && <img src={redEye} onClick={showHandler} />}
                {show && <img src={greenEye} onClick={showHandler} />}
            </TableCell>                                
        </TableRow>
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
    </>
  )
}
