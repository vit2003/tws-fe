import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, CardMedia, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Navigation, Pagination } from 'swiper';

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
    images: PropTypes.array,
};

function ShowImage({ images }) {

    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const classes = useStyle();


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
                    <img src={images[0]?.url} alt="" />
                    <Typography className={classes.textOnImg}>{images?.length}+</Typography>
                </div> : <div className={classes.onClickOpenImgDiv} className="image" >
                    <img src={images[0]?.url} alt="" />
                    <Typography className={classes.NoTextOnImg}>No Images</Typography>
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
                                <CardMedia className={classes.media} height="700" component="img" src={img?.url}></CardMedia>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </DialogContent>
            </Dialog>
        </>

    );
}

export default ShowImage;