import React, { useEffect } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/group';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function GroupManagement() {
    const state = useSelector(state => state.group)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGroups())
    }, [])

    return (
        <>
            <div className="title-page">
                <GroupIcon />
                <span>Group management</span>
            </div>
            <div className="card-box">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.groups && state.groups.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link className="btn btn-edit" to={`/admin/group/${item.id}`}>
                                                <EditIcon />
                                            </Link>
                                            <button className="btn btn-delete" onClick={() => dispatch(deleteGroup(item.id))}>
                                                <DeleteForeverIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                state.groups.length < 1 && 
                                <tr>
                                    <td colSpan="3">
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
        </>
    );
}
