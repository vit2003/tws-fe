import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton, Avatar, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deactiveAccount, getAccounts } from '../../../redux/actions/account';
import { useState } from 'react';

export default function AccountManagement() {
    const state = useSelector(state => state.account)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAccounts())
    }, [])


    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("md");
    const [open, setOpen] = useState(false);
    const [itemClick, setItemClick] = useState({});

    const handleOpenConfirm = (item) => {
        setOpen(true)
        setItemClick(item)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDisable = () => {
        dispatch(deactiveAccount(itemClick.id))
        setOpen(false)
    }

    return (
        <>
            <div className="title-page">
                <ManageAccountsIcon />
                <span>Account management</span>
            </div>
            <div className="card-box">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.accounts && state.accounts.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <Avatar src={item.avatar} contained alt="avatar" />
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>

                                        <td>
                                            {
                                                item.status === 'Active' ?
                                                    <label className="label label-active">{item.status}</label> :
                                                    <label className="label label-disabled">{item.status}</label>
                                            }
                                        </td>
                                        {
                                            item.role == 0 ? <td>Admin</td> : item.role == 1 ? <td>Manager</td> : <td>User</td>
                                        }
                                        <td>
                                            <Link to={`/admin/account/${item.id}`}>
                                                <a className="btn btn-edit" >
                                                    <Tooltip title="Approve">
                                                        <EditIcon />
                                                    </Tooltip>
                                                </a>
                                            </Link>
                                            {
                                                item.status == 'Active' ?
                                                    <a className="btn btn-disable" onClick={() => handleOpenConfirm(item)}>
                                                        <Tooltip title="Disable account">
                                                            <LockIcon />
                                                        </Tooltip>
                                                    </a>
                                                    :
                                                    <a className="btn btn-disable" onClick={() => dispatch(deactiveAccount(item.id))}>
                                                        <Tooltip title="Enable account">
                                                            <LockOpenIcon />
                                                        </Tooltip>
                                                    </a>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                state.accounts.length < 1 &&
                                <tr>
                                    <td colSpan="6">
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgress />
                                        </Box>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        borderBottom: "1px solid #d3d3d3",
                    }}
                >
                    Are you sure to disable {itemClick.name}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Avatar src={itemClick.avatar} alt="avatar" sx={{ position: 'static !important', mr: 2, width: '100px', height: '100px' }}></Avatar>
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDisable}>
                        Disable
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
