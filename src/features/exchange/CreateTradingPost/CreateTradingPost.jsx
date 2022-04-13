import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, Button, Card, CardHeader, FormControl, FormControlLabel, InputLabel, MenuItem, Switch, Typography } from '@mui/material';
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
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from "yup";
import eventApi from './../../../api/eventApi';
import tradingPostApi from './../../../api/TradingPostApi';
import InputField from './../../../components/form-controls/InputFields/index';
import InputPostField from './../../../components/form-controls/InputPostFields/index';
import SelectFormField from './../../../components/form-controls/SelectField/SelectFormField';
import Swal from 'sweetalert2';

CreateTradingPost.propTypes = {
    onSubmit: PropTypes.func,
    tradingGroupId: PropTypes.string
};
// Style CSS
const useStyle = makeStyles(theme => ({
    root: {
        // color: '#db36a4 !important',
    },
    btn: {
        color: '#db36a4 !important',
        ":disabled": {
            backgroundColor: 'grey !important',
            color: 'black !important'
        },
    },
    closeBtn: {
        position: 'absolute !important',
        // top: 0,
        bottom: 0,
        right: 0,
        color: 'black',
        backgroundColor: 'rgba(219, 54, 164, 0.3)'
    },
    toggle: {
        '& .MuiSwitch-root': {
            '& .MuiButtonBase-root-MuiSwitch-switchBase': {
                '& .Mui-checked': {
                    color: "#db36a4",

                }
            }
        },
    },
}))

