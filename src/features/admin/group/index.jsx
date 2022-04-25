import GroupIcon from '@mui/icons-material/Group';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/group';

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
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.groups && state.groups.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
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
