import { Avatar, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
        padding: '20px'
    },

}))

function CommentDetail({ comment }) {

    const classes = useStyles();
    const history = useHistory();

    const handleOpenProfile = () => {
        history.push(`/account/${comment.ownerId}`)
    }

    return (
        <Box className={classes.cmtBox}>
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

    );
}

export default CommentDetail;