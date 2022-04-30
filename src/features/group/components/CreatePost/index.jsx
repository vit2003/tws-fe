import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, Button, Card, CardHeader, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import postApi from './../../../../api/postApi';
import InputPostField from './../../../../components/form-controls/InputPostFields/index';




CreatePost.propTypes = {
    groupId: PropTypes.string
};

// Style CSS
const useStyle = makeStyles(theme => ({
    root: {
        // color: '#db36a4 !important',
    },
    btn: {
        color: '#db36a4 !important',
    },
    closeBtn: {
        position: 'absolute !important',
        // top: 0,
        bottom: 0,
        right: 0,
        color: 'black',
        backgroundColor: 'rgba(219, 54, 164, 0.3)'
    }
}))


function CreatePost({ groupId, reload }) {

    const currentUser = useSelector(state => state.login.infoUser);
    // Style MUI
    const classes = useStyle();

    // Hide inpput of Media
    const Input = styled('input')({
        display: 'none',
    });


    // ======================

    const [inputImage, setInputImage] = React.useState([]);

    // state of obj to push to firebase
    const [strgImg, setStrgImg] = React.useState([]);
    const inputRef = React.useRef();
    const storage = getStorage();

    // Display selected iamge  
    const handleFileChange = (event) => {
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].type === 'image/png' || event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/jpg' || event.target.files[i].type === 'image/gif') {
                image.push(URL.createObjectURL(event.target.files[i]))
                storageImage.push(event.target.files[i]);
            }
        }
        setStrgImg(storageImage);
        setInputImage(image);
    };

    // Choose image and 
    const handleChoose = (event) => {
        inputRef.current.click();
    };

    // =============

    // Open dialog
    const [open, setOpen] = React.useState(false);

    // set full width for dialog
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    // Handle open dialogo
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handle close dialog and reset state
    const handleClose = () => {
        setOpen(false);
        setInputImage([]);
    };

    // handle deleted iamge  
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    }

    const form = useForm({
        defaultValues: {
            postContent: '',
        }
    })

    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    let imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        console.log("objImage: ", strgImg)
        for (let i = 0; i < strgImg.length; i++) {
            const storageRef = ref(storage, `/Post/${strgImg[i].name}`)
            // console.log(strgImg[i].name)
            await uploadBytes(storageRef, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRef)
                .then((url) => {
                    imagesLink.push(url)
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        }
    }

    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmitPost = async (values) => {
        await uploadAndGetLinkImg();
        try {
            const newPost = {
                content: values.postContent,
                groupId: groupId,
                imagesLink: imagesLink,
            }
            setIsSubmit(true)
            const response = await postApi.createNewPost(newPost)
            setIsSubmit(false)
            reload();
            setOpen(false);
            setStrgImg([]);
            setInputImage([]);
            await Swal.fire(
                'New post successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log('Failed create new post: ', error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        setOpen(false);
        setInputImage([]);
        setStrgImg([]);
        form.reset();
    }
    // const { isSubmitting } = form.formState;
    // console.log("isSubmitting: ", isSubmitting);


    return (
        <div className='CreatePost'>

            {/* CLICK TO OPEN DIALOG CREATE A POST */}
            <Card sx={{ maxWidth: '100%', display: 'flex', paddingTop: 1 }}>

                {/* AVATAR */}
                <CardHeader
                    avatar={
                        <Avatar src={currentUser.avatar}></Avatar>
                    }
                />
                {/* BOX CLICK OPEN DIALOG */}
                <Box
                    onClick={handleClickOpen}
                    sx={{
                        width: '100%',
                        height: 70,
                        backgroundColor: grey[400],
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '10px',
                        marginRight: '10px',
                        '&:hover': {
                            backgroundColor: grey[300],
                            opacity: [0.9, 0.8, 0.7],
                            cursor: 'pointer',
                            transition: 'ease-in-out .5s'
                        },
                    }}
                >
                    <Typography>
                        How are you doing???
                    </Typography>
                </Box>
            </Card>

            {/* DIALOG CREATE TO FILL CREATE A POST */}
            <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                {/* TEXTFIELD TO FILL STATUS */}
                <form onSubmit={form.handleSubmit(handleSubmitPost)}>
                    {/* DIALOG'S TITLE */}
                    <DialogTitle sx={{ textAlign: 'center', borderBottom: '1px solid #d3d3d3' }}>Create A Post</DialogTitle>
                    <DialogContent sx={{ marginTop: '10px' }}>
                        {/* AVATAR */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ marginRight: '10px' }} src={currentUser.avatar}></Avatar>
                            <h4>{currentUser.name}</h4>
                        </Box>
                        <InputPostField name="postContent" form={form} />
                        {/* <Button className={classes.btn} type='submit' onClick={handleClose}>Post</Button> */}

                        {/* INPUT AND BUTTON TO FILL MEDIA */}
                        <label htmlFor="contained-button-file">
                            <Input accept="image/* " id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                            <Button sx={{ backgroundColor: "#db36a4 !important" }} variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />}>Photo</Button>
                        </label>

                        {inputImage.length ?
                            <Card variant="outlined" sx={{ padding: '10px', marginTop: 2, position: 'relative' }}>
                                <ImageList variant="masonry" cols={3} gap={8}>
                                    {inputImage.map((image, index) => (
                                        // console.log(source),
                                        <div key={index} className="image-item">
                                            <ImageListItem key={index}>
                                                <img
                                                    src={image}
                                                    alt={'image'}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        </div>
                                    ))}
                                </ImageList>
                                <IconButton className={classes.closeBtn} onClick={handleDeleteSelectedSource}>
                                    <CloseIcon />
                                </IconButton>
                            </Card>
                            : <></>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button color='inherit' onClick={handleClose}>Cancel</Button>
                        <Button disabled={isSubmit} className={classes.btn} type='submit'>Post</Button>
                    </DialogActions>
                </form>
            </Dialog>


        </div>
    );
}

export default CreatePost;