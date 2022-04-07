import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByUserId, getPostsByGroupId, getPostsWaiting, approvePost, denyPost } from '../../../redux/actions/post';
import { Link } from 'react-router-dom';
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

export default function PostManagement() {
    const state = useSelector(state => state.post)
    const [active, setActive] = useState('waiting');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsWaiting())
    }, [])

    const getPostOfGroup = () => {
        if (active !== 'group') {
            setActive('group');
            dispatch(getPostsByGroupId(1))
        }
    }

    const getPostOfAccount = () => {
        if (active !== 'account') {
            setActive('account');
            dispatch(getPostsByUserId(1))
        }
    }

    const getPostWaiting = () => {
        if (active !== 'waiting') {
            setActive('waiting');
            dispatch(getPostsWaiting())
        }
    }

    return (
        <>
            <div className="title-page">
                <DescriptionIcon/>
                <span>Post management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={getPostOfGroup} className={active == 'group' && 'active'}>
                        <GroupIcon />
                        <span style={{ marginLeft: '5px' }}>Group</span>
                    </Button>
                    <Button onClick={getPostOfAccount} className={active == 'account' && 'active'}>
                        <ManageAccountsIcon />
                        <span style={{ marginLeft: '5px' }}>Account</span>
                    </Button>
                    <Button onClick={getPostWaiting} className={active == 'waiting' && 'active'}>
                        <PendingIcon />
                        <span style={{ marginLeft: '5px' }}>Waiting</span>
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
                                <th>Avatar</th>
                                <th>Image</th>
                                <th>Content</th>
                                <th>Created At</th>
                                {active === 'waiting' && 
                                <th className="th-action">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            { state.posts && state.posts.map((item, index) => (
                                console.log("item: ", item),
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.ownerName}</td>
                                    <td>
                                        <div className="avatar">
                                            <img src={item.ownerAvatar} />
                                        </div>
                                    </td>
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
                                        <div>{item.content}</div>
                                    </td>
                                    <td>
                                        {item.publicDate ? item.publicDate : item.postDate}
                                    </td>
                                    {active === 'waiting' && (
                                        <td>
                                            <a className="btn btn-edit" onClick={() => dispatch(approvePost(item.id))}>
                                                <Tooltip title="Approve">
                                                    <DoneIcon />
                                                </Tooltip>
                                            </a>
                                            <button className="btn btn-delete" onClick={() => dispatch(denyPost(item.id))}>
                                                <Tooltip title="Deny">
                                                    <DoDisturbIcon />
                                                </Tooltip>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )) }

                            {
                                !state.posts && 
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
    )
}
