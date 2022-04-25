import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, Card, IconButton, ImageList, ImageListItem, Button, Dialog, DialogTitle } from '@mui/material/';
import InputField from '../../../components/form-controls/InputFields';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { getStorage } from 'firebase/storage';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const useStyle = makeStyles(theme => ({

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
    },

}))

CreatePostContest.propTypes = {

};

function CreatePostContest() {
    const classes = useStyle();
    // STYLE IMAGE INPUT
    const Input = styled('input')({
        display: 'none',
    });

    // STATE FOR DIALOG
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("md");

    // STATE RUNNER DIALOG
    const [openRunnerDialog, setOpenRunnerDialog] = useState(false);

    // STATE IMAGE TO PUSH FIREBASE
    const [strgImg, setStrgImg] = React.useState([]);

    // STATE TO SHOW IMAGE
    const [inputImage, setInputImage] = React.useState([]);

    // REF TO INPUT IMG
    const inputRef = React.useRef();

    // STORAGE FIREBASE
    const storage = getStorage();

    // DISPLAY SELECTED IMAGE
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

    // handle deleted iamge and 
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    }

    const form = useForm({
        defaultValues: {
            content: '',
        },
    })


    // CLOSE DIALOG
    const handleClose = () => {
        setOpenRunnerDialog(false);
        setInputImage([]);
    };

    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openRunnerDialog}
            onClose={handleClose}
        >
            <DialogTitle>Create your post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <form>
                    <InputField name='content' label='Content' form={form} />
                    <label htmlFor="contained-button-file">
                        <Input accept="image/* " id="contained-button-file" type="file" onChange={handleFileChange} />
                        <Button sx={{ backgroundColor: "#db36a4 !important" }} variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />}>
                            Photo</Button>
                    </label>
                </form>

                {inputImage.length ?
                    <Card variant="outlined" sx={{ padding: '10px', marginTop: 2, position: 'relative' }}>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {inputImage.map((image, index) => (
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
        </Dialog>



    );
}

export default CreatePostContest;