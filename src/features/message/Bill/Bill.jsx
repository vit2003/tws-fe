import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Typography, Divider, Button, Card, ImageListItem, ImageList, Box, Dialog, DialogContent, CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import BalanceIcon from '@mui/icons-material/Balance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import tradingPostApi from './../../../api/TradingPostApi';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';


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
    tradingConver: PropTypes.array,
    id: PropTypes.string
};

function Bill({ tradingConver, id }) {
    const classes = useStyle();
    const history = useHistory();
    let tradingPostId = id?.split('-')[2];
    let tradingPostState = tradingConver?.filter(tdPost => tdPost.id == id)[0];

    //   FETCH TRADING POST DETAIL

    // STATE TRADINGPOST CLICK
    const [tradingPost, setTradingPost] = useState({});

    useEffect(() => {
        const fetchTradingpost = async () => {
            try {
                const response = await tradingPostApi.getDetail(tradingPostId);
                setTradingPost(response)
            } catch (error) {
                console.log('Failed to fetch userList', error)
            }
        }
        fetchTradingpost();
    }, [])

    console.log("tradingPost: ", tradingPost);
    const handleGoToPost = () => {
        history.push(`/tradingPost/${tradingPostId}`);
    }
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('md');
    const [open, setOpen] = useState(false)

    const handleShowImageDialog = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            {
                tradingPostId ? <CardContent sx={{ paddingLeft: '30px' }}>
                    {/* <Typography className={classes.title}> */}
                    <Typography className={classes.title}>
                        {tradingPost ? tradingPost.title : ''}
                    </Typography>
                    <Divider light />
                    <Typography className={classes.content}>
                        {/* {tradingPost && tradingPostState ? tradingPost.content : tradingPostState.contentPost} */}
                        {tradingPost ? tradingPost.content : ''}
                    </Typography>

                    <Divider light />
                    <Typography sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 2 }} className={classes.exchange}>
                        <BalanceIcon sx={{ color: '#DB36A4', mr: 1 }} />
                        {/* Exchange: {tradingPost && tradingPostState ? tradingPost.toyName : tradingPostState.toyName} */}
                        Toy Name: {tradingPost ? tradingPost.toyName : ''}
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 2 }} className={classes.exchange}>
                        <AttachMoneyIcon sx={{ color: '#DB36A4', mr: 1 }} />
                        {/* Exchange: {tradingPost && tradingPostState ? tradingPost.toyName : tradingPostState.toyName} */}
                        Expected exchange: {tradingPost ? tradingPost.trading : ''}
                    </Typography>

                    <Box sx={{ maxHeight: "600px", overflowY: 'scroll', pt: 2 }}>
                        {tradingPost?.images?.length ?
                            <ImageList sx={{ width: "100%", height: "auto", maxHeight: "600px" }} variant="masonry" cols={1} rowHeight={164}>
                                {tradingPost.images.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <ImageListItem key={index} onClick={handleShowImageDialog} sx={{
                                            '&:hover': {
                                                opacity: [0.9, 0.8, 0.7],
                                                cursor: 'pointer',
                                                transition: 'all 0.5s'
                                            },
                                        }}>
                                            <img
                                                src={image.url}
                                                alt={'image'}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    </div>
                                ))}
                            </ImageList>
                            : <></>
                        }
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
                                {tradingPost?.images?.map((src, index) => (

                                    <SwiperSlide className={classes.boxContainImg} key={index}>
                                        <CardMedia className={classes.media} height="700" component="img" src={src.url}></CardMedia>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={handleGoToPost} sx={{ margin: 2 }}>Go To Post</Button>
                </CardContent>
                    : <></>
            }

        </>

    );
}

export default Bill;