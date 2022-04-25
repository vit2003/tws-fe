import { CardMedia, Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Navigation, Pagination } from "swiper";
import postApi from '../../../api/postApi';
import eventApi from '../../../api/eventApi';
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

ShowWaitingImage.propTypes = {
    // images: PropTypes.array,
};

function ShowWaitingImage({ images }) {

    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const classes = useStyle();

    // const [images, setListPostImage] = useState([])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await eventApi.
    //                 setListPostImage(response)
    //         } catch (error) {
    //         }
    //     })();
    // }, [id]);

    const handleClickOpenImage = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {
                images?.length > 0 ? <div onClick={handleClickOpenImage} className={classes.onClickOpenImgDiv} className="image" >
                    <img src={images && images[0]?.url} alt="" />
                    {
                        images?.length > 1 &&
                        <Typography className={classes.textOnImg}>
                            {images?.length - 1}+
                        </Typography>
                    }
                </div> : <div className={classes.onClickOpenImgDiv} className="image" >
                    <img src={images && images[0]?.url} alt="" />
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
                        {images?.map((img, index) => (

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

export default ShowWaitingImage;