function CreateTradingPost({ tradingGroupId }) {

    const currentUser = useSelector(state => state.login.infoUser);
    // console.log("currentUser: ", currentUser);

    // Style MUI
    const classes = useStyle();

    const { enqueueSnackbar } = useSnackbar();
    // Hide inpput of Media
    const Input = styled('input')({
        display: 'none',
    });

    // ======================

    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    // const [brand, setBrand] = useState('none');
    // const [type, setType] = useState('none');
    const [selected, setSelected] = useState(false);

    const [inputImage, setInputImage] = React.useState([]);
    const [inputVideo, setInputVideo] = React.useState([]);

    // state of obj to push to firebase
    const [strgImg, setStrgImg] = React.useState([]);
    const inputRef = React.useRef();
    const storage = getStorage();

    useEffect(async () => {
        try {
            const [brandList, typeList] = await Promise.all([
                eventApi.getBrand(),
                eventApi.getType(),
            ]);
            setBrands(brandList)
            setTypes(typeList)
        } catch (error) {
            console.log("fail to get brand: ", error);
        }
    }, [])


    const [isExchangeByMoney, setIsExchangeByMoney] = useState(false);

    const handleChange = (event) => {
        setIsExchangeByMoney(event.target.checked);
    };


    // Display selected iamge and video
    const handleFileChange = (event) => {
        let video = [];
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].type)
            if (event.target.files[i].type === 'video/mp4' || event.target.files[i].type === 'video/mov' || event.target.files[i].type === 'video/x-matroska' || event.target.files[i].type === 'video/gif') {
                video.push(URL.createObjectURL(event.target.files[i]))
            } else if (event.target.files[i].type === 'image/png' || event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/jpg' || event.target.files[i].type === 'image/gif') {
                image.push(URL.createObjectURL(event.target.files[i]))
                storageImage.push(event.target.files[i]);
            }
        }
        setInputVideo(video);
        setStrgImg(storageImage);
        setInputImage(image);
    };

    // Choose image and video
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
        setInputVideo([]);
        setInputImage([]);
    };

    // handle deleted iamge and video
    const handleDeleteSelectedSource = () => {
        setInputVideo([]);
        setInputImage([]);
    }

    const control = useForm()

    const schema = yup.object().shape({
        title: yup.string()
            .required('Please enter your Title')
            .test('should has at least two words', 'Please Enter as least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        toyName: yup.string().required('Please enter your Toy.'),

    });

    const form = useForm({
        defaultValues: {
            title: '',
            toyName: '',
            brandName: '',
            typeName: '',
            address: '',
            exchange: '',
            value: 0,
            phone: '',
            postContent: '',
        },
        resolver: yupResolver(schema),
    })
    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    const imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        console.log("objImage: ", strgImg)
        for (let i = 0; i < strgImg.length; i++) {
            const storageRef = ref(storage, `/TradingPost/${strgImg[i].name}`)
            // console.log(strgImg[i].name)
            await uploadBytes(storageRef, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRef)
                .then((url) => {
                    imagesLink.push(url)
                    console.log("url: ", url);
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        }
    }

    const { isSubmitting } = form.formState;
    const handleSubmitTradingPost = async (values) => {
        await uploadAndGetLinkImg()
        // Call API to create a post
        try {
            const newTradingPost = {
                title: values.title,
                toyName: values.toyName,
                brandName: values.brand,
                typeName: values.type,
                content: values.postContent,
                address: values.address,
                exchange: values.exchange ? values.exchange : '',
                value: parseInt(values.value) ? parseInt(values.value) : 0,
                phone: values.phone,
                imagesLink: imagesLink,
            }
            console.log('newPost: ', newTradingPost);

            const response = await tradingPostApi.createNewTradingPost(tradingGroupId, newTradingPost)
            setOpen(false);
            await Swal.fire(
                'Create Trading Post Successfully',
                'Click Button to continute!',
                'success'
            )
            console.log("response: ", response);
        } catch (error) {
            setOpen(false);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something go wrong",
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        setStrgImg([]);
        form.reset();
    }
    console.log("imagesLink: ", imagesLink);
    // const handleOpenProfile = () => {
    //     history.push(`/account/${account.id}`)
    // }



    console.log("isSubmitting: ", isSubmitting);

    return (
        <div className='CreatePost'>

            {/* CLICK TO OPEN DIALOG CREATE A POST */}
            <Card sx={{ maxWidth: '100%', display: 'flex', paddingTop: 1 }}>

                {/* AVATAR */}
                <CardHeader
                    sx={{
                        '& :hover': {
                            cursor: 'pointer'
                        }
                    }}
                    avatar={
                        <Avatar src={currentUser.avatar}></Avatar>
                    }
                // onClick={handleOpenProfile}
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
                <form onSubmit={form.handleSubmit(handleSubmitTradingPost)}>
                    {/* DIALOG'S TITLE */}
                    <DialogTitle sx={{ textAlign: 'center', borderBottom: '1px solid #d3d3d3' }}>Create A Trading Post</DialogTitle>
                    <DialogContent sx={{ marginTop: '10px' }}>
                        {/* AVATAR */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ marginRight: '10px' }} src={currentUser?.avatar}></Avatar>
                            <h4>{currentUser?.name}</h4>
                        </Box>
                        <InputField name='title' label='Title' form={form} />
                        <InputField name='toyName' label='Toy Name' form={form} />
                        <InputField name='address' label='Address' form={form} />

                        <FormControl component="fieldset" variant="standard">
                            <FormControlLabel
                                value="start"
                                label="Change by Money"
                                control={
                                    <Switch
                                        className={classes.toggle}
                                        checked={isExchangeByMoney}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                        </FormControl>

                        {isExchangeByMoney ? <>
                            <InputField name='value' label='Money Value' form={form} />
                        </>
                            : <InputField name='exchange' label='Exchange Toy' form={form} />
                        }



                        <InputField name='phone' label='Phone' form={form} />
                        <InputPostField name="postContent" label='Description' form={form} />

                        <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="select-role">Brand</InputLabel>
                            <SelectFormField
                                labelId="select-brand"
                                id="brand"
                                name="brand"
                                // className={classes.textField}
                                label="Brand"
                                control={control}
                                defaultValue="none"
                                variant="outlined"
                                margin="normal"
                                form={form}
                            >
                                {brands?.map((brand, index) => (
                                    <MenuItem key={index} value={brand} selected={selected}>{brand}</MenuItem>
                                ))}
                            </SelectFormField>
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="select-role">Type</InputLabel>
                            <SelectFormField
                                labelId="select-type"
                                id="type"
                                name="type"
                                // className={classes.textField}
                                label="Type"
                                control={control}
                                defaultValue="none"
                                variant="outlined"
                                margin="normal"
                                form={form}
                            >
                                {types?.map((type, index) => (
                                    <MenuItem key={index} value={type} selected={selected}>{type}</MenuItem>
                                ))}
                            </SelectFormField>
                        </FormControl>



                        {/* <Button className={classes.btn} type='submit' onClick={handleClose}>Post</Button> */}

                        {/* INPUT AND BUTTON TO FILL MEDIA */}
                        <label htmlFor="contained-button-file">
                            <Input accept="image/* video/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                            <Button sx={{ backgroundColor: "#db36a4 !important" }} variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />}>
                                Photo/Video
                            </Button>
                        </label>

                        {inputImage.length || inputVideo.length ?
                            <Card variant="outlined" sx={{ padding: '10px', marginTop: 2, position: 'relative' }}>
                                <ImageList variant="masonry" cols={3} gap={8}>
                                    {inputVideo.map((source, index) => (
                                        console.log(source),
                                        <div key={index} className="image-item">
                                            <ImageListItem key={index}>
                                                <video
                                                    className="VideoInput_video"
                                                    width="100%"
                                                    height={100}
                                                    controls
                                                    src={source}
                                                />
                                            </ImageListItem>
                                        </div>
                                    ))}
                                    {inputImage.map((image, index) => (
                                        // console.log(source),
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

                    </DialogContent>

                    <DialogActions>
                        <Button color='inherit' onClick={handleClose}>Cancel</Button>
                        <Button disabled={isSubmitting} className={classes.btn} type='submit'>Post</Button>
                    </DialogActions>
                </form>
            </Dialog>


        </div>
    );
}

export default CreateTradingPost;