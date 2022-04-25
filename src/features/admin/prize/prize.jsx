import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Button, ImageListItem, ImageList, Card, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from 'sweetalert2';
import * as yup from "yup";
import AdminInputField from '../../../components/form-controls/AdminInputField/AdminInputField';
import { createPrize, deletePrize, getPrizes } from './../../../redux/actions/prize';
import ShowImage from './../contest/showImage';


const useStyle = makeStyles((theme) => ({
    root: {},
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
    btn: {
        color: '#c31432 !important',
    },
    closeBtn: {
        position: 'absolute !important',
        // top: 0,
        bottom: 0,
        right: 0,
        color: 'black',
        backgroundColor: 'rgba(219, 54, 164, 0.3)'
    },
}));

function PrizeManagement() {
    const state = useSelector(state => state.prize)
    const dispatch = useDispatch();

    const classes = useStyle();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [itemClick, setItemClick] = useState(false);

    const handleOpenConfirm = (item) => {
        setOpenConfirm(true);
        setItemClick(item)
    }
    const handleConfirm = () => {
        dispatch(deletePrize(itemClick.id))
        setOpenConfirm(false);
    }

    // STYLE FOR INPUT IMAGE
    const Input = styled('input')({
        display: 'none',
    });

    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 9,
    });

    useEffect(() => {
        dispatch(getPrizes(filters))
    }, [])

    const [active, setActive] = useState('active');

    // Open dialog
    const [open, setOpen] = React.useState(false);
    // set full width for dialog
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const { enqueueSnackbar } = useSnackbar();

    const storage = getStorage();
    // Handle open dialogo
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handle close dialog and reset state
    const handleClose = () => {
        setOpen(false);
        setOpenConfirm(false)
    };

    const schema = yup.object().shape({
        name: yup.string().required('Please enter title of prize'),
        description: yup.string().required('Please enter description of prize'),
        value: yup.number().typeError('Value must be a number')
    });
    // STATE IMAGE TO PUSH FIREBASE
    const [strgImg, setStrgImg] = React.useState([]);

    // STATE TO SHOW IMAGE
    const [inputImage, setInputImage] = React.useState([]);
    // REF TO INPUT IMG
    const inputRef = React.useRef();



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

    // Choose image  
    const handleChoose = (event) => {
        inputRef.current.click();
    };

    // handle deleted iamge  
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    }

    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            value: '',
        },
        resolver: yupResolver(schema),
    })

    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    let imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        for (let i = 0; i < strgImg.length; i++) {
            const storageRefRunner = ref(storage, `/Prize/${strgImg[i].name}`)
            await uploadBytes(storageRefRunner, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRefRunner)
                .then((url) => {
                    imagesLink.push(url)
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        }
    }

    const handleSubmitPrize = async (values) => {
        await uploadAndGetLinkImg()
        try {
            const newPrize = {
                name: values.name,
                description: values.description,
                value: values.value.toString(),
                image: imagesLink[0],
            }
            dispatch(createPrize(newPrize))
            setOpen(false)
            await Swal.fire(
                'Create prize successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log('Failed create new post: ', error);
            setOpen(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        setInputImage([]);
        form.reset();
    }
    return (
        <>
            <div className="title-page">
                <WorkspacePremiumIcon />
                <span>Prize management</span>
            </div>

            <div className="btn-group">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button className={active == 'active' && 'active'}>
                        <WorkspacePremiumIcon />
                        <span style={{ marginLeft: '5px' }}>Active</span>
                    </Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={handleClickOpen} className='active'>
                        <WorkspacePremiumIcon />
                        <span style={{ marginLeft: '5px' }}>Create new Prize</span>
                    </Button>
                </ButtonGroup>

            </div>

            <div className="card-box">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Value</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.prizes && state.prizes.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.value)}</td>
                                        {/* <td><img src={item.images[0]?.url} alt="prize" /></td> */}
                                        <td className="td-images">
                                            <div className="images">
                                                {item.images.length > 0 && item.images.map((image, keyImage) => (
                                                    <div className="image" key={keyImage}>
                                                        <img src={image.url} alt="" />
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <Link to={`/manager/prize/${item.id}`}>
                                                <a className="btn btn-edit" >
                                                    <Tooltip title="Edit">
                                                        <EditIcon />
                                                    </Tooltip>
                                                </a>
                                                {/* <Tooltip title="Edit">
                                                    <IconButton sx={{ backgroundColor: '#5886db', color: '#fff' }} size="normal">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip> */}
                                            </Link>

                                            <a className="btn btn-delete" onClick={() => handleOpenConfirm(item)}>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </a>
                                            {/* <button className="btn btn-delete" onClick={
                                                async () => {
                                                    dispatch(deletePrize(item.id))
                                                    await Swal.fire(
                                                        'Delete prize successfully',
                                                        'Click Button to continute!',
                                                        'success'
                                                    )
                                                }
                                            }>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </button> */}
                                            {/* {
                                                item.status == 'Active' ?
                                                    <IconButton size="normal" color="inherit" onClick={() => dispatch(deactiveAccount(item.id))}>
                                                        <LockIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton size="normal" color="inherit" onClick={() => dispatch(deactiveAccount(item.id))}>
                                                        <LockOpenIcon />
                                                    </IconButton>

                                            } */}
                                        </td>
                                    </tr>
                                ))
                            }

                            {/* <button className="btn btn-lock" onClick={() => dispatch(deactiveAccount(item.id))}>
                                <Tooltip title="Lock">
                                    <LockIcon />
                                </Tooltip>
                            </button>
                            <button className="btn btn-unlock" onClick={() => dispatch(deactiveAccount(item.id))}>
                                <Tooltip title="Unlock">
                                    <LockOpenIcon />
                                </Tooltip>
                            </button> */}
                            {
                                state.prizes.length < 1 &&
                                <tr>
                                    <td colSpan="6">
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgress />
                                        </Box>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                {/* TEXTFIELD TO FILL STATUS */}
                <form onSubmit={form.handleSubmit(handleSubmitPrize)}>
                    {/* DIALOG'S TITLE */}
                    <DialogTitle sx={{ textAlign: 'center', borderBottom: '1px solid #d3d3d3' }}>Create A Prize</DialogTitle>
                    <DialogContent sx={{ marginTop: '10px' }}>

                        <AdminInputField name='name' label='Name' form={form} />
                        <AdminInputField name='description' label='Description' form={form} />
                        <AdminInputField name='value' label='Value' form={form} />
                        <label htmlFor="contained-button-file">
                            <Input accept="image/* " id="contained-button-file" type="file" onChange={handleFileChange} />
                            <Button sx={{ backgroundColor: "#c31432 !important" }} variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />}>
                                Photo</Button>

                        </label>
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
                    <DialogActions>
                        <Button color='inherit' onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </DialogActions>
                </form>
            </Dialog>

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
                    Are you sure to delete {itemClick.name}
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <ShowImage images={itemClick.images} />
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PrizeManagement;