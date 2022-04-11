import React, { useEffect, useState, useRef } from 'react';
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { getGroups } from './../../../redux/actions/group';

export default function PostManagement() {
    console.log('post management')
    const state = useSelector(state => state.post)

    console.log("state: ", state);

    const groups = useSelector(state => state.group)
    const [active, setActive] = useState('waiting');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsWaiting())
        dispatch(getGroups())
    }, [])



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
    // ================GROUP STATE=============================
    const anchorRefGroup = useRef(null);
    const [selectedGroup, setSelectedGroup] = useState("SELECT GROUP");
    const [selectedGroupId, setSelectedGroupId] = useState();
    const [openGroup, setOpenGroup] = useState(false);
    const [filtersGroup, setFiltersGroup] = useState({
        pageNumber: 1,
        pageSize: 9
    });

    const handleClickGroupItem = (event, id, name) => {
        setSelectedGroup(name)
        setSelectedGroupId(id)
        const newFilter = {
            pageNumber: 1,
            pageSize: 9,
        }
        dispatch(getPostsByGroupId(id, newFilter))
        setFiltersGroup(prevFilters => ({
            ...prevFilters,
            pageNumber: 1
        }))
        console.log('filtersGroup: ', filtersGroup);
        console.log('id: ', id);
        setOpenGroup(false);
    };

    // Hanle selected Group
    const handleToggleGroup = () => {
        setOpenGroup((prevOpen) => !prevOpen);
        if (active !== 'group') {
            setActive('group');
        }
    };

    const handleCloseGroup = (event) => {
        if (anchorRefGroup.current && anchorRefGroup.current.contains(event.target)) {
            return;
        }
        setOpenGroup(false);
    };



    // =============================================
    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>Post management</span>
            </div>

            {/* <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={getPostWaiting} className={active == 'waiting' && 'active'}>
                        <PendingIcon />
                        <span style={{ marginLeft: '5px' }}>Waiting</span>
                    </Button>
                    <Button onClick={getPostOfAccount} className={active == 'account' && 'active'}>
                        <ManageAccountsIcon />
                        <span style={{ marginLeft: '5px' }}>Account</span>
                    </Button>
                    <Button
                        className={active == 'group' && 'active'}
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <GroupIcon /> <span style={{ marginLeft: '5px' }}>{selectedName}</span>  <ArrowDropDownIcon />
                    </Button>

                </ButtonGroup>

                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {groups.groups?.map((group, index) => (
                                            <MenuItem
                                                key={index}
                                                // selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, group.id, group.name)}
                                            >
                                                {group.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>


            </div> */}

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="split button">
                    <Button onClick={getPostWaiting} className={active == 'waiting' && 'active'}>
                        <PendingIcon />
                        <span style={{ marginLeft: '5px' }}>Waiting</span>
                    </Button>
                    <Button onClick={getPostOfAccount} className={active == 'account' && 'active'}>
                        <ManageAccountsIcon />
                        <span style={{ marginLeft: '5px' }}>Account</span>
                    </Button>
                    <Button
                        ref={anchorRefGroup}
                        className={active == 'group' && 'active'}
                        size="small"
                        aria-controls={openGroup ? 'split-button-group' : undefined}
                        aria-expanded={openGroup ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="group"
                        onClick={handleToggleGroup}
                    >
                        <GroupIcon /> <span style={{ marginLeft: '5px' }}>{selectedGroup}</span>  <ArrowDropDownIcon />
                    </Button>

                    <Popper
                        open={openGroup}
                        anchorEl={anchorRefGroup.current}
                        transition
                        disablePortal

                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseGroup}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {groups.groups?.map((group, index) => (
                                                <MenuItem
                                                    key={index}
                                                    // selected={index === selectedIndex}
                                                    onClick={(event) => handleClickGroupItem(event, group.id, group.name)}
                                                >
                                                    {group.name}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </ButtonGroup>

                {/* ================================== */}

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
                            {state.posts && state.posts.map((item, index) => (
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
                            ))}

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
