import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BalanceIcon from '@mui/icons-material/Balance';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DialogContent } from '@mui/material';
import { Box, Dialog, Divider, Typography } from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from '../../../../Firebase/firebase';



TradingPost.propTypes = {
    tradingPost: PropTypes.object
};

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
    },
    open: {
        color: '#de6161',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    },
    exchanging: {
        color: '#de6161',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    },
    close: {
        color: 'green',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    }

}))

function TradingPost({ tradingPost }) {

    console.log("tradingPost: ", tradingPost);

    const currentUser = useSelector(state => state.login.login);
    const currentUserId = currentUser.accountId
    console.log("currentUser: ", currentUser);
    console.log("tradingPost: ", tradingPost);

    const classes = useStyle();

    const srcList = tradingPost.images;
    const history = useHistory();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [open, setOpen] = React.useState(false);

    const [isLiked, setIsLiked] = React.useState(tradingPost.isLikedPost);
    const [numOfLiked, setNumOfLiked] = React.useState(tradingPost.numOfReact);

    const handleShowImageDialog = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    // More icon open
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMore = Boolean(anchorEl);
    const handleClickMoreIcon = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseDelete = async () => {
        // try {
        //     console.log("tradingPost.id: ", tradingPost.id)
        //     const response = await postApi.deletePost(tradingPost.id)
        //     console.log('delete: ', response)
        // } catch (error) {
        //     console.log("error: ", error);
        // }
        // setAnchorEl(null);
    }

    const handleCloseReport = () => {
        setAnchorEl(null);
    }

    const handleCloseMore = () => {
        setAnchorEl(null);
    }


    const handleOpenProfile = () => {
        history.push(`/account/${tradingPost.ownerId}`)
    }


    const handleEmotionClick = async () => {

        // try {
        //     const response = await postApi.reactPost(post.id);
        //     setIsLiked(response.isLiked);
        //     setNumOfLiked(response.numOfReact);
        // } catch (error) {
        //     console.log('Failed to reactPost', error)
        // }
    }
    const handleRedirectMsg = async () => {

        let messageId = '';
        if (currentUserId.toString() <= tradingPost.ownerId.toString()) {
            messageId = `${currentUserId}-${tradingPost.ownerId}-${tradingPost.id}`;
        } else {
            messageId = `${tradingPost.ownerId}-${currentUserId}-${tradingPost.id}`;
        }

        await setDoc(doc(db, `tradingMessages/${messageId}/`),
            {
                isBillCreated: false,
                timestamp: Timestamp.now(),
                title: tradingPost ? tradingPost.title : '',
                toyName: tradingPost ? tradingPost.toyName : '',
                tradingPostId: tradingPost ? tradingPost.id : '',
                sellerId: tradingPost ? tradingPost.ownerId : '',
                contentPost: tradingPost ? tradingPost.content : '',
                buyerId: currentUserId,
                billId: null
            });
        history.push(`/TradingMessage/${messageId}`, tradingPost);


        // LƯU BILL
        // await addDoc(collection(db, `tradingMessages/${id}`),
        //     {
        //         timestamp: Timestamp.now(),
        //         isBillCreated: 0,
        //         titleBill: tradingPost.title,
        //         brand: tradingPost.brand,
        //         type: tradingPost.type,
        //         exchange: tradingPost.exchange,
        //         value: tradingPost.value,
        //     });
    }

    const renderStatus = () => {
        switch (tradingPost.status) {
            case 0:
                return <Typography className={classes.open}>
                    Status: Open
                </Typography>
                break;
            case 1:
                return <Typography className={classes.exchanging}>
                    Status: Exchanging
                </Typography>
                break;
            case 2:
                return <Typography className={classes.close}>
                    Status: Closed
                </Typography>
                break;

            default:
                break;
        }
    }

    return (
        <Card sx={{ maxWidth: '100%', marginTop: 2 }}>
            <CardHeader
                avatar={
                    <Avatar onClick={handleOpenProfile} sx={{
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    }} src={tradingPost.ownerAvatar}>
                    </Avatar>
                }

                action={
                    <IconButton onClick={handleClickMoreIcon}
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMore ? 'long-menu' : undefined}
                        aria-expanded={openMore ? 'true' : undefined}
                        aria-haspopup="true">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={tradingPost.ownerName}
                subheader={new Date(tradingPost.postDate).toISOString().slice(0, 19).replace('T', ' ')}
            />
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
                {
                    currentUserId === tradingPost.ownerId ?
                        <MenuItem onClick={handleCloseDelete}>
                            Delete
                        </MenuItem> :
                        <MenuItem onClick={handleCloseReport}>
                            Report
                        </MenuItem>
                }

            </Menu>

            {/* RENDER IMAGE */}
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                {srcList.length === 1 ?
                    srcList.map((source, index) => (
                        <Box onClick={handleShowImageDialog} key={index} gridColumn="span 12" sx={{
                            '&:hover': {
                                opacity: [0.9, 0.8, 0.7],
                                cursor: 'pointer',
                                transition: 'all 0.5s'
                            },
                        }}>
                            <CardMedia height="200" component="img" src={source.url}></CardMedia>
                        </Box>
                    ))
                    : srcList?.length === 2 || srcList?.length === 4 ?
                        srcList?.map((source, index) => (
                            <Box onClick={handleShowImageDialog} key={index} gridColumn="span 6" sx={{
                                '&:hover': {
                                    opacity: [0.9, 0.8, 0.7],
                                    cursor: 'pointer',
                                    transition: 'all 0.5s'
                                },
                            }}>
                                <CardMedia height="200" component="img" src={source.url}></CardMedia>
                            </Box>
                        ))
                        : srcList?.length === 3 ?
                            <>
                                <Box onClick={handleShowImageDialog} gridColumn="span 12" sx={{
                                    '&:hover': {
                                        opacity: [0.9, 0.8, 0.7],
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <CardMedia height="200" component="img" src={srcList[0].url}></CardMedia>
                                </Box>
                                <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                    '&:hover': {
                                        opacity: [0.9, 0.8, 0.7],
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <CardMedia height="200" component="img" src={srcList[1].url}></CardMedia>
                                </Box>
                                <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                    '&:hover': {
                                        opacity: [0.9, 0.8, 0.7],
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <CardMedia height="200" component="img" src={srcList[2].url}></CardMedia>
                                </Box>
                            </>

                            : srcList?.length > 4 ?
                                <>
                                    <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={srcList[0].url}></CardMedia>
                                    </Box>
                                    <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={srcList[1].url}></CardMedia>
                                    </Box>
                                    <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={srcList[2].url}></CardMedia>
                                    </Box>
                                    <Box onClick={handleShowImageDialog} className={classes.onClickOpenImgDiv} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia className={classes.onClickOpenImg} height="200" component="img" src={srcList[3].url}></CardMedia>
                                        <Typography className={classes.text} >{srcList.length - 4} +</Typography>
                                    </Box>
                                </>
                                : <></>}
            </Box>

            {/* DIALOG SHOW ONCLICK IMAGE */}
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >

                <DialogContent>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {srcList?.map((src, index) => (

                            <SwiperSlide className={classes.boxContainImg} key={index}>
                                <CardMedia className={classes.media} height="700" component="img" src={src.url}></CardMedia>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </DialogContent>
            </Dialog>


            {/* CONTENT */}
            <CardContent sx={{ paddingLeft: '30px' }}>
                <Typography className={classes.title}>
                    {tradingPost.title}
                </Typography>
                {renderStatus()}

                <Divider light />
                <Typography className={classes.content}>
                    {tradingPost.content}
                </Typography>

                <Typography className={classes.brand}>
                    Brand: {tradingPost.brand}
                </Typography>
                <Typography className={classes.type}>
                    Type: {tradingPost.type}
                </Typography>
                <Divider light />
                <Typography sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 2 }} className={classes.exchange}>
                    <BalanceIcon sx={{ color: '#DB36A4', mr: 1 }} />  Exchange: {tradingPost.exchange}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', pl: 2 }} className={classes.value}>
                    <AttachMoneyIcon sx={{ color: '#DB36A4', mr: 1 }} /> Value: {tradingPost.value}
                </Typography>
            </CardContent>

            {/* CARD ACTION LIKE & COMMENT */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardActions disableSpacing>
                    {/* Like icon - like number */}
                    <IconButton onClick={handleEmotionClick} aria-label="add to favorites">
                        {isLiked === true ? <FavoriteIcon className={classes.heartIcon} /> : <FavoriteIcon className={classes.unHeartIcon} />}
                    </IconButton>
                    <Typography>{numOfLiked}</Typography>

                    {/* comment icon - comment number */}
                    <IconButton aria-label="share">
                        <CommentIcon />
                    </IconButton>
                    <Typography>{tradingPost.numOfComment}</Typography>
                </CardActions>
                {
                    currentUserId === tradingPost.ownerId ?
                        <></> :
                        <Button onClick={handleRedirectMsg}>
                            Contact me
                        </Button>
                }

            </Box>

        </Card>
    );
}

export default TradingPost;