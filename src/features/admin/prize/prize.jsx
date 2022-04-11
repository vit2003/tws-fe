import React, { useEffect, useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, deactiveAccount } from '../../../redux/actions/account';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonGroup, Dialog, DialogContent, DialogActions, DialogTitle, IconButton, Avatar, Card, CardHeader, Typography, Switch, Button, Select, FormControlLabel, FormControl, InputLabel, Input, MenuItem } from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useForm, Controller } from 'react-hook-form';
import PendingIcon from '@mui/icons-material/Pending';
import GroupIcon from '@mui/icons-material/Group';
import { createPrize, deletePrize, getPrizes } from './../../../redux/actions/prize';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AdminInputField from '../../../components/form-controls/AdminInputField/AdminInputField';
import currencyFormat from './../../../utils/formatPrize';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { useSnackbar } from 'notistack';
function PrizeManagement() {
    const state = useSelector(state => state.prize)
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 9,
    });

    useEffect(() => {
        dispatch(getPrizes(filters))
    }, [])

    const [active, setActive] = useState('active');

    // Open dialog
    const [open, setOpen] = React.useState(false);
    // set full width for dialog
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const { enqueueSnackbar } = useSnackbar();
    // Handle open dialogo
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handle close dialog and reset state
    const handleClose = () => {
        setOpen(false);
    };

    const schema = yup.object().shape({
        // title: yup.string()
        //     .required('Please enter your Title')
        //     .test('should has at least two words', 'Please Enter as least two words', (value) => {
        //         return value.split(' ').length >= 2;
        //     }),
        // toyName: yup.string().required('Please enter your Toy.'),

    });
    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            value: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmitPrize = async (values) => {
        try {
            const newPrize = {
                name: values.name,
                description: values.description,
                value: values.value,
                images: []
            }
            console.log('newPrize: ', newPrize);
            await dispatch(createPrize(newPrize))
            enqueueSnackbar('New Post successfully!!', { variant: 'success' })
            // console.log("response: ", response);
        } catch (error) {
            console.log('Failed create new post: ', error);
            enqueueSnackbar('Failed to New Post !!', { variant: 'error' })
        }
        form.reset();
    }
    return (
        <>
            <div className="title-page">
                <WorkspacePremiumIcon />
                <span>Prize management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button className={active == 'active' && 'active'}>
                        <WorkspacePremiumIcon />
                        <span style={{ marginLeft: '5px' }}>Active</span>
                    </Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={handleClickOpen} className='active'>
                        <WorkspacePremiumIcon />
                        <span style={{ marginLeft: '5px' }}>Create new Prize</span>
                    </Button>
                </ButtonGroup>

            </div>

            <div className="card-box">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Value</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.prizes && state.prizes.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.value)}</td>
                                        {/* <td><img src={item.images[0]?.url} alt="prize" /></td> */}
                                        <td className="td-images">
                                            <div className="images">
                                                {item.images.length > 0 && item.images.map((image, keyImage) => (
                                                    <div className="image" key={keyImage}>
                                                        <img src={image.url} alt="" />
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <Link to={`/admin/prize/${item.id}`}>
                                                <Tooltip title="Edit">
                                                    <IconButton sx={{ backgroundColor: '#5886db', color: '#fff' }} size="normal">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            {/* <button className="btn btn-delete" onClick={() => dispatch(deletePrize(item.id))}>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </button> */}
                                            <button className="btn btn-delete" onClick={() => dispatch(deletePrize(item.id))}>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </button>
                                            {/* {
                                                item.status == 'Active' ?
                                                    <IconButton size="normal" color="inherit" onClick={() => dispatch(deactiveAccount(item.id))}>
                                                        <LockIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton size="normal" color="inherit" onClick={() => dispatch(deactiveAccount(item.id))}>
                                                        <LockOpenIcon />
                                                    </IconButton>

                                            } */}
                                        </td>
                                    </tr>
                                ))
                            }

                            {/* <button className="btn btn-lock" onClick={() => dispatch(deactiveAccount(item.id))}>
                                <Tooltip title="Lock">
                                    <LockIcon />
                                </Tooltip>
                            </button>
                            <button className="btn btn-unlock" onClick={() => dispatch(deactiveAccount(item.id))}>
                                <Tooltip title="Unlock">
                                    <LockOpenIcon />
                                </Tooltip>
                            </button> */}
                            {
                                state.prizes.length < 1 &&
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
            <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                {/* TEXTFIELD TO FILL STATUS */}
                <form onSubmit={form.handleSubmit(handleSubmitPrize)}>
                    {/* DIALOG'S TITLE */}
                    <DialogTitle sx={{ textAlign: 'center', borderBottom: '1px solid #d3d3d3' }}>Create A Prize</DialogTitle>
                    <DialogContent sx={{ marginTop: '10px' }}>

                        <AdminInputField name='name' label='Name' form={form} />
                        <AdminInputField name='description' label='Description' form={form} />
                        <AdminInputField name='value' label='Value' form={form} />

                    </DialogContent>

                    <DialogActions>
                        <Button color='inherit' onClick={handleClose}>Cancel</Button>
                        <Button type='submit' >Post</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default PrizeManagement;