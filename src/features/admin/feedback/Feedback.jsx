import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import feedbackApi from './../../../api/feedbackApi';
import MultiInputField from './../../../components/form-controls/MultiInputField/MultiInputField';
import { getFeedbackAccount, getFeedbackContest, getFeedbackPost, getFeedbackTradingPost, getRepliedback } from './../../../redux/actions/feedback';
import formatDate from './../../../utils/formatDate';

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

    const form = useForm({
        defaultValues: {
            reply: "",
        },
    });

    const [openReply, setOpenReply] = useState(false);
    const [feedbackItem, setFeedbackItem] = useState({});
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("md");
    const handleOpenReply = (feedback) => {
        setOpenReply(true)
        setFeedbackItem(feedback)
    }

    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 9
    });

    useEffect(() => {
        dispatch(getFeedbackAccount(filters))
    }, [])



    // STATE ACTIVE
    const [active, setActive] = useState('account');

    const stateCount = state.count;

    // ================NonReply STATE=============================


    // ==========GET DATA WHEN ONCLICK CHANGE HEADER SIDE==============

    const getAccountFeedback = () => {
        if (active !== "account") {
            setActive("account");
            dispatch(getFeedbackAccount({
                ...filters,
                PageNumber: 1
            }));
        }
    };

    const getTradingPostFeedback = () => {
        if (active !== "trading") {
            setActive("trading");
            dispatch(getFeedbackTradingPost({
                ...filters,
                PageNumber: 1
            }));
        }
    };

    const getPostFeedback = () => {
        if (active !== "post") {
            setActive("post");
            dispatch(getFeedbackPost({
                ...filters,
                PageNumber: 1
            }));
        }
    };
    const getContestFeedback = () => {
        if (active !== "contest") {
            setActive("contest");
            dispatch(getFeedbackContest({
                ...filters,
                PageNumber: 1
            }));
        }
    };
    const getRepliedFeedback = () => {
        if (active !== "replied") {
            setActive("replied");
            dispatch(getRepliedback({
                ...filters,
                PageNumber: 1
            }));
        }
    };

    // useEffect(() => {
    //     setFiltersContest(prevFilters => ({
    //         ...prevFilters,
    //         PageNumber: 1
    //     }))
    // }, [active]);
    const handlePageChange = (e, page) => {
        const newFilter = {
            PageNumber: page,
            PageSize: 9,
        }
        switch (active) {
            case 'account':
                dispatch(getFeedbackAccount(newFilter));
                break;
            case 'trading':
                dispatch(getFeedbackTradingPost(newFilter));
                break;
            case 'post':
                dispatch(getFeedbackPost(newFilter));
                break;
            case 'contest':
                dispatch(getFeedbackContest(newFilter));
                break;
            case 'replied':
                dispatch(getRepliedback(newFilter));
                break;
            default:
                break;
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            PageNumber: page
        }))
    }

    const handleSubmitReply = async (values) => {
        try {
            await feedbackApi.reply(feedbackItem.id, values.reply)
            await Swal.fire(
                'Reply Successfully',
                'Click Button to continute!',
                'success'
            )
            setOpenReply(false)
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something go wrong",
            })
        }
        setOpenReply(false)
    }


    const handleClose = () => {
        setOpenReply(false);
        setFeedbackItem({})
    }
    const { isSubmitting } = form.formState;
    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>Feedback management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button
                        onClick={getAccountFeedback}
                        className={active == "account" && "active"}
                    >
                        <EventAvailableIcon />
                        <span style={{ marginLeft: "5px" }}>account</span>
                    </Button>
                    <Button
                        onClick={getTradingPostFeedback}
                        className={active == "trading" && "active"}
                    >
                        <EventBusyIcon />
                        <span style={{ marginLeft: "5px" }}>trading post</span>
                    </Button>
                    <Button
                        onClick={getPostFeedback}
                        className={active == "post" && "active"}
                    >
                        <EventNoteIcon />
                        <span style={{ marginLeft: "5px" }}>post</span>
                    </Button>
                    <Button
                        onClick={getContestFeedback}
                        className={active == "contest" && "active"}
                    >
                        <EventNoteIcon />
                        <span style={{ marginLeft: "5px" }}>contest</span>
                    </Button>
                    <Button
                        onClick={getRepliedFeedback}
                        className={active == "replied" && "active"}
                    >
                        <EventNoteIcon />
                        <span style={{ marginLeft: "5px" }}>Replied</span>
                    </Button>
                </ButtonGroup>
                {/* <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button onClick={handleClickOpen} className="active">
                        <InsertInvitationIcon />
                        <span style={{ marginLeft: "5px" }}>
                            Create new contest
                        </span>
                    </Button>
                </ButtonGroup> */}
                {/* ================================== */}

            </div>

            <div className="card-box">
                <div className="table-responsive">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Sender Name</th>
                                <th>Avatar</th>
                                <th>Content</th>
                                <th>Feedback about</th>
                                <th>Id detail</th>
                                <th>Create date</th>
                                {active != "replied" &&
                                    <th className="th-action">Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {state.feedbacks && state.feedbacks.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.senderName}</td>
                                    <td>
                                        <div className="avatar">
                                            <Avatar src={item.senderAvatar} alt="avatar" sx={{ position: 'static !important' }}></Avatar>
                                        </div>
                                    </td>
                                    <td>{item.content}</td>
                                    <td>{item.feedbackAbout}</td>
                                    <td>{item.idForDetail}</td>
                                    <td>{formatDate(item.sendDate)}</td>
                                    {/* <td>{item.dateCreate}</td> */}
                                    {/* <td className="td-images" >
                                        <div className="images">
                                            <ShowImage images={item.images} />
                                        </div>
                                    </td> */}
                                    {active != "replied" &&
                                        <td>
                                            <button
                                                className="btn btn-add"
                                                onClick={() => handleOpenReply(item)}
                                            >
                                                <Tooltip title="Reply">
                                                    <EditIcon />
                                                </Tooltip>
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}

                            {
                                !state.feedbacks &&
                                <tr>
                                    <td colSpan={active === 'account' ? "7" : "6"}>
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

            <Dialog
                open={openReply}
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        borderBottom: "1px solid #d3d3d3",
                    }}
                >
                    Reply to {feedbackItem.senderName}
                </DialogTitle>
                <form onSubmit={form.handleSubmit(handleSubmitReply)}>
                    <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', }}>
                        <Avatar src={feedbackItem.senderAvatar} alt="avatar" sx={{ position: 'static !important', mr: 2 }}></Avatar>
                        <Typography>

                            Content: {feedbackItem.content}
                        </Typography>
                    </DialogContent>
                    <DialogContent sx={{ marginTop: "10px" }}>

                        <MultiInputField name="reply" label="Reply" form={form} />

                    </DialogContent>

                    <DialogActions>
                        <Button color="inherit" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={isSubmitting} type="submit" >
                            Send
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default FeedbackManagement;