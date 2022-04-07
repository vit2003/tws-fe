import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Typography, Divider, Button } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';


const useStyle = makeStyles(theme => ({
    root: {
    },
    onClickOpenImgDiv: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    },
    onClickOpenImg: {
        filter: 'brightness(40%)',

    },
    text: {
        position: 'absolute',
        fontWeight: 'bold',
        color: 'white',
        fontSize: '2rem',
    },
    boxContainImg: {
        display: 'flex',
        justifyContent: 'center',
    },
    media: {
        objectFit: 'contain',
        minWidth: 'auto',
        minHeight: 'auto',
    },
    heartIcon: {
        color: '#ED213A'
    },
    unHeartIcon: {
        // color: '#ED213A'
    },
    title: {
        fontSize: '2rem !important'
    },

    content: {
        padding: '10px 0'
    },
    brand: {
        color: 'grey',
        fontStyle: 'italic',
        fontSize: '15px',
    },
    type: {
        color: 'grey',
        fontStyle: 'italic',
        fontSize: '15px',
        paddingBottom: '10px'
    }

}))

Bill.propTypes = {
    tradingPost: PropTypes.object,
    tradingConver: PropTypes.array,
    id: PropTypes.string
};

function Bill({ tradingPost, tradingConver, id }) {
    const classes = useStyle();
    const history = useHistory();
    let tradingPostId = id?.split('-')[2];
    let tradingPostState = tradingConver?.filter(tdPost => tdPost.id == id)[0];

    const handleGoToPost = () => {
        history.push(`/tradingPost/${tradingPostId}`);
    }

    return (
        <>
            {
                tradingPostId || tradingPost ? <CardContent sx={{ paddingLeft: '30px' }}>
                    {/* <Typography className={classes.title}> */}
                    <Typography className={classes.title}>
                        {tradingPost ? tradingPost.title : ''}
                        {tradingPostState ? tradingPostState.title : ''}
                    </Typography>
                    <Divider light />
                    <Typography className={classes.content}>
                        {/* {tradingPost && tradingPostState ? tradingPost.content : tradingPostState.contentPost} */}
                        {tradingPost ? tradingPost.content : ''}
                        {tradingPostState ? tradingPostState.content : ''}
                    </Typography>


                    <Divider light />
                    <Typography sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 2 }} className={classes.exchange}>
                        <BalanceIcon sx={{ color: '#DB36A4', mr: 1 }} />  
                        {/* Exchange: {tradingPost && tradingPostState ? tradingPost.toyName : tradingPostState.toyName} */}
                        Exchange: {tradingPost ? tradingPost.toyName : ''}
                        {tradingPostState ? tradingPostState.toyName : ''}
                    </Typography>
                    {/* <Typography sx={{ display: 'flex', alignItems: 'center', pl: 2 }} className={classes.value}>
                        <AttachMoneyIcon sx={{ color: '#DB36A4', mr: 1 }} /> Value: {tradingPost?.value}
                    </Typography> */}
                    <Button onClick={handleGoToPost} sx={{margin: 2}}>Go To Post</Button>
                </CardContent>
                    : <></>
            }

        </>

    );
}

export default Bill;