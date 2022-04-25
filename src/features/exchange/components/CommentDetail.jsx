import { Avatar, Box, Typography, Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material/';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import postApi from './../../../api/postApi';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';
CommentDetail.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: '18px 0'
    },
    cmtBox: {
        width: 'auto',
        display: 'flex',
        padding: '20px',
        justifyContent: 'space-between',
    },
    heartIcon: {
        color: '#ED213A'
    },
    unHeartIcon: {
        // color: '#ED213A'
    }

}))

function CommentDetail({ comment, reload }) {

    const currentUser = useSelector(state => state.login.infoUser);

    const classes = useStyles();
    const history = useHistory();

    const [isLiked, setIsLiked] = useState(comment.isReacted);
    const [numOfLiked, setNumOfLiked] = useState(comment.numOfReact);
    // More icon open
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMore = Boolean(anchorEl);
    const handleClickMoreIcon = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteCmt = async () => {
        try {
            await postApi.deleteCmt(comment.id);
            reload();
            await Swal.fire(
                'Delete successfully',
                'Click Button to continute!',
                'success'
            )
            setAnchorEl(null);
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }

    const handleCloseMore = () => {
        setAnchorEl(null);
    }
    const handleEmotionClick = async () => {
        try {
            const response = await postApi.reactComment(comment.id);
            setIsLiked(response.isLiked);
            setNumOfLiked(response.numOfReact);
            reload();
            console.log("response: ", response);
        } catch (error) {
            console.log('Failed to reactPost', error)
        }
    }
    console.log("comment: ", comment);

    // Onclick redirect to Profile
    const handleOpenProfile = () => {
        history.push(`/account/${comment.ownerId}`)
    }

    return (
        <Box className={classes.cmtBox}>
            <Box sx={{ display: 'flex' }}>
                <Avatar onClick={handleOpenProfile} sx={{
                    mr: 2,
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }} src={comment.ownerAvatar}>
                </Avatar>
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>{comment.ownerName}</Typography>
                    <Typography>{comment.content} </Typography>
                </Box>
            </Box>


            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>{numOfLiked}</Typography>
                <IconButton onClick={handleEmotionClick} aria-label="add to favorites">
                    {isLiked === true ? <FavoriteIcon className={classes.heartIcon} /> : <FavoriteIcon className={classes.unHeartIcon} />}
                </IconButton>
                {
                    currentUser.accountId === comment.ownerId && <IconButton onClick={handleClickMoreIcon}
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMore ? 'long-menu' : undefined}
                        aria-expanded={openMore ? 'true' : undefined}
                        aria-haspopup="true">
                        <MoreVertIcon />
                    </IconButton>
                }
            </Box>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={openMore}
                onClose={handleCloseMore}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleDeleteCmt}>
                    Delete
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default CommentDetail;