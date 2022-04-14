import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DoneIcon from '@mui/icons-material/Done';
import GroupIcon from '@mui/icons-material/Group';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/group';
import { enablePost, getTradingPostsByGroupId } from '../../../redux/actions/tradingPost';
import { disablePost, getTradingPostsByEnableStatus } from './../../../redux/actions/tradingPost';
import ShowImage from './showImage';
import formatDate from './../../../utils/formatDate';
// Style CSS
const useStyle = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px'
    }
}));


export default function TradingPostManagement() {
    const state = useSelector(state => state.tradingPost)
    const dispatch = useDispatch();
    const classes = useStyle();
    console.log("state: ", state);

    const groups = useSelector(state => state.group)
    const enableLabel = [
        {
            id: 0,
            name: 'ALL'
        },
        {
            id: 1,
            name: 'DISABLED'
        },
        {
            id: 2,
            name: 'ENABLE'
        },
    ];
    console.log('enable 1: ', enableLabel[1].id == 1);

    useEffect(() => {
        // getTradingPostsByEnableStatus()
        dispatch(getGroups())
    }, [])


    // STATE ACTIVE
    const [active, setActive] = useState('status');

    const stateCount = state.count;

    // REF OF POPOVER
    const anchorRefGroup = useRef(null);
    const anchorRefEnable = useRef(null);
    const anchorRefStatus = useRef(null);
    // const [selectedIndex, setSelectedIndex] = useState(1);

    // ================GROUP STATE=============================
    const [selectedGroup, setSelectedGroup] = useState("SELECT GROUP");
    const [selectedGroupId, setSelectedGroupId] = useState();
    const [openGroup, setOpenGroup] = useState(false);
    const [filtersGroup, setFiltersGroup] = useState({
        pageNumber: 1,
        pageSize: 9
    });

    // =================ENABLE STATE============================
    const [selectedEnable, setSelectedEnable] = useState("SELECT ENABLE");
    const [selectedEnableId, setSelectedEnableId] = useState();
    const [openEnable, setOpenEnable] = useState(false);
    const [filtersEnable, setFiltersEnable] = useState({
        PageNumber: 1,
        PageSize: 9
    });
    // =================STATUS STATE============================
    const [selectedStatus, setSelectedStatus] = useState("SELECT STATUS");
    const [openStatus, setOpenStatus] = useState(false);

    // ===============GROUP==============================


    const handleClickGroupItem = (event, id, name) => {
        setSelectedGroup(name)
        setSelectedGroupId(id)
        const newFilter = {
            pageNumber: 1,
            pageSize: 9,
        }
        dispatch(getTradingPostsByGroupId(id, newFilter))
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

    // ===================ENABLE===========================
    const handleClickEnableItem = (event, id, name) => {
        setSelectedEnable(name)
        setSelectedEnableId(id)
        const newFilter = {
            PageNumber: 1,
            PageSize: 9,
        }
        dispatch(getTradingPostsByEnableStatus(id, newFilter))
        setFiltersEnable(prevFilters => ({
            ...prevFilters,
            PageNumber: 1
        }))
        setOpenEnable(false);
    };

    const handleToggleEnable = () => {
        setOpenEnable((prevOpen) => !prevOpen);
        if (active !== 'enable') {
            setActive('enable');
        }
    };

    const handleCloseEnable = (event) => {
        if (anchorRefEnable.current && anchorRefEnable.current.contains(event.target)) {
            return;
        }
        setOpenEnable(false);
    };
    // =========================PAGING============
    const handlePageChange = (e, page) => {
        console.log("page: ", page);
        const newFilterGroup = {
            pageNumber: page,
            pageSize: 9,
        }
        const newFilterEnable = {
            PageNumber: page,
            PageSize: 9,
        }

        switch (active) {
            case 'group':
                dispatch(getTradingPostsByGroupId(selectedGroupId, newFilterGroup));
                break;
            case 'enable':
                dispatch(getTradingPostsByEnableStatus(selectedEnableId, newFilterEnable));
                break;
            default:
                break;
        }
        setFiltersGroup(prevFilters => ({
            ...prevFilters,
            pageNumber: page
        }))
        setFiltersEnable(prevFilters => ({
            ...prevFilters,
            PageNumber: 1
        }))
    }

    // const renderBtn = () => {
    //     switch (active) {
    //         case 'enable':
    //             switch (selectedEnableId) {
    //                 case 1:
    //                     console.log("switch 1: ", 1);
    //                     break;
    //                 case 2:
    //                     console.log("switch 1: ", 1);
    //                     break;

    //                 default:
    //                     break;
    //             }
    //         case 'group':
    //             break;
    //     }
    // }

    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>tradingPost management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="split button">
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

                    {/* ================================================ */}
                    <Button
                        ref={anchorRefEnable}
                        className={active == 'enable' && 'active'}
                        size="small"
                        aria-controls={openEnable ? 'split-button-enable' : undefined}
                        aria-expanded={openEnable ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="enable"
                        onClick={handleToggleEnable}
                    >
                        <GroupIcon /> <span style={{ marginLeft: '5px' }}>{selectedEnable}</span>  <ArrowDropDownIcon />
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


                    {/* ============================================= */}
                    <Popper
                        open={openEnable}
                        anchorEl={anchorRefEnable.current}
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
                                    <ClickAwayListener onClickAway={handleCloseEnable}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {enableLabel?.map((enable, index) => (
                                                <MenuItem
                                                    key={index}
                                                    // selected={index === selectedIndex}
                                                    onClick={(event) => handleClickEnableItem(event, enable.id, enable.name)}
                                                >
                                                    {enable.name}
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
                                <th>Toy Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th className="th-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.tradingPosts && state.tradingPosts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
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
                                    <td>
                                        <div>{item.toyName}</div>
                                    </td>
                                    <td>
                                        <div>{item.phone}</div>
                                    </td>
                                    <td>
                                        <div>{item.address}</div>
                                    </td>
                                    <td>
                                        <div>{item.status}</div>
                                    </td>
                                    <td>{formatDate(item.postDate)}</td>
                                    {
                                        active === 'enable' && selectedEnableId == 2 ?
                                            <td>
                                                <button className="btn btn-delete" onClick={() => dispatch(disablePost(item.id, selectedEnableId, filtersEnable))}>
                                                    <Tooltip title="Disable">
                                                        <DoDisturbOnIcon />
                                                    </Tooltip>
                                                </button>
                                            </td> :
                                            active === 'enable' && selectedEnableId == 1 ?
                                                <td>
                                                    <button className="btn btn-edit" onClick={() => dispatch(enablePost(item.id, selectedEnableId, filtersEnable))}>
                                                        <Tooltip title="Enable">
                                                            <DoneIcon />
                                                        </Tooltip>
                                                    </button>
                                                </td> : <td></td>
                                    }
                                </tr>
                            ))}

                            {
                                !state.tradingPosts &&
                                <tr>
                                    <td colSpan={active === 'enable' ? "7" : "6"}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgress />
                                        </Box>
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                    <Box className={classes.pagination}>
                        <Pagination
                            count={Math.ceil(state.count / filtersGroup.pageSize)}
                            color="secondary"
                            page={filtersGroup.pageNumber}
                            onChange={handlePageChange}
                        />
                    </Box>
                </div>
            </div>
        </>
    )
}
