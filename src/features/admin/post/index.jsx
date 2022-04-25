import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByGroupId } from '../../../redux/actions/post';
import { getGroups } from './../../../redux/actions/group';
import formatDate from './../../../utils/formatDate';
import ShowImage from './showImage';

export default function PostManagement() {
    const state = useSelector(state => state.post)
    const groups = useSelector(state => state.group)
    const [active, setActive] = useState('group');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroups())
    }, [])

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
    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>Post management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="split button">

                    {/* <Button onClick={getPostOfAccount} className={active == 'account' && 'active'}>
                        <ManageAccountsIcon />
                        <span style={{ marginLeft: '5px' }}>Account</span>
                    </Button> */}
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
                                <th>No</th>
                                <th>Name</th>
                                <th>Avatar</th>
                                <th>Image</th>
                                <th>Content</th>
                                <th>Created At</th>
                                {/* {active === 'waiting' &&
                                    <th className="th-action">Action</th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {state.posts && state.posts.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.ownerName}</td>
                                    <td>
                                        <div className="avatar">
                                            <Avatar src={item.ownerAvatar} alt="avatar" sx={{ position: 'static !important' }}></Avatar>
                                        </div>
                                    </td>
                                    <td className="td-images" >
                                        <div className="images">
                                            <ShowImage id={item.id} />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{item.content}</div>
                                    </td>
                                    <td>{formatDate(item.publicDate ? item.publicDate : item.postDate)}</td>
                                    {/* {active === 'waiting' && (
                                        <td>
                                            <a className="btn btn-edit" onClick={() => dispatch(approvePost(item.id))}>
                                                <Tooltip title="Approve">
                                                    <DoneIcon />
                                                </Tooltip>
                                            </a>
                                            <button className="btn btn-deny" onClick={() => dispatch(denyPost(item.id))}>
                                                <Tooltip title="Deny">
                                                    <DoDisturbIcon />
                                                </Tooltip>
                                            </button>
                                        </td>
                                    )} */}
                                </tr>
                            ))}

                            {
                                !state.posts &&
                                <tr>
                                    <td colSpan={active === 'group' ? "7" : "6"}>
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
