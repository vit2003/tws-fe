import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import { Box, Dialog } from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import postApi from './../../../../api/postApi';
import formatDate from './../../../../utils/formatDate';
import ShowImage from './../../../admin/post/showImage';

PostDetail.propTypes = {
    post: PropTypes.object,
};
PostDetail.defaultProps = {

}

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
        objectFit: "contain",
        minWidth: "auto",
        minHeight: "auto",
    },
    heartIcon: {
        color: '#ED213A'
    },
    unHeartIcon: {
        // color: '#ED213A'
    }
}))

function PostDetail({ post, reload }) {

    const currentUser = useSelector(state => state.login.infoUser);

    const classes = useStyle();

    const history = useHistory();
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('md');
    const [open, setOpen] = useState(false);

    const [isLiked, setIsLiked] = useState(post.isLikedPost);
    const [numOfLiked, setNumOfLiked] = useState(post.numOfReact);

    const [imageOfPost, setImageOfPost] = useState([]);
    const [numOfCmt, setNumOfCmt] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                if (post.id) {
                    const [listImg, numCmt] = await Promise.all([
                        postApi.getPostImage(post.id),
                        postApi.getNumOfComment(post.id),
                    ]);
                    if (listImg) {
                        setImageOfPost(listImg);
                    } if (numCmt) {
                        setNumOfCmt(numCmt);
                    }
                }
            } catch (error) {
                console.log('Failed to fetch api', error)
            }
        })()
    }, [post.id])

    const handleShowImageDialog = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setOpenConfirm(false)
    };

    const handleClick = () => {
        history.push(`/post/${post.id}`);
    }

    // More icon open
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMore = Boolean(anchorEl);
    const handleClickMoreIcon = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }

    const handleCloseDelete = async () => {
        try {
            const response = await postApi.deletePost(post.id);
            reload();
            await Swal.fire(
                'Delete post successfully!!',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("error: ", error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        setAnchorEl(null);
    }

    const handleCloseReport = () => {
        setAnchorEl(null);
    }

    const handleCloseMore = () => {
        setAnchorEl(null);
    }


    const handleOpenProfile = () => {
        history.push(`/account/${post.ownerId}`)
    }


    const handleEmotionClick = async () => {

        try {
            const response = await postApi.reactPost(post.id);
            setIsLiked(response.isLiked);
            setNumOfLiked(response.numOfReact);
        } catch (error) {
            console.log('Failed to reactPost', error)
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
                    }} src={post.ownerAvatar}>
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
                title={post.ownerName}
                subheader={formatDate(post.postDate)}
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
                    currentUser.accountId === post.ownerId ?
                        <MenuItem onClick={handleOpenConfirm}>
                            Delete
                        </MenuItem> :
                        <MenuItem onClick={handleCloseReport}>
                            Report
                        </MenuItem>
                }

            </Menu>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                {imageOfPost?.length === 1 ?
                    imageOfPost?.map((source, index) => (
                        <Box onClick={handleShowImageDialog} key={index} gridColumn="span 12" sx={{
                            '&:hover': {
                                opacity: [0.9, 0.8, 0.7],
                                cursor: 'pointer',
                                transition: 'all 0.5s'
                            },
                        }}>
                            <CardMedia height="600" component="img" src={source.url}></CardMedia>
                        </Box>
                    ))
                    : imageOfPost?.length === 2 || imageOfPost?.length === 4 ?
                        imageOfPost?.map((source, index) => (
                            <Box onClick={handleShowImageDialog} key={index} gridColumn="span 6" sx={{
                                '&:hover': {
                                    opacity: [0.9, 0.8, 0.7],
                                    cursor: 'pointer',
                                    transition: 'all 0.5s'
                                },
                            }}>
                                <CardMedia height="300" component="img" src={source.url}></CardMedia>
                            </Box>
                        ))
                        : imageOfPost?.length === 3 ?
                            <>
                                <Box onClick={handleShowImageDialog} gridColumn="span 12" sx={{
                                    '&:hover': {
                                        opacity: [0.9, 0.8, 0.7],
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <CardMedia height="300" component="img" src={imageOfPost[0]?.url}></CardMedia>
                                </Box>
                                <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                    '&:hover': {
                                        opacity: [0.9, 0.8, 0.7],
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <CardMedia height="300" component="img" src={imageOfPost[1]?.url}></CardMedia>
                                </Box>
                                <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                    '&:hover': {
                                        opacity: [0.9, 0.8, 0.7],
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <CardMedia height="300" component="img" src={imageOfPost[2]?.url}></CardMedia>
                                </Box>
                            </>

                            : imageOfPost?.length > 4 ?
                                <>
                                    <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={imageOfPost[0]?.url}></CardMedia>
                                    </Box>
                                    <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={imageOfPost[1]?.url}></CardMedia>
                                    </Box>
                                    <Box onClick={handleShowImageDialog} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={imageOfPost[2]?.url}></CardMedia>
                                    </Box>
                                    <Box onClick={handleShowImageDialog} className={classes.onClickOpenImgDiv} gridColumn="span 6" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia className={classes.onClickOpenImg} height="200" component="img" src={imageOfPost[3].url}></CardMedia>
                                        <Typography className={classes.text} >{imageOfPost?.length - 4} +</Typography>
                                    </Box>
                                </>
                                : <></>}
            </Box>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >

                <DialogContent sx={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    {
                        imageOfPost ? <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            spaceBetween={300}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {imageOfPost?.map((src, index) => (
                                <SwiperSlide className={classes.boxContainImg} key={index}>
                                    <CardMedia
                                        sx={{
                                            width: "600px",
                                            width: "auto",
                                            height: "600px",
                                            maxHeight: "600px",
                                        }}
                                        className={classes.media} height="700" component="img" src={src.url}></CardMedia>
                                </SwiperSlide>
                            ))}
                        </Swiper> : <></>
                    }

                </DialogContent>
            </Dialog>

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                {/* Like icon - like number */}
                <IconButton onClick={handleEmotionClick} aria-label="add to favorites">
                    {isLiked === true ? <FavoriteIcon className={classes.heartIcon} /> : <FavoriteIcon className={classes.unHeartIcon} />}
                </IconButton>
                <Typography>{numOfLiked}</Typography>

                {/* comment icon - comment number */}
                <IconButton onClick={handleClick} aria-label="share">
                    <CommentIcon />
                </IconButton>
                <Typography>{numOfCmt}</Typography>
            </CardActions>

            <Dialog
                open={openConfirm}
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        borderBottom: "1px solid #d3d3d3",
                    }}
                >
                    Are you sure to delete post of {post.ownerName}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <ShowImage id={post.id} />
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleCloseDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Card>
    );
}

export default PostDetail;