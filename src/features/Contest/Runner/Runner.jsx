import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, CardMedia, Typography, Dialog, DialogContent, Rating, CardContent, CardActions, Card, DialogTitle, Tooltip, DialogContentText, DialogActions, Button, Avatar, Divider } from '@mui/material/';
import { styled } from '@mui/material/styles';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import eventApi from '../../../api/eventApi';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import InputPostField from './../../../components/form-controls/InputPostFields/index';
import LazyLoad from 'react-lazyload';
import Swal from 'sweetalert2'

const useStyle = makeStyles((theme) => ({
    onClickOpenImgDiv: {
        position: "relative",
        textAlign: "center",
        padding: "10px",
        boxShadow: "6px 6px #000",
        backgroundColor: "#fff",
    },
    onClickOpenImg: {
        filter: "brightness(90%)",
    },
    media: {
        objectFit: "contain",
        minWidth: "auto",
        minHeight: "auto",
    },
    postOwnerName: {
        fontWeight: 'bolder !important',
        textTransform: 'uppercase'
        // fontSize: '30px !important'
    },
    postOwnerContent: {
        fontStyle: 'italic !important',
        color: '#414345 !important',
        textTransform: 'lowercase'
    },
    averageStar: {
        fontSize: '15px !important',
        color: '#333'
    },
    btn: {
        color: '#c31432 !important',
    },

}));


const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        // color: "#ff6d75",
        color: "#fdc830",
    },
    "& .MuiRating-iconHover": {
        // color: "#ff3d47",
        color: "#ffe000",
    },
});

Runner.propTypes = {
    runner: PropTypes.object,
    contestId: PropTypes.string,
    contest: PropTypes.object,
    reload: PropTypes.func,
};


function Runner({ runner, contestId, contest, reload }) {

    // STYLE FOR MUI
    const classes = useStyle();

    // CUT TEXT
    const truncate = (input) => {
        if (input.length > 50) {
            return input.substring(0, 80) + '...';
        } else {
            return input;
        }
    }

    // STATE FOR DIALOG
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("lg");

    // STATE IMAGE DIALOG
    const [open, setOpen] = useState(false);

    // STATE RATING
    const [openRatingDialog, setOpenRatingDialog] = useState(false);

    // STATE RATING
    const [rating, setRating] = useState(2);

    // STATE RUNNER IS RATE
    const [isRate, setIsRate] = useState(false);



    // SHOW IMAGE DIALOG
    const handleShowImageDialog = () => {
        setOpen(true);
    };
    // CLOSE DIALOG
    const handleClose = () => {
        setOpen(false);
        setOpenRatingDialog(false);
    };


    const handleOnChangeRate = (event, newValue) => {
        console.log("newValue: ", newValue);
        setRating(newValue);
        setOpenRatingDialog(true);
    }

    const form = useForm({
        defaultValues: {
            note: '',
        },
    })

    const handleSubmitRating = async (values) => {
        console.log("rating: ", rating);
        try {
            const newRatePost = {
                numOfStar: rating,
                note: values.note,
            }
            console.log("newRatePost: ", newRatePost);
            const response = await eventApi.rating(contestId, runner.id, newRatePost);
            setOpenRatingDialog(false)
            reload();
            console.log(response);
            await Swal.fire(
                'Rate successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            setOpenRatingDialog(false)
            console.log("faild to rate: ", error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    return (
        <Grid item xs={3} sm={3} md={3} lg={3} >
            <Box className={classes.onClickOpenImgDiv} sx={{ border: "1px solid black !important" }} >
                <LazyLoad>
                    <CardMedia
                        onClick={handleShowImageDialog}
                        className={classes.onClickOpenImg}
                        height="300"
                        component="img"
                        src={runner.images[0].url}
                        sx={{
                            border: "1px solid black !important",
                            "&:hover": {
                                opacity: [0.9, 0.8, 0.7],
                                cursor: "pointer",
                                transition: "all 0.5s",
                            },
                        }}
                    ></CardMedia>
                </LazyLoad>

                <CardContent>
                    <Box sx={{ height: 70 }}>
                        <Typography className={classes.postOwnerName}>{runner.ownerName}</Typography>
                        <Typography className={classes.postOwnerContent}>{truncate(runner.content)}</Typography>
                    </Box>
                </CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between !important', alignItems: 'center !important', height: 30 }}>
                    <CardActions>
                        {runner.isRated === true ?
                            <Tooltip title="You rated it already ">
                                <span>
                                    <StyledRating
                                        name="customized-color"
                                        defaultValue={runner.averageStar}
                                        precision={0.5}
                                        readOnly
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                        icon={<StarIcon fontSize="inherit" />}
                                        emptyIcon={<StarIcon fontSize="inherit" />}
                                    />
                                </span>

                            </Tooltip> :
                            <StyledRating
                                name="customized-color"
                                defaultValue={runner.averageStar}
                                precision={0.5}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                icon={<StarIcon fontSize="inherit" />}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                                onChange={(event, newValue) => {
                                    setOpenRatingDialog(true);
                                    setRating(newValue);
                                }}
                            />
                        }
                    </CardActions>
                    <Typography className={classes.averageStar}>Average Point: {runner.averageStar}</Typography>
                </Box>


                {/* DIALOG IMAGE OF RUNNER */}
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth="auto"
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>

                        <CardMedia
                            sx={{
                                // width: "600px",
                                width: "auto",
                                height: "600px",
                                maxHeight: "600px",
                                // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                boxShadow: "rgba( 0, 2, 46, 0.4) 5px 5px, rgba( 0, 2, 46, 0.3) 10px 10px, rgba( 0, 2, 46, 0.2) 15px 15px, rgba( 0, 2, 46, 0.1) 20px 20px, rgba( 0, 2, 46, 0.05) 25px 25px"
                                // maxWidth: "600px"
                            }}
                            className={classes.media}
                            // height="700"
                            component="img"
                            src={runner.images[0].url}
                        >
                        </CardMedia>

                        <Divider sx={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }} orientation="vertical" flexItem>
                            {contest.title}
                        </Divider>

                        <Card sx={{ display: 'flex', width: '500px', border: '1px solid #000', borderRadius: '0', boxShadow: '6px 6px #000' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardContent sx={{ flex: '1 0 auto', height: '400px', width: '100%' }}>
                                    <Typography component="div" variant="h5">
                                        {runner.ownerName}
                                    </Typography>
                                    <Typography sx={{ fontStyle: 'italic', color: '#1e130c', fontSize: '15px', pl: 2, pt: 2 }} component="div">
                                        {runner.content}
                                    </Typography>

                                    <Divider />
                                    <Box sx={{ maxHeight: '90%', width: '100%', overflowY: 'scroll' }}>
                                        {runner.rates.map((rateCtn, index) => (
                                            <Box sx={{ mt: 1, pl: 2 }} key={index}>
                                                <Avatar src={rateCtn.ownerAvatar} sx={{ height: '30px', width: '30px' }} />
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: 'bold', }}>{rateCtn.ownerName}</Typography>
                                                        <Typography sx={{ fontStyle: 'italic', color: '#1e130c', fontSize: '15px' }} >{rateCtn.note} </Typography>
                                                    </Box>
                                                    <Box>
                                                        <span>
                                                            <StyledRating
                                                                name="customized-color"
                                                                defaultValue={rateCtn.numOfStar}
                                                                precision={0.5}
                                                                readOnly
                                                                getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                                                icon={<StarIcon fontSize="inherit" />}
                                                                emptyIcon={<StarIcon fontSize="inherit" />}
                                                            />
                                                        </span>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}

                                    </Box>

                                </CardContent>
                            </Box>
                        </Card>
                    </DialogContent>
                </Dialog>


                {/* DIALOG FORM RATING */}
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth='md'
                    open={openRatingDialog}
                    onClose={handleClose}
                >
                    <DialogTitle >RATE FOR</DialogTitle>
                    <form onSubmit={form.handleSubmit(handleSubmitRating)} >
                        <DialogContent>
                            <DialogContentText>Your Rating: {rating}</DialogContentText>
                            <InputPostField name='note' label="Rate" placeholder="How do you feel about that?" form={form} />
                        </DialogContent>
                        <DialogActions>
                            <Button color='inherit' onClick={handleClose}>Cancel</Button>
                            <Button className={classes.btn} type='submit'>Rate</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </Grid>
    );
}

export default Runner;