import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback } from './../../../redux/actions/feedback';


const useStyle = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px'
    }
}));


FeedbackManagement.propTypes = {

};

function FeedbackManagement(props) {

    const state = useSelector(state => state.feedback)
    const dispatch = useDispatch();
    const classes = useStyle();
    console.log("state: ", state);


    useEffect(() => {
        dispatch(getFeedback(filters))
    }, [])

    const typeFeedback = [
        {
            id: 0,
            name: 'POST'
        },
        {
            id: 1,
            name: 'TRADING'
        },
        {
            id: 2,
            name: 'ACCOUNT'
        },
    ];

    // STATE ACTIVE
    const [active, setActive] = useState('draft');

    const stateCount = state.count;

    // REF OF POPOVER
    const anchorRefNonReplyYet = useRef(null);
    const anchorRefReplyYet = useRef(null);


    // ================NonReply STATE=============================
    const [selectedNonReply, setSelectedNonReply] = useState("SELECT TYPE NON");
    const [selectedNonReplyId, setSelectedNonReplyId] = useState();
    const [openNonReply, setOpenNonReply] = useState(false);

    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 9
    });

    const handleClickNonReplyItem = (event, id, name) => {
        setSelectedNonReply(name)
        setSelectedNonReplyId(id)
        const newFilter = {
            PageNumber: 1,
            PageSize: 9,
        }
        // dispatch(getTradingPostsByGroupId(id, newFilter))
        setFilters(prevFilters => ({
            ...prevFilters,
            PageNumber: 1
        }))
        setOpenNonReply(false);
    };

    // Hanle selected Group
    const handleToggleNonReply = () => {
        setOpenNonReply((prevOpen) => !prevOpen);
        if (active !== 'nonReply') {
            setActive('nonReply');
        }
    };
    const handleCloseNonReply = (event) => {
        if (anchorRefNonReplyYet.current && anchorRefNonReplyYet.current.contains(event.target)) {
            return;
        }
        setOpenNonReply(false);
    };
    // ================Reply STATE=============================
    const [selectedReply, setSelectedReply] = useState("SELECT TYPE ");
    const [selectedReplyId, setSelectedReplyId] = useState();
    const [openReply, setOpenReply] = useState(false);

    const handleClickReplyItem = (event, id, name) => {
        setSelectedReply(name)
        setSelectedReplyId(id)
        const newFilter = {
            PageNumber: 1,
            PageSize: 9,
        }
        // dispatch(getTradingPostsByGroupId(id, newFilter))
        setFilters(prevFilters => ({
            ...prevFilters,
            PageNumber: 1
        }))
        setOpenReply(false);
    };

    // Hanle selected Group
    const handleToggleReply = () => {
        setOpenReply((prevOpen) => !prevOpen);
        if (active !== 'reply') {
            setActive('reply');
        }
    };
    const handleCloseReply = (event) => {
        if (anchorRefReplyYet.current && anchorRefReplyYet.current.contains(event.target)) {
            return;
        }
        setOpenReply(false);
    };

    const handlePageChange = (e, page) => {
        console.log("page: ", page);
        // const newFilter = {
        //     PageNumber: page,
        //     PageSize: 9,
        // }
        // switch (active) {
        //     case 'draft':
        //         dispatch(getBillByStatus(0, newFilter));
        //         break;
        //     case 'delivery':
        //         dispatch(getBillByStatus(1, newFilter));
        //         break;
        //     case 'closed':
        //         dispatch(getBillByStatus(2, newFilter));
        //         break;
        //     case 'cancle':
        //         dispatch(getBillByStatus(3, newFilter));
        //         break;
        //     default:
        //         break;
        // }
        // setFilters(prevFilters => ({
        //     ...prevFilters,
        //     PageNumber: page
        // }))
    }



    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>Feedback management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="split button">
                    <Button
                        ref={anchorRefNonReplyYet}
                        className={active == 'nonReply' && 'active'}
                        size="small"
                        aria-controls={openNonReply ? 'split-button-group' : undefined}
                        aria-expanded={openNonReply ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="nonReply"
                        onClick={handleToggleNonReply}
                    >
                        <GroupIcon /> <span style={{ marginLeft: '5px' }}>{selectedNonReply}</span>  <ArrowDropDownIcon />
                    </Button>

                    {/* ================================================ */}
                    <Button
                        ref={anchorRefReplyYet}
                        className={active == 'reply' && 'active'}
                        size="small"
                        aria-controls={openReply ? 'split-button-group' : undefined}
                        aria-expanded={openReply ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="reply"
                        onClick={handleToggleReply}
                    >
                        <GroupIcon /> <span style={{ marginLeft: '5px' }}>{selectedReply}</span>  <ArrowDropDownIcon />
                    </Button>

                    <Popper
                        open={openNonReply}
                        anchorEl={anchorRefNonReplyYet.current}
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
                                    <ClickAwayListener onClickAway={handleCloseNonReply}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {typeFeedback.map((type, index) => (
                                                <MenuItem
                                                    key={index}
                                                    // selected={index === selectedIndex}
                                                    onClick={(event) => handleClickNonReplyItem(event, type.id, type.name)}
                                                >
                                                    {type.name}
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
                        open={openReply}
                        anchorEl={anchorRefReplyYet.current}
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
                                    <ClickAwayListener onClickAway={handleCloseReply}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {typeFeedback.map((type, index) => (
                                                <MenuItem
                                                    key={index}
                                                    // selected={index === selectedIndex}
                                                    onClick={(event) => handleClickReplyItem(event, type.id, type.name)}
                                                >
                                                    {type.name}
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
                                <th>Sender Name</th>
                                <th>Receiver Name</th>
                                <th>Sender Toy</th>
                                <th>Receiver Toy</th>
                                <th>Post Title</th>
                                <th>Id Post</th>
                                {/* <th className="th-action">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {state.feedbacks && state.feedbacks.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.senderName}</td>
                                    <td>
                                        <div className="avatar">
                                            <Avatar src={item.senderAvatar} alt="avatar" sx={{ position: 'static !important' }}></Avatar>
                                        </div>
                                    </td>
                                    <td>{item.content}</td>
                                    <td>{item.feedbackAbout}</td>
                                    <td>{item.idForDetail}</td>
                                    <td>{item.sendDate}</td>
                                    {/* <td>{item.dateCreate}</td> */}
                                    {/* <td className="td-images" >
                                        <div className="images">
                                            <ShowImage images={item.images} />
                                        </div>
                                    </td> */}
                                </tr>
                            ))}

                            {
                                !state.feedbacks &&
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

export default FeedbackManagement;