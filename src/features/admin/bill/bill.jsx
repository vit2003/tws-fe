import DescriptionIcon from '@mui/icons-material/Description';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBillByStatus } from '../../../redux/actions/bill';
import ShowImage from './showImage';

const useStyle = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px'
    }
}));

function BillManagement(props) {
    const state = useSelector(state => state.bill)
    const dispatch = useDispatch();
    const classes = useStyle();
    console.log("state: ", state);

    // const groups = useSelector(state => state.group)

    // STATE ACTIVE
    const [active, setActive] = useState('draft');

    // REF OF POPOVER
    // const anchorRefGroup = useRef(null);

    // ================GROUP STATE=============================
    // const [selectedGroup, setSelectedGroup] = useState("SELECT GROUP");
    // const [selectedGroupId, setSelectedGroupId] = useState();
    // const [openGroup, setOpenGroup] = useState(false);

    // const [filtersGroup, setFiltersGroup] = useState({
    //     pageNumber: 1,
    //     pageSize: 9
    // });
    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 9
    });
    useEffect(() => {
        dispatch(getBillByStatus(0, filters))
    }, [])

    // const handleClickGroupItem = (event, id, name) => {
    //     setSelectedGroup(name)
    //     setSelectedGroupId(id)
    //     const newFilter = {
    //         pageNumber: 1,
    //         pageSize: 9,
    //     }
    //     dispatch(getTradingPostsByGroupId(id, newFilter))
    //     setFiltersGroup(prevFilters => ({
    //         ...prevFilters,
    //         pageNumber: 1
    //     }))
    //     console.log('filtersGroup: ', filtersGroup);
    //     console.log('id: ', id);
    //     setOpenGroup(false);
    // };

    // Hanle selected Group
    // const handleToggleGroup = () => {
    //     setOpenGroup((prevOpen) => !prevOpen);
    //     if (active !== 'group') {
    //         setActive('group');
    //     }
    // };

    // const handleCloseGroup = (event) => {
    //     if (anchorRefGroup.current && anchorRefGroup.current.contains(event.target)) {
    //         return;
    //     }
    //     setOpenGroup(false);
    // };

    // =========================PAGING===============
    const handlePageChange = (e, page) => {
        console.log("page: ", page);
        const newFilter = {
            PageNumber: page,
            PageSize: 9,
        }
        switch (active) {
            case 'draft':
                dispatch(getBillByStatus(0, newFilter));
                break;
            case 'delivery':
                dispatch(getBillByStatus(1, newFilter));
                break;
            case 'closed':
                dispatch(getBillByStatus(2, newFilter));
                break;
            case 'cancle':
                dispatch(getBillByStatus(3, newFilter));
                break;
            default:
                break;
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            PageNumber: page
        }))
    }



    const getDraftBill = () => {
        if (active !== "draft") {
            setActive("draft");
            dispatch(getBillByStatus(0, {
                ...filters,
                PageNumber: 1
            }));
        }
    };

    const getDeliveryBill = () => {
        if (active !== "delivery") {
            setActive("delivery");
            dispatch(getBillByStatus(1, {
                ...filters,
                PageNumber: 1
            }));
        }
    };

    const getClosedBill = () => {
        if (active !== "closed") {
            setActive("closed");
            dispatch(getBillByStatus(2, {
                ...filters,
                PageNumber: 1
            }));
        }
    };
    const getCancleBill = () => {
        if (active !== "cancle") {
            setActive("cancle");
            dispatch(getBillByStatus(3, {
                ...filters,
                PageNumber: 1
            }));
        }
    };

    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>Bill management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="split button">
                    {/* <Button
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
                    </Button> */}
                    <Button
                        onClick={getDraftBill}
                        className={active == "draft" && "active"}
                    >
                        <EventAvailableIcon />
                        <span style={{ marginLeft: "5px" }}>Draft</span>
                    </Button>
                    <Button
                        onClick={getDeliveryBill}
                        className={active == "delivery" && "active"}
                    >
                        <EventBusyIcon />
                        <span style={{ marginLeft: "5px" }}>Delivery</span>
                    </Button>
                    <Button
                        onClick={getClosedBill}
                        className={active == "closed" && "active"}
                    >
                        <EventNoteIcon />
                        <span style={{ marginLeft: "5px" }}>Closed</span>
                    </Button>
                    <Button
                        onClick={getCancleBill}
                        className={active == "cancle" && "active"}
                    >
                        <EventNoteIcon />
                        <span style={{ marginLeft: "5px" }}>Cancled</span>
                    </Button>

                    {/* <Popper
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
                    </Popper> */}
                </ButtonGroup>
                {/* ================================== */}

            </div>

            <div className="card-box">
                <div className="table-responsive">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Sender Name</th>
                                <th>Receiver Name</th>
                                <th>Sender Toy</th>
                                <th>Receiver Toy</th>
                                <th>Post Title</th>
                                <th>Id Post</th>
                                <th>Create Date</th>
                                <th>Image</th>
                                {/* <th className="th-action">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {state.bills && state.bills.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.senderName}</td>
                                    <td>{item.receiverName}</td>
                                    <td>{item.senderToy}</td>
                                    <td>{item.receiverToy}</td>
                                    <td>{item.postTitle}</td>
                                    <td>{item.idPost}</td>
                                    <td>{item.dateCreate}</td>
                                    <td className="td-images" >
                                        <div className="images">
                                            <ShowImage id={item.id} />
                                        </div>
                                    </td>
                                    {/* <td className="td-images">
                                        <div className="images">
                                            {item.images.length > 0 && item.images.map((image, keyImage) => (
                                                <div className="image" key={keyImage}>
                                                    <img src={image.url} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    </td> */}

                                    {/* {
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
                                    } */}
                                </tr>
                            ))}

                            {
                                !state.bills &&
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
                            count={Math.ceil(state.count / filters.PageSize)}
                            color="secondary"
                            page={filters.pageNumber}
                            onChange={handlePageChange}
                        />
                    </Box>
                </div>
            </div>
        </>
    );
}

export default BillManagement;