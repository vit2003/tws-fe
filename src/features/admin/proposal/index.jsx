import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PendingIcon from '@mui/icons-material/Pending';
import { getProposalsWaiting } from './../../../redux/actions/proposal';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';



function ProposalManagerment(props) {

    const state = useSelector(state => state.proposal)
    console.log("state: ", state);
    const [active, setActive] = useState('waiting');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProposalsWaiting())
    }, [])

    return (
        <>
            <div className="title-page">
                <EmojiEventsIcon />
                <span>Proposal/Contest management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={getProposalsWaiting} className={active == 'waiting' && 'active'}>
                        <PendingIcon />
                        <span style={{ marginLeft: '5px' }}>Waiting</span>
                    </Button>
                    <Button className={active == 'group' && 'active'}>
                        <GroupIcon />
                        <span style={{ marginLeft: '5px' }}>Group</span>
                    </Button>
                    <Button className={active == 'account' && 'active'}>
                        <ManageAccountsIcon />
                        <span style={{ marginLeft: '5px' }}>Account</span>
                    </Button>

                </ButtonGroup>
            </div>

            <div className="card-box">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>title</th>
                                <th>Type</th>
                                <th>owner</th>
                                <th>owner avatar</th>
                                <th>description</th>
                                <th>location</th>
                                <th>maxRegistration</th>
                                <th>startDate</th>
                                {active === 'waiting' &&
                                    <th className="th-action">Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {state.proposals && state.proposals.map((item, index) => (
                                console.log("item: ", item),
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.typeName}</td>
                                    <td>{item.ownerName}</td>
                                    <td>
                                        <div className="avatar">
                                            <img src={item.ownerAvatar} />
                                        </div>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.location}</td>
                                    <td>{item.location}</td>
                                    <td>{item.maxRegister}</td>

                                    {active === 'waiting' && (
                                        <td>
                                            <Link to={`/admin/proposal/${item.id}`}>
                                                <Tooltip title="Create New">
                                                    <IconButton sx={{backgroundColor: '#5886db', color: '#fff'}} size="normal">
                                                        <EditIcon />
                                                    </IconButton>

                                                </Tooltip>
                                            </Link>
                                            <button className="btn btn-delete" onClick={() => dispatch(denyPost(item.id))}>
                                                <Tooltip title="Deny">
                                                    <DoDisturbIcon />
                                                </Tooltip>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {
                                !state.proposals &&
                                <tr>
                                    <td colSpan={active === 'waiting' ? "7" : "6"}>
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

export default ProposalManagerment;