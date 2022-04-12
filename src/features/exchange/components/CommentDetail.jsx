import React from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

    return (
        <Box className={classes.cmtBox}>
            <Avatar sx={{mr: 2}} src={comment.ownerAvatar}></Avatar>
            <Box>
                <Typography sx={{fontWeight: 'bold'}}>{comment.ownerName}</Typography>
                <Typography>{comment.content} </Typography>
            </Box>
        </Box>
    );
}

export default CommentDetail;