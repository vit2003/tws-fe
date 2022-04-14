import { CardMedia, Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Navigation, Pagination } from "swiper";
import postApi from './../../../api/postApi';
import tradingPostApi from './../../../api/TradingPostApi';
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const useStyle = makeStyles(theme => ({
    onClickOpenImgDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    },
    textOnImg: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: '-40px !important',
        marginLeft: '30px !important'
    },
    NoTextOnImg: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: '-40px !important',
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

}))

ShowImage.propTypes = {
    // images: PropTypes.array,
};

function ShowImage({ id }) {

    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const classes = useStyle();

    const [listPostImage, setListPostImage] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await tradingPostApi.getTradingPostImage(id)
                console.log("response: ", response);
                setListPostImage(response)
            } catch (error) {
                console.log("Failed to fetch contest data", error);
            }
        })();
    }, [id]);

    console.log("listPostImage ", listPostImage);

    const handleClickOpenImage = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {
                listPostImage?.length > 0 ? <div onClick={handleClickOpenImage} className={classes.onClickOpenImgDiv} className="image" >
                    <img src={listPostImage && listPostImage[0]?.url} alt="" />
                    {
                        listPostImage?.length > 1 &&
                        <Typography className={classes.textOnImg}>
                            {listPostImage?.length - 1}+
                        </Typography>
                    }
                </div> : <div className={classes.onClickOpenImgDiv} className="image" >
                    <img src={listPostImage && listPostImage[0]?.url} alt="" />
                    <Typography className={classes.NoTextOnImg}>No imgage</Typography>
                </div>
            }

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
                        {listPostImage?.map((img, index) => (

                            <SwiperSlide className={classes.boxContainImg} key={index}>
                                <CardMedia
                                    sx={{
                                        width: "600px",
                                        width: "auto",
                                        height: "600px",
                                        maxHeight: "600px",
                                    }}
                                    className={classes.media} height="700" component="img" src={img?.url}></CardMedia>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </DialogContent>
            </Dialog>
        </>

    );
}

export default ShowImage;