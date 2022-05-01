import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, Divider, Grid, Rating, Typography } from '@mui/material/';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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

RunnerClosed.propTypes = {
    runner: PropTypes.object,
    contest: PropTypes.object,
};


function RunnerClosed({ runner, contest }) {
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

    // SHOW IMAGE DIALOG
    const handleShowImageDialog = () => {
        setOpen(true);
    };
    // CLOSE DIALOG
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Grid item xs={3} sm={3} md={3} lg={3} >
            <Box className={classes.onClickOpenImgDiv} sx={{ border: "1px solid black !important" }} >
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
                <CardContent>
                    <Box sx={{ height: 70 }}>
                        <Typography className={classes.postOwnerName}>{runner.ownerName}</Typography>
                        <Typography className={classes.postOwnerContent}>{truncate(runner.content)}</Typography>
                    </Box>
                </CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between !important', alignItems: 'center !important', height: 30 }}>
                    {/* <CardActions>
                        {runner.isRated === true &&
                            <StyledRating
                                name="customized-color"
                                defaultValue={runner.averageStar}
                                precision={0.5}
                                readOnly
                                getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                icon={<StarIcon fontSize="inherit" />}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                            />
                        }
                    </CardActions> */}
                    <Typography className={classes.averageStar}>Average Point: {(runner.averageStar).toFixed(2)}</Typography>
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
                                width: "auto",
                                height: "600px",
                                maxHeight: "600px",
                                boxShadow: "rgba( 0, 2, 46, 0.4) 5px 5px, rgba( 0, 2, 46, 0.3) 10px 10px, rgba( 0, 2, 46, 0.2) 15px 15px, rgba( 0, 2, 46, 0.1) 20px 20px, rgba( 0, 2, 46, 0.05) 25px 25px"
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



            </Box>
        </Grid>
    );
}

export default RunnerClosed;