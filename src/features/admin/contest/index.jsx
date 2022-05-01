import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DiamondIcon from '@mui/icons-material/Diamond';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DoneIcon from '@mui/icons-material/Done';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {
    Avatar, Box, Button,
    ButtonGroup,
    Card,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem, Pagination, Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import * as yup from "yup";
import AdminInputField from "../../../components/form-controls/AdminInputField/AdminInputField";
import eventApi from "./../../../api/eventApi";
import InputDateTimeField from "./../../../components/form-controls/InputDateTimeField/InputDateTimeField";
import MultiInputField from "./../../../components/form-controls/MultiInputField/MultiInputField";
import SelectFormField from "./../../../components/form-controls/SelectField/SelectFormField";
import {
    addPrize, addWinner, approvePost, deleteContest, deletePostOfContest, deleteSubcriber, denyPost, getAllContestABC, getAllSubcribers,
    getBrand,
    getPostOfContest, getPrizesForEnd, getPrizesOfContest,
    getSubmissions,
    getTop10Submissions,
    getType
} from "./../../../redux/actions/contest";
import { getGroups } from "./../../../redux/actions/group";
import { getPrizes } from "./../../../redux/actions/prize";
import formatDate from './../../../utils/formatDate';
import ShowImage from './showImage';

// Style CSS
const useStyle = makeStyles((theme) => ({
    root: {},

    closeBtn: {
        position: "absolute !important",
        bottom: 0,
        right: 0,
        color: "black",
        backgroundColor: "rgba(219, 54, 164, 0.3)",
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px'
    }
}));

function ContestManagement(props) {
    const classes = useStyle();
    const state = useSelector((state) => state.contest);
    const stateGroup = useSelector((state) => state.group);
    const statePrize = useSelector((state) => state.prize);
    // const stateCount = state.count;

    const [openConfirm, setOpenConfirm] = useState(false);
    const [itemClick, setItemClick] = useState({});

    const handleOpenConfirm = (item) => {

        setOpenConfirm(true)
        setItemClick(item)
    }

    const handleDelete = () => {
        dispatch(deleteContest(itemClick.id))
        setOpenConfirm(false)
        setItemClick({})
    }

    // CUT TEXT
    const truncate = (input) => {
        if (input.length > 19) {
            return input.substring(0, 20) + '...';
        } else {
            return input;
        }
    }


    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const control = useForm();
    // STORAGE OF FIREBASE
    const storage = getStorage();

    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 9,
    });
    const [filtersSubmission, setFiltersSubmission] = useState({
        PageNumber: 1,
        PageSize: 99,
    });
    const [filtersContest, setFiltersContest] = useState({
        PageNumber: 1,
        PageSize: 9,
    });

    const handlePageChange = (e, page) => {
        const newFilter = {
            PageNumber: page,
            PageSize: 9,
        }
        switch (active) {
            case 'happening':
                dispatch(getAllContestABC(2, newFilter));
                break;
            case 'closed':
                dispatch(getAllContestABC(1, newFilter));
                break;
            case 'all':
                dispatch(getAllContestABC(0, newFilter));
                break;
            default:
                break;
        }
        setFiltersContest(prevFilters => ({
            ...prevFilters,
            PageNumber: page
        }))
    }

    // GET DATA FROM REDUC
    useEffect(() => {
        dispatch(getAllContestABC(2, filtersContest));
        dispatch(getBrand());
        dispatch(getType());
        dispatch(getGroups());
        dispatch(getPrizes(filters));
    }, []);


    // useEffect(() => {
    //     dispatch(getAllContestABC(2, filtersContest));
    // }, [filtersContest]);

    // SET ACTIVE TO CHANGE SIDE
    const [active, setActive] = useState("happening");

    // STYLED FOR INPUT IMAGE
    const Input = styled("input")({
        display: "none",
    });

    // STATE FOR SELECTION
    const [selected, setSelected] = useState(false);

    // STATE OF INPUTIMAGE
    const [inputImage, setInputImage] = useState([]);

    // STATE FOR OBJ IMG TO PUSH FIREBASE
    const [strgImg, setStrgImg] = useState([]);
    // INPUT REF
    const inputRef = React.useRef();

    // STATE TO OPEN CREATE DIALOG
    const [open, setOpen] = useState(false);
    // STATE TO OPEN ADD PRIZE DIALOG
    const [openPrize, setOpenPrize] = useState(false);
    // STATE TO OPEN ADD PRIZE DIALOG
    const [openSubcribers, setOpenSubcribers] = useState(false);
    // STATE TO OPEN ADD PRIZE DIALOG
    const [openWinners, setOpenWinners] = useState(false);
    // STATE TO OPEN ADD PRIZE DIALOG
    const [openWaitingSubmissions, setOpenWaitingSubmissions] = useState(false);
    // STATE TO OPEN ADD PRIZE DIALOG
    const [openAllSubmissions, setOpenAllSubmissions] = useState(false);

    // STATE SET FULLWIDTH FOR DIALOG
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("md");

    // STATE  SELECTED OBJECT IN DATAGRID
    const [itemSelected, setItemSelected] = useState({});

    // STATE LIST SELECTION OF PRIZE IN DATAGRID
    const [selectionModel, setSelectionModel] = useState([]);

    // ========== HANDLE DATAGRID=============================
    // DECLARE COLUMN IN DATAGRID FOR PRIZE
    const columns = [
        { field: "name", headerName: "Name", width: 160 },
        { field: "description", headerName: "Description", width: 180 },
        { field: "value", headerName: "Value", width: 250 },
    ];

    // DECLARE ROW IN DATAGRID
    const rows = statePrize.prizes;

    // STATE COLUMN AND ROW FOR DATAGRID
    const [row, setRow] = useState(rows);
    const [column, setColumn] = useState(columns);

    // CALLBACK TO SET DATA GRID
    useEffect(() => {
        setRow(statePrize.prizes);
    }, [itemSelected]);



    // ========== HANDLE DATAGRID FOR WINNER=============================
    // STATE  SELECTED OBJECT IN DATAGRID
    const [prizeSelected, setPrizeSelected] = useState({});

    // STATE LIST SELECTION OF PRIZE IN DATAGRID
    const [selectionPrize, setSelectionPrize] = useState([]);
    const columnsPrize = [
        { field: "name", headerName: "Prize Name", width: 160 },
        { field: "description", headerName: "Description", width: 180 },
        { field: "value", headerName: "Value", width: 250 },
    ];
    const rowsPrize = state.prizeForEnd;
    const [columnPrize, setColumnPrize] = useState(columnsPrize);
    const [rowPrize, setRowPrize] = useState(rowsPrize);


    // STATE  SELECTED OBJECT IN DATAGRID
    const [winnerSelected, setWinnerSelected] = useState({});
    const [selectionWinner, setSelectionWinner] = useState([]);
    const columnsWinner = [
        { field: "ownerName", headerName: "Runner Name", width: 160 },
        // { field: "images", headerName: "Post", width: 250 },
        { field: "content", headerName: "Content", width: 250 },
        { field: "averageStar", headerName: "Point", width: 180 },
    ];
    const rowsWinner = state.top10Submissions;
    const [columnWinner, setColumnWinner] = useState(columnsWinner);
    const [rowWinner, setRowWinner] = useState(rowsWinner);

    useEffect(() => {
        setRowPrize(state.prizeForEnd);
        setRowWinner(state.top10Submissions);
    });

    const handleAddWinner = () => {

        try {
            const newAddWinner = {
                postOfContestId: selectionWinner[0],
                prizeId: selectionPrize[0]
            }
            dispatch(addWinner(newAddWinner, itemSelected.id));
        } catch (errorr) {
            console.log("error: ", errorr);
        }

    }
    // ==========GET DATA WHEN ONCLICK CHANGE HEADER SIDE==============

    const getHappeningContest = () => {
        if (active !== "happening") {
            setActive("happening");
            dispatch(getAllContestABC(2, {
                ...filtersContest,
                PageNumber: 1
            }));
        }
    };

    const getClosedContest = () => {
        if (active !== "closed") {
            setActive("closed");
            dispatch(getAllContestABC(1, {
                ...filtersContest,
                PageNumber: 1
            }));
        }
    };

    const getAllContest = () => {
        if (active !== "all") {
            setActive("all");
            dispatch(getAllContestABC(0, {
                ...filtersContest,
                PageNumber: 1
            }));
        }
    };

    useEffect(() => {
        setFiltersContest(prevFilters => ({
            ...prevFilters,
            PageNumber: 1
        }))
    }, [active]);
    // ========HANDLE DIALOG==============

    // HANDLE OPEN CREATE DIALOG
    const handleClickOpen = () => {
        if (!open) {
            setOpen(true);
        }
    };
    // HANDLE OPEN ADD PRIZE DIALOG
    const handleClickOpenPrize = (item) => {
        setItemSelected(item);
        setOpenPrize(true);
    };

    useEffect(async () => {
        dispatch(getPrizesOfContest(itemSelected.id))
        dispatch(getPrizesForEnd(itemSelected.id))
    }, [itemSelected])

    // HANDLE OPEN ADD PRIZE DIALOG
    const handleClickOpenSubcribers = (item) => {
        setItemSelected(item);
        setOpenSubcribers(true);
        dispatch(getAllSubcribers(item.id));
    };

    // HANDLE OPEN ADD PRIZE DIALOG
    const handleClickOpenWinners = (item) => {
        setItemSelected(item);
        setOpenWinners(true);
        // Get top 10
        dispatch(getPrizesForEnd(item.id))
        dispatch(getTop10Submissions(item.id));
    };
    // HANDLE OPEN ADD PRIZE DIALOG
    const handleClickOpenWaitingSubmissions = (item) => {
        setItemSelected(item);
        setOpenWaitingSubmissions(true);
        dispatch(getSubmissions(item.id, filtersSubmission))
    };
    // HANDLE OPEN ADD PRIZE DIALOG
    const handleClickOpenAllSubmissions = (item) => {
        setItemSelected(item);
        setOpenAllSubmissions(true);
        dispatch(getPostOfContest(item.id, filtersSubmission))
    };
    // HANDLE CLOSE ALL DIALOG AND CLEAR IMAGE
    const handleClose = () => {
        setOpen(false);
        setOpenPrize(false);
        setOpenWinners(false);
        setOpenSubcribers(false);
        setOpenWaitingSubmissions(false);
        setSelectionPrize([]);
        setSelectionWinner([]);
        setOpenAllSubmissions(false);
        setInputImage([]);
        setSelectionModel([]);
        setOpenConfirm(false)
    };
    // ========HANDLE IMAGE================

    // HANDLE CHOOSE IMAGE
    const handleChoose = (event) => {
        inputRef.current.click();
    };

    // HANDLE DELETE IMAGE
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    };

    // HANDLE DISPLAY CHOOSED IMAGE
    const handleFileChange = (event) => {
        let storageImage = [];
        let image = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (
                event.target.files[i].type === "image/png" ||
                event.target.files[i].type === "image/jpeg" ||
                event.target.files[i].type === "image/jpg" ||
                event.target.files[i].type === "image/gif"
            ) {
                image.push(URL.createObjectURL(event.target.files[i]));
                storageImage.push(event.target.files[i]);
            }
        }
        setStrgImg(storageImage);
        setInputImage(image);
    };

    // ====================HANDLE FORM

    // VALIDATE FORM
    const schema = yup.object().shape({
        title: yup.string().required('Please enter your Title.'),
        description: yup.string().required('Please enter description.'),
        rule: yup.string().required('Please enter description.'),
        slogan: yup.string().required('Please enter description.'),
        startRegistration: yup.string().required('Please select start registration date.'),
        endRegistration: yup.string().required('Please enter end registration date.'),
        startDate: yup.string().required('Please enter start date.'),
        endDate: yup.string().required('Please enter end date.'),
    });

    // HANDLE INITIAL FORM
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            rule: "",
            slogan: "",
            startRegistration: "",
            endRegistration: "",
            startDate: "",
            endDate: "",
        },
        resolver: yupResolver(schema),
    });

    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    const imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        for (let i = 0; i < strgImg.length; i++) {
            const storageRef = ref(storage, `/Contest/${strgImg[i].name}`);
            await uploadBytes(storageRef, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRef)
                .then((url) => {
                    imagesLink.push(url);
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        }
    };

    // HANLDE SUBMIT CREATE CONTEST
    const handleSubmitContest = async (values) => {
        await uploadAndGetLinkImg();
        try {
            const newContest = {
                title: values.title,
                description: values.description,
                rule: values.rule,
                slogan: values.slogan,
                startRegistration: values.startRegistration,
                endRegistration: values.endRegistration,
                startDate: values.startDate,
                endDate: values.endDate,
                typeName: "",
                coverImage: imagesLink[0],
            };
            const response = await eventApi.createNewEvent(
                values.group,
                newContest
            );
            await Swal.fire(
                'New contest successfully',
                'Click button to continute!',
                'success'
            )
            dispatch(getAllContestABC(2, {
                ...filtersContest,
                PageNumber: 1
            }));
            // enqueueSnackbar("New Post successfully!!", { variant: "success" });
        } catch (error) {
            console.log("Failed create new post: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something go wrong",
            })
            // enqueueSnackbar("Failed to New Post !!", { variant: "error" });
        }
        setStrgImg([]);
        form.reset();
    };

    const { isSubmitting } = form.formState;

    // HANDLE SUBMIT ADD PRIZE TO CONTEST
    const handleAddPrize = async () => {
        dispatch(addPrize(itemSelected.id, selectionModel));
        setOpenPrize(false);
        setSelectionModel([]);
    };


    return (
        <>
            <div className="title-page">
                <EmojiEventsIcon />
                <span>Contest management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button
                        onClick={getHappeningContest}
                        className={active == "happening" && "active"}
                    >
                        <EventAvailableIcon />
                        <span style={{ marginLeft: "5px" }}>Happening</span>
                    </Button>
                    <Button
                        onClick={getClosedContest}
                        className={active == "closed" && "active"}
                    >
                        <EventBusyIcon />
                        <span style={{ marginLeft: "5px" }}>Closed</span>
                    </Button>
                    <Button
                        onClick={getAllContest}
                        className={active == "all" && "active"}
                    >
                        <EventNoteIcon />
                        <span style={{ marginLeft: "5px" }}>All</span>
                    </Button>
                </ButtonGroup>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button onClick={handleClickOpen} className="active">
                        <InsertInvitationIcon />
                        <span style={{ marginLeft: "5px" }}>
                            Create new contest
                        </span>
                    </Button>
                </ButtonGroup>
            </div>

            <div className="card-box">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>title</th>
                                <th>Slogan</th>
                                <th>Start Registration Date</th>
                                <th>End Registration Date</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                {active === "happening" ||
                                    active === "closed" ? (
                                    <th className="th-action">Action</th>
                                ) : (
                                    <th></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {state.contests &&
                                state.contests.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{truncate(item.title)}</td>
                                        <td>{truncate(item.slogan)}</td>
                                        <td>{formatDate(item?.startRegistration)}</td>
                                        <td>{formatDate(item?.endRegistration)}</td>
                                        <td>{formatDate(item?.startDate)}</td>
                                        <td>{formatDate(item?.endDate)}</td>


                                        {/* <td>{item.location}</td>
                                    <td>{item.maxRegister}</td> */}

                                        {active === "happening" && (
                                            <td>
                                                <button
                                                    className="btn btn-add"
                                                    onClick={() => handleClickOpenPrize(item)}
                                                >
                                                    <Tooltip title="Add Prize To Contest">
                                                        <EmojiEventsIcon />
                                                    </Tooltip>
                                                </button>
                                                <button className="btn btn-see">
                                                    <Tooltip
                                                        title="See subcribers"
                                                        onClick={() => handleClickOpenSubcribers(item)}
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </Tooltip>
                                                </button>

                                                <button className="btn btn-see">
                                                    <Tooltip
                                                        title="Get Waiting Submissons"
                                                        onClick={() => handleClickOpenWaitingSubmissions(item)}
                                                    >
                                                        <TurnedInIcon />
                                                    </Tooltip>
                                                </button>
                                                <button className="btn btn-see">
                                                    <Tooltip
                                                        title="Get All Submission"
                                                        onClick={() => handleClickOpenAllSubmissions(item)}
                                                    >
                                                        <DynamicFeedIcon />
                                                    </Tooltip>
                                                </button>
                                                <button className="btn btn-deny">
                                                    <Tooltip
                                                        title="Delete"
                                                        onClick={() => handleOpenConfirm(item)}
                                                    >
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </button>
                                            </td>
                                        )}
                                        {active === "closed" && (
                                            <td>
                                                <button className="btn btn-see">
                                                    <Tooltip
                                                        title="See subcribers"
                                                        onClick={() => handleClickOpenSubcribers(item)}
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </Tooltip>
                                                </button>
                                                <button className="btn btn-see">
                                                    <Tooltip
                                                        title="Award"
                                                        onClick={() => handleClickOpenWinners(item)}
                                                    >
                                                        <DiamondIcon />
                                                    </Tooltip>
                                                </button>

                                                <button className="btn btn-see">
                                                    <Tooltip
                                                        title="Get All Submission"
                                                        onClick={() => handleClickOpenAllSubmissions(item)}
                                                    >
                                                        <DynamicFeedIcon />
                                                    </Tooltip>
                                                </button>
                                                <button className="btn btn-deny">
                                                    <Tooltip
                                                        title="Delete"
                                                        onClick={() => handleOpenConfirm(item)}
                                                    >
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            {!state.contests && (
                                <tr>
                                    <td
                                        colSpan={
                                            active === "happening" ? "7" : "6"
                                        }
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Box className={classes.pagination}>
                        <Pagination
                            count={Math.ceil(state.count / filtersContest.PageSize)}
                            color="secondary"
                            page={filtersContest.PageNumber}
                            onChange={handlePageChange}
                        />
                    </Box>
                </div>
            </div>

            {/* DIALOG HANDLE SUBCRIBERS */}
            <Dialog
                open={openSubcribers}
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
                    List Subcribers of {itemSelected.title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px" }}>
                    <div className="card-box">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th className="th-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.subcribers &&
                                        state.subcribers.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>
                                                    <div className="avatar">
                                                        <img
                                                            src={item.avatar}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-delete"
                                                        onClick={() =>
                                                            dispatch(
                                                                deleteSubcriber(
                                                                    itemSelected.id,
                                                                    item.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Tooltip title="Delete">
                                                            <DeleteIcon />
                                                        </Tooltip>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    {!state.contests && (
                                        <tr>
                                            <td
                                                colSpan={
                                                    active === "happening"
                                                        ? "7"
                                                        : "6"
                                                }
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <CircularProgress />
                                                </Box>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button className={classes.btn} onClick={handleAddPrize} >Add</Button> */}
                </DialogActions>
            </Dialog>



            {/* TOP 10 */}
            <Dialog
                open={openWinners}
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
                    Add Winner to {itemSelected.title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px" }}>
                    <FormControl sx={{ mt: 1, height: "500px" }} fullWidth>
                        <DataGrid
                            // checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelectionPrize(newSelectionModel);
                            }}
                            selectionModel={selectionPrize}
                            rows={rowPrize}
                            columns={columnPrize}
                            pageSize={5}
                        />
                    </FormControl>
                </DialogContent>
                <DialogContent sx={{ marginTop: "10px" }}>
                    <FormControl sx={{ mt: 1, height: "500px" }} fullWidth>
                        <DataGrid
                            // checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelectionWinner(newSelectionModel);
                            }}
                            selectionModel={selectionWinner}
                            rows={rowWinner}
                            columns={columnWinner}
                            pageSize={10}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddWinner}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DIALOG ADD PRIZE */}
            <Dialog
                open={openPrize}
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                {/* TEXTFIELD TO FILL STATUS */}
                {/* DIALOG'S TITLE */}
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        borderBottom: "1px solid #d3d3d3",
                    }}
                >
                    Add Prize to {itemSelected.title}
                </DialogTitle>

                <DialogContent sx={{ marginTop: "10px" }}>
                    {
                        state.prizesContest && <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.prizesContest?.map((item, index) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }

                </DialogContent>

                <DialogContent sx={{ marginTop: "10px" }}>
                    <FormControl sx={{ mt: 1, height: "500px" }} fullWidth>
                        <DataGrid
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelectionModel(newSelectionModel);
                            }}
                            selectionModel={selectionModel}
                            rows={row}
                            columns={column}
                            pageSize={5}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className={classes.btn} onClick={handleAddPrize}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DIALOG  TO CREATEA CONTEST */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                {/* TEXTFIELD TO FILL STATUS */}
                <form onSubmit={form.handleSubmit(handleSubmitContest)}>
                    {/* DIALOG'S TITLE */}
                    <DialogTitle
                        sx={{
                            textAlign: "center",
                            borderBottom: "1px solid #d3d3d3",
                        }}
                    >
                        Create A Contest
                    </DialogTitle>
                    <DialogContent sx={{ marginTop: "10px" }}>
                        {/* AVATAR */}

                        <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="select-role">
                                Select Group
                            </InputLabel>
                            <SelectFormField
                                labelId="select-group"
                                id="group"
                                name="group"
                                label="group"
                                control={control}
                                defaultValue="1"
                                variant="outlined"
                                margin="normal"
                                form={form}
                            >
                                {stateGroup.groups?.map((group, index) => (
                                    <MenuItem
                                        key={index}
                                        value={group.id}
                                        selected={selected}
                                    >
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </SelectFormField>
                        </FormControl>

                        <AdminInputField
                            name="title"
                            label="Title"
                            form={form}
                        />
                        <MultiInputField
                            name="description"
                            label="Description"
                            form={form}
                        />
                        <MultiInputField name="rule" label="Rule" form={form} />
                        <AdminInputField name="slogan" label="Slogan" form={form} />
                        <div>
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="startRegistration" label="Start Registration Time" form={form} />
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="endRegistration" label="End Registration Time" form={form} />
                        </div>
                        <div>
                            {/* Date time picker */}
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="startDate" label="Start date" form={form} />
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="endDate" label="End date" form={form} />
                        </div>
                        {/* <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="select-role">Type</InputLabel>
                            <SelectFormField labelId="select-type" id="type" name="type" label="Type" control={control} defaultValue="none" variant="outlined" margin="normal" form={form}>
                                {state.types?.map((type, index) => (
                                    <MenuItem
                                        key={index}
                                        value={type}
                                        selected={selected}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </SelectFormField>
                        </FormControl> */}

                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                            <Button variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />} >Photo</Button>
                        </label>

                        {inputImage.length ? (
                            <Card
                                variant="outlined"
                                sx={{
                                    padding: "10px",
                                    marginTop: 2,
                                    position: "relative",
                                }}
                            >
                                <ImageList variant="masonry" cols={3} gap={8}>
                                    {inputImage.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <ImageListItem key={index}>
                                                <img
                                                    src={image}
                                                    alt={"image"}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        </div>
                                    ))}
                                </ImageList>
                                <IconButton
                                    className={classes.closeBtn}
                                    onClick={handleDeleteSelectedSource}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Card>
                        ) : (
                            <></>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button color="inherit" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={isSubmitting} className={classes.btn} type="submit">
                            Create
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>


            {/* DIALOG HANDLE WAITING SUBMISSIONS */}
            <Dialog
                open={openWaitingSubmissions}
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
                    List Submissions of {itemSelected.title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px" }}>
                    <div className="card-box">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Owner Name</th>
                                        <th>Avatar</th>
                                        <th>Content</th>
                                        <th>Image</th>
                                        <th>Created At</th>
                                        <th className="th-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.submissions.data && state.submissions.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.ownerName}</td>
                                            <td>
                                                <div className="avatar">
                                                    <Avatar src={item.ownerAvatar} alt="avatar" sx={{ position: 'static !important' }}></Avatar>
                                                </div>

                                            </td>
                                            <td>
                                                <div>{item.content}</div>
                                            </td>
                                            <td className="td-images" >
                                                <div className="images">
                                                    <ShowImage images={item.images} />
                                                </div>
                                            </td>
                                            <td>{formatDate(item.dateCreate)}</td>
                                            <td>
                                                <a className="btn btn-edit" onClick={() => dispatch(approvePost(item.id, itemSelected.id, filtersSubmission))}>
                                                    <Tooltip title="Approve">
                                                        <DoneIcon />
                                                    </Tooltip>
                                                </a>
                                                <button className="btn btn-deny" onClick={() => dispatch(denyPost(item.id, itemSelected.id, filtersSubmission))}>
                                                    <Tooltip title="Deny">
                                                        <DoDisturbIcon />
                                                    </Tooltip>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {
                                        !state.submissions.data &&
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
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button className={classes.btn} onClick={handleAddPrize} >Add</Button> */}
                </DialogActions>
            </Dialog>

            {/* DIALOG HANDLE ALL SUBMISSIONS */}
            <Dialog
                open={openAllSubmissions}
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
                    List Post of {itemSelected.title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px" }}>
                    <div className="card-box">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Owner Name</th>
                                        <th>Avatar</th>
                                        <th>Content</th>
                                        <th>Image</th>
                                        {/* <th>Created At</th> */}
                                        <th className="th-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.postOfContest.data && state.postOfContest.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.ownerName}</td>
                                            <td>
                                                <div className="avatar">
                                                    <Avatar src={item.ownerAvatar} alt="avatar" sx={{ position: 'static !important' }}></Avatar>
                                                </div>


                                            </td>
                                            <td>
                                                <div>{item.content}</div>
                                            </td>
                                            <td className="td-images" >
                                                <div className="images">
                                                    <ShowImage images={item.images} />
                                                </div>
                                            </td>
                                            {/* <td>{formatDate(item.dateCreate)}</td> */}
                                            <td>
                                                <button className="btn btn-deny" onClick={() => dispatch(deletePostOfContest(item.id, itemSelected.id, filtersSubmission))}>
                                                    <Tooltip title="Delete">
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {
                                        !state.postOfContest.data &&
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
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button className={classes.btn} onClick={handleAddPrize} >Add</Button> */}
                </DialogActions>
            </Dialog>


            <Dialog
                open={openConfirm}
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
                    Are you sure to delete {itemClick.title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Box >
                        {/* <ShowImage images={itemClick.coverImage} /> */}
                        <img width="100%" src={itemClick.coverImage} alt="" />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ContestManagement;
