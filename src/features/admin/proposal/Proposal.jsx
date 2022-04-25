import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DoneIcon from '@mui/icons-material/Done';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PendingIcon from '@mui/icons-material/Pending';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from '@mui/icons-material/Add';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import { TextField } from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from './../../../redux/actions/group';
import formatDate from './../../../utils/formatDate';
import { disableProposal, getAllProposals } from './../../../redux/actions/proposal';
import CreateContestForm from './CreateContestForm';


ProposalManagement.propTypes = {

};

function ProposalManagement(props) {

    const state = useSelector(state => state.proposal)
    const dispatch = useDispatch();


    const [openConfirm, setOpenConfirm] = useState(false);

    const [itemClick, setItemClick] = useState(false);

    const handleOpenConfirm = (item) => {
        setOpenConfirm(true);
        setItemClick(item)
    }

    const handleConfirm = () => {
        dispatch(disableProposal(itemClick.id))
        setOpenConfirm(false);
    }

    // STATE SET FULLWIDTH FOR DIALOG
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("md");

    // SET ACTIVE TO CHANGE SIDE
    const [active, setActive] = useState("happening");
    // STATE  SELECTED OBJECT IN DATAGRID
    const [itemSelected, setItemSelected] = useState({});

    // CUT TEXT
    const truncate = (input) => {
        if (input.length > 50) {
            return input.substring(0, 80) + '...';
        } else {
            return input;
        }
    }

    useEffect(() => {
        dispatch(getAllProposals())
    }, [])


    const [openDetail, setOpenDetail] = useState(false)

    // HANDLE OPEN ADD PRIZE DIALOG
    const handleClickOpenDetail = (item) => {
        setItemSelected(item);
        setOpenDetail(true);
    };

    const handleClose = () => {
        // setItemSelected(item);
        setOpenDetail(false);
        setOpenConfirm(false);
    };


    return (
        <>
            <div className="title-page">
                <DescriptionIcon />
                <span>Proposal management</span>
            </div>

            <div className="card-box">
                <div className="table-responsive">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Avatar</th>
                                <th>title</th>
                                <th>description</th>
                                <th>reason</th>
                                <th>rule</th>
                                <th>slogan</th>
                                <th className="th-action">action</th>
                                {/* {active === 'waiting' &&
                                    <th className="th-action">Action</th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {state.proposals && state.proposals.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.ownerName}</td>
                                    <td>
                                        <div className="avatar">
                                            <Avatar src={item.ownerAvatar} alt="avatar" sx={{ position: 'static !important' }}></Avatar>
                                        </div>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{truncate(item.description)}</td>
                                    <td>{truncate(item.reason)}</td>
                                    <td>{truncate(item.rule)}</td>
                                    <td>{item.slogan}</td>

                                    {/* {(contest?.description?.split('\n'))?.map((des, index) => (
                                        <li key={index}>{des}</li>
                                    ))} */}

                                    {/* <td className="td-images" >
                                        <div className="images">
                                            <ShowImage id={item.id} />
                                        </div>
                                    </td> */}
                                    <td>
                                        <button className="btn btn-add">
                                            <Tooltip
                                                title="Create contest"
                                                onClick={() => handleClickOpenDetail(item)}
                                            >
                                                <EditIcon />
                                            </Tooltip>
                                        </button>
                                        {/* <button className="btn btn-deny" onClick={() => dispatch(denyPost(item.id))}> */}
                                        <button className="btn btn-deny" onClick={() => handleOpenConfirm(item)}>
                                            <Tooltip title="Deny">
                                                <DoDisturbIcon />
                                            </Tooltip>
                                        </button>
                                    </td>
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
            <Dialog
                open={openDetail}
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
                    Create contest from proposal {itemSelected.title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px" }}>
                    <CreateContestForm proposal={itemSelected} handleClose={handleClose} />
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
                    Are you sure to delete proposal {itemClick.title}
                </DialogTitle>
                {/* <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <ShowImage id={itemClick.id} />
                </DialogContent> */}

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProposalManagement;