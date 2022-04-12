import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material/';

import { makeStyles } from '@mui/styles';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";

ToyThumbnails.propTypes = {
    toy: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {

    },
    imgPerToy: {
        objectFit: 'contain !important',
        minWidth: 'auto !important',
        minHeight: 'auto !important',
    },
    boxContainImg1: {
        height: '600px !important',
        display: 'flex !important',
        justifyContent: 'center !important',

    },
    boxContainImg: {
        display: 'flex !important',
        justifyContent: 'center !important',
        cursor: 'pointer !important',
        '&:hover': {
            filter: 'brightness(70%) !important',
            transition: 'all .5s !important'
        }
    },

}))


function ToyThumbnails({ toy }) {
    const classes = useStyles();
    const thumbnailUrl = toy.coverImage ? toy.coverImage : 'https://via.placeholder.com/250';

    const [selectedImg, setSelectedImg] = useState(thumbnailUrl);

    return (
        <Box  >
            <Box className={classes.boxContainImg1}>
                <CardMedia className={classes.imgPerToy} alt={toy.name} component="img" src={selectedImg}></CardMedia>
            </Box>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={3}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {toy.imagesOfToy.map(toyImag => (
                    // setListImgPerToy(toyImag),
                    <SwiperSlide onClick={() => { setSelectedImg(toyImag.url) }} className={classes.boxContainImg} key={toyImag.id}>
                        <CardMedia className={classes.imgPerToy} alt={toy.name} height="200" component="img" src={toyImag.url}></CardMedia>
                    </SwiperSlide>
                ))}

            </Swiper>
        </Box>
    );
}

export default ToyThumbnails;