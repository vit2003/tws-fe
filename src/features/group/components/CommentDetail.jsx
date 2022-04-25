import { Avatar, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material/';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import postApi from './../../../api/postApi';

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

    const classes = useStyles();
    const history = useHistory();

    const [isLiked, setIsLiked] = useState(comment.isReacted);
    const [numOfLiked, setNumOfLiked] = useState(comment.numOfReact);

    const handleOpenProfile = () => {
        history.push(`/account/${comment.ownerId}`)
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
            </Box>
        </Box >

    );
}

export default CommentDetail;