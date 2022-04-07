import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Button, Input, Avatar, Typography, Card } from '@mui/material';
import InputEditBioField from './../../../components/form-controls/InputEditBioField/InputEditBioField';
import InputField from './../../../components/form-controls/InputFields/index';
import { makeStyles } from '@mui/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import eventApi from './../../../api/eventApi';
import CircularProgressWithLabel from '../../../components/CircularWithLabel/CircularProgressWithLabel'
import { useSnackbar } from 'notistack';


const useStyles = makeStyles(theme => ({
    form: {

    },
    labelText: {
        paddingTop: '15px'
    },
    button: {
        backgroundColor: '#DB36A4 !important',
        margin: '20px auto !important'
    },
    inputtext: {
        height: '20px !important',
        "& .Mui-focused": {
            color: 'pink',
            borderColor: 'pink'
        },
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline-focused': {
                borderColor: 'pink',
            },
            '&:hover fieldset': {
                borderColor: 'pink',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'pink',
            },
        },

    },

}))
ProposalForm.propTypes = {

};

function ProposalForm({value}) {

    // Make Styles 
    const classes = useStyles();

    const {enqueueSnackbar} = useSnackbar();

    const Input = styled('input')({
        display: 'none',
    });
    // Validate Form
    const schema = yup.object().shape({
        title: yup.string().required(`Please enter Contest's Title.`),
        minRegister: yup.string().required(`Please enter min of register.`),
        maxRegister: yup.string().required(`Please enter max of register.`),
        description: yup.string().required(`Please enter Description of Contest.`),
        typeName: yup.string().required(`Please enter type of contest.`),
        brandName: yup.string().required(`Please enter Brand of Toy.`),
        location: yup.string().required(`Please enter Location.`),
        duration: yup.string().required(`Please enter Duration of contest.`),
    });
    const form = useForm({
        defaultValues: {
            title: '',
            minRegister: '',
            maxRegister: '',
            description: '',
            typeName: '',
            brandName: '',
            location: '',
            duration: '',
            imagesUrl: [],
        },
        resolver: yupResolver(schema),
    })

    

    const [inputImage, setInputImage] = React.useState([]);
    const [strgImg, setStrgImg] = React.useState([]);
    const inputRef = React.useRef();
    // Display selected iamge and video
    const handleFileChange = (event) => {
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].type === 'image/png' || event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/jpg' || event.target.files[i].type === 'image/gif') {
                image.push(URL.createObjectURL(event.target.files[i]))
                storageImage.push(event.target.files[i]);
            } else return;
        }
        setStrgImg(storageImage);
        setInputImage(image);
    };
    const handleChoose = (event) => {
        // inputRef.current.focus();
    };

    // handle deleted iamge and video
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    }

    const storage = getStorage();

    const handleSubmit = async (values) => {
        console.log("strgImg: ", strgImg)
        for (let i = 0; i < strgImg.length; i++) {
            const storageRef = ref(storage, `/Proposal/${strgImg[i].name}`)
            // console.log(strgImg[i].name)
            const uploadTask = uploadBytes(storageRef, strgImg[i]);
        }

        const newProposal = {
            title: values.title,
            minRegister: values.minRegister,
            maxRegister: values.maxRegister,
            description: values.description,
            typeName: values.typeName,
            brandName: values.brandName,
            location: values.location,
            duration: values.duration,
            imagesUrl: inputImage,
        }
        console.log('newProposal: ', newProposal)
        try {
            const response = await eventApi.proposalToOpenContest(newProposal)
            enqueueSnackbar('New Proposal successfully!!', {variant: 'success'})
            console.log("response: ", response);
        } catch (error) {
            console.log('Failed create comment: ', error);
            enqueueSnackbar('Failed to Proposal !!', {variant: 'error'})
        }
        form.reset();
        setInputImage([]);

    }

    const { isSubmitting } = form.formState;

    return (
        <div>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '30px 0' }}>Proposal Here</Typography>
            

            <Box sx={{ display: 'flex', padding: '0 50px', }}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
                    <Grid container>
                        {/* TITLE */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Title</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="title" form={form} />
                        </Grid>

                        {/* MIN REGISTER */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Min Register</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="minRegister" form={form} />
                        </Grid>

                        {/* MAX REGISTER */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Max Register</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="maxRegister" form={form} />
                        </Grid>

                        {/* DESCRIPTION */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Description</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputEditBioField className={classes.inputtext} name="description" form={form} />
                        </Grid>

                        {/* TYPE NAME */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>typeName</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="typeName" form={form} />
                        </Grid>

                        {/* BRAND NAME */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>brandName</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="brandName" form={form} />
                        </Grid>

                        {/* locations */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Location</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="location" form={form} />
                        </Grid>

                        {/* Duration */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Duration (day)</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="duration" form={form} />
                        </Grid>

                        {/* IMAGE */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Image</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/* video/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} name="imagesUrl" form={form} />
                                <Button sx={{ backgroundColor: "#db36a4 !important" }} variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />}>
                                    Photo/Video


                                </Button>
                            </label>
                        </Grid>

                        {/* SHOW IMAGE SELECTED */}
                        {inputImage.length ?
                            <Card variant="outlined" sx={{ padding: '10px', marginTop: 2, position: 'relative' }}>
                                <ImageList variant="masonry" cols={3} gap={8}>
                                    {inputImage.map((image, index) => (
                                        console.log(image),
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

                        {/* Button */}
                        <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained'>
                            Proposal
                        </Button>
                        { isSubmitting && <CircularProgressWithLabel value={100} />}
                    </Grid>
                </form>
            </Box>
        </div>
    );
}

export default ProposalForm;