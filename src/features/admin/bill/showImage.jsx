import { CardMedia, Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import billApi from './../../../api/billApi';

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

    const [listBillImage, setListBillImage] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await billApi.getImgBill(id)
                setListBillImage(response)
            } catch (error) {
                console.log("Failed to fetch contest data", error);
            }
        })();
    }, [id]);


    const handleClickOpenImage = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {
                listBillImage?.length > 0 ? <div onClick={handleClickOpenImage} className={classes.onClickOpenImgDiv} className="image" >
                    <img src={listBillImage && listBillImage[0]?.url} alt="" />
                    {
                        listBillImage?.length > 1 &&
                        <Typography className={classes.textOnImg}>
                            {listBillImage?.length - 1}+
                        </Typography>
                    }
                </div> : <div className={classes.onClickOpenImgDiv} className="image" >
                    <img src={listBillImage && listBillImage[0]?.url} alt="" />
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
                        {listBillImage?.map((img, index) => (

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