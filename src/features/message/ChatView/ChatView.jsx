import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageIcon from '@mui/icons-material/Image';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Button, Card, FormControlLabel, IconButton, ImageList, ImageListItem, Switch, Typography, CardMedia } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import * as yup from "yup";
import ChatField from '../../../components/form-controls/ChatField/ChatField';
import { db } from '../../../Firebase/firebase';
import billApi from './../../../api/billApi';
import tradingPostApi from './../../../api/TradingPostApi';
import InputField from './../../../components/form-controls/InputFields/index';
import InputPostField from './../../../components/form-controls/InputPostFields/index';
import MessageObj from './../MessageObj/MessageObj';
import formatDate from './../../../utils/formatDate';
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import './ChatView.scss';

const useStyle = makeStyles(theme => ({
    root: {
        // color: '#db36a4 !important',
    },
    btn: {
        color: '#db36a4 !important',
    },
    closeBtn: {
        position: 'absolute !important',
        // top: 0


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

    draft: {
        color: '#4286f4',
        letterSpacing: '5px !important',
        textTransform: 'uppercase',
        fontWeight: 'bold !important'
    },
    delivery: {
        color: '#FFD200',
        letterSpacing: '5px !important',
        textTransform: 'uppercase',
        fontWeight: 'bold !important'
    },
    closed: {
        color: '#45a247',
        letterSpacing: '5px !important',
        textTransform: 'uppercase',
        fontWeight: 'bold !important'
    },
    cancel: {
        color: '#dd1818',
        letterSpacing: '5px !important',
        textTransform: 'uppercase',
        fontWeight: 'bold !important'
    },
    cssBtn: {
        backgroundColor: '#db36a4 !important',
        "&:hover": {
            backgroundColor: "#0f0c29 !important",
        },
        color: 'white !important',
        marginRight: "10px !important"
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
        objectFit: 'contain',
        minWidth: 'auto',
        minHeight: 'auto',
    },


}))

ChatView.propTypes = {
    messages: PropTypes.array,
    tradingmsgs: PropTypes.array,
    users: PropTypes.array,
    id: PropTypes.string,
    tabStatus: PropTypes.string,
    tradingPost: PropTypes.object,
    tradingConver: PropTypes.array,
    tradingPostState: PropTypes.object
};

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});


function ChatView({ messages, users, id, tradingmsgs, tabStatus, tradingPost, tradingConver, tradingPostState }) {

    // STYLED COMPONENT
    const classes = useStyle();

    const history = useHistory();

    // CURRENT USER
    const currentUser = useSelector(state => state.login.infoUser);
    const currentUserId = currentUser.accountId;
    const currrentUserName = currentUser.name;

    const [isExchangeByMoney, setIsExchangeByMoney] = useState(false);

    // STATE SET FULLWIDTH FOR DIALOG
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("sm");


    const handleChange = (event) => {
        setIsExchangeByMoney(event.target.checked);
    };

    // toId
    let toId = parseInt((id?.split('-'))?.filter(id => id != currentUserId)[0]);

    // TRADINGPOSTID
    let tradingPostId = parseInt(id?.split('-')[2]);

    // RECEIVER
    let receiver = users?.filter(user => user.id == toId)[0];

    const myTradingConver = tradingConver?.filter(trading => currentUserId == trading?.buyerId || currentUserId == trading?.sellerId);
    const buyerId = (myTradingConver?.filter(tradingPost => tradingPost.id == id))?.map(tdp => tdp.buyerId)[0];

    const isBillCreated = (myTradingConver?.filter(tradingPost => tradingPost.id == id))?.map(tdp => tdp.isBillCreated)[0];
    const billIdToRate = (myTradingConver?.filter(tradingPost => tradingPost.id == id))?.map(tdp => tdp.billId)[0]

    //SCROLL CHAT VIEW MSG
    const messageRef = useRef();
    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages, tradingmsgs]);
    // =======================================

    // ==========DISPLAY NONE FOR INPUT IMAGE============
    const Input = styled('input')({
        display: 'none',
    });
    const inputRef = useRef();
    const handleChoose = (event) => {
        inputRef.current.click();
    };
    // ================================================

    //STATE IMAGE TO DISPLAY AFTER CHOOOSE
    const [inputImage, setInputImage] = useState([]);
    //STATE IMAGE TO DISPLAY PUSH FIREBASE STORAGE
    const [strgImg, setStrgImg] = useState([]);
    // KHAI BAO STORAGE
    const storage = getStorage();

    // STATE CONTENT TO SEND MSG CHAT
    const [content, setContent] = useState('');

    // STATE billId
    const [billId, setBillId] = useState('');

    // STATE BILL
    const [bill, setBill] = useState();

    // BILL STATUS
    const [billStatus, setBillStatus] = useState(bill?.status);

    // STATE TYPE TO SEND MSG CHAT
    const [type, setType] = useState(0);

    // STATE RATE ACCOUNT
    const [ratingNum, setRatingNum] = React.useState(2);
    // STATE RATE ACCOUNT
    const [isRate, setIsRate] = React.useState(false);


    const [detailBill, setDetailBill] = useState({})

    useEffect(async () => {
        if (tradingPostId) {
            const response = await tradingPostApi.getDetail(tradingPostId);
            setDetailBill(response);
        }
    }, [tradingPostId])


    // HANDLE OPEN DIALOG
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    // HANDLE OPEN CHECK BILL DIALOG
    const [openCheckBill, setOpenCheckBill] = React.useState(false);

    const [openImgBill, setOpenImgBill] = React.useState(false);

    const handleShowImageDialog = async () => {
        setOpenImgBill(true)
    }

    // HANDLE OPEN CHECK BILL DIALOG
    const [openFeedback, setOpenFeedback] = React.useState(false);

    //OPEN RATE ACCOUNT DIALOG
    const [openRateAccount, setOpenRateAccount] = useState(false);
    const handleOpenRateAccount = async () => {
        setOpenRateAccount(true)
    }


    const handleClickOpenCheckBill = async () => {
        try {
            let billIdClick = (myTradingConver?.filter(tradingPost => tradingPost.id == id))?.map(tdp => tdp.billId)[0]
            const respones = await billApi.getBillDetail(billIdClick);
            // console.log('api Log Bill: ', respones);
            setBill(respones)
            setOpenCheckBill(true);
        } catch (error) {
            console.log('failed to get bill: ', error);
        }
    };


    const [imgBills, setImgBills] = useState([])

    useEffect(async () => {
        if (bill) {
            try {
                const respones = await billApi.getImgBill(bill?.id);
                setImgBills(respones)
            } catch (error) {

            }
        }
    }, [bill?.id])

    console.log("bill: ", bill);

    const handleClickOpenFeedback = async () => {
        setOpenCheckBill(false);
        setOpenFeedback(true);
    }



    const handleClose = () => {
        setOpen(false);
        setOpenCheckBill(false);
        setOpenRateAccount(false)
        setOpenFeedback(false)
        setOpenImgBill(false)
    };

    // CHOOSE IMAGE
    const handleFileChange = (event) => {
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].type === 'image/png' || event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/jpg' || event.target.files[i].type === 'image/gif') {
                image.push(URL.createObjectURL(event.target.files[i]))
                storageImage.push(event.target.files[i]);
            }
            setStrgImg(storageImage);

        }
        setInputImage(image);
        setType(1);
    };
    // ====================================================


    // DELETED IMAGE CHOOOSEN
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
        setType(0);
    }


    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    const imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        const storageRef = ref(storage, `/Chat/${strgImg[0]?.name}`)
        await uploadBytes(storageRef, strgImg[0]);
        await getDownloadURL(storageRef)
            .then((url) => {
                imagesLink.push(url)
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }


    // Form to send chat
    const form = useForm({
        defaultValues: {
            message: ''
        },
    })


    // SUBMIT CHAT
    const handleSubmit = async (values) => {

        switch (type) {
            case 0:
                console.log(" type 0");
                if (values.message) {
                    await addDoc(collection(db, `messages/${id}/${id}`),
                        {
                            content: values.message,
                            fromId: currentUserId,
                            toId: toId,
                            timestamp: Timestamp.now(),
                            type: 0,
                        });
                } else return;
                form.reset();
                break;
            case 1:
                console.log(" type 1");
                await uploadAndGetLinkImg()
                await addDoc(collection(db, `messages/${id}/${id}`),
                    {
                        content: imagesLink[0],
                        fromId: currentUserId,
                        toId: toId,
                        timestamp: Timestamp.now(),
                        type: 1,
                    })
                form.reset();
                // imagesLink[0] = '';
                setType(0);
                setInputImage([]);
                break;
            default: return;
        }
    }

    const handleSubmitTrading = async (values) => {
        console.log("values: ", values.message);
        console.log("strgImge: ", strgImg);

        switch (type) {
            case 0:
                if (values.message) {
                    await addDoc(collection(db, `tradingMessages/${id}/${id}`),
                        {
                            content: values.message,
                            fromId: currentUserId,
                            toId: toId,
                            timestamp: Timestamp.now(),
                            type: 0,
                        });
                    form.reset();
                    // await setDoc(doc(db, `tradingMessages/${id}/`),
                    //     {
                    //         timestamp: Timestamp.now(),
                    //     });
                } else return;
                form.reset();
                break;
            case 1:
                await uploadAndGetLinkImg()
                await addDoc(collection(db, `tradingMessages/${id}/${id}`),
                    {
                        content: imagesLink[0],
                        fromId: currentUserId,
                        toId: toId,
                        timestamp: Timestamp.now(),
                        type: 1,
                    })
                form.reset();
                setType(0);
                setInputImage([]);
                break;
            default: return;
        }
    }




    // Validation
    const schema = yup.object().shape({
        // boolean: isExchangeByMoney,
        // toyOfSellerName: yup.string().required('Please enter your Toy.'),
        // toyOfBuyerName: yup.string().when('boolean', { is: false, then: yup.string().required('Please enter your toyOfBuyerName') }),
        // exchangeValue: yup.string().when('boolean', { is: true, then: yup.string().required('Please enter your exchangeValue') }),

    });
    // DEFAULT VALUE FOR BILL FORM
    const formBill = useForm({
        defaultValues: {
            toyOfSellerName: '',
            toyOfBuyerName: '',
            exchangeValue: '',
        },
        resolver: yupResolver(schema),
    })


    // ON CLICK CREATE BILL

    const handleCreateBill = async (values) => {
        try {
            const newBill = {
                toyOfSellerName: detailBill?.toyName,
                isExchangeByMoney: detailBill?.trading ? false : true,
                toyOfBuyerName: detailBill.trading ? detailBill.trading : "",
                exchangeValue: detailBill.trading ? detailBill.value : null,
                buyerId: buyerId,
                tradingPostId: tradingPostId,
            }

            const response = await billApi.createBill(newBill)

            setBillId(response.billId)
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    billId: response.billId
                });
            setOpen(false)
            await Swal.fire(
                'New bill successfully!!',
                'Click Button to continute!',
                'success'
            )

        } catch (error) {
            console.log('Failed create new bill: ', error);
            setOpen(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    // DEFAULT VALUE FOR BILL FORM
    const formRate = useForm({
        defaultValues: {
            rate: '',
        },
    })

    const handleCreateRate = async (values) => {
        try {
            const newRate = {
                numOfStar: ratingNum,
                content: values.rate,
            }
            const response = await billApi.Rate(billIdToRate, newRate)
            setOpenRateAccount(false)
            await Swal.fire(
                'Rate successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log('Failed to rate account: ', error);
            setOpenRateAccount(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }



    const handleAcceptBill = async () => {
        try {
            const response = await billApi.Accept(bill.id, 1)
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    isBillCreated: true
                });
            setOpenCheckBill(false)
            await Swal.fire(
                'Bill was accepted !!',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
            setOpenCheckBill(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }

    const handleDenyBill = async () => {
        try {
            let deny = 0;
            const response = await billApi.Deny(bill.id, deny);
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    isBillCreated: false
                });
            setOpenCheckBill(false)
            await Swal.fire(
                'Bill was denied !!',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("failed to deny: ", error);
            setOpenCheckBill(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }

    // DEFAULT VALUE FOR BILL FORM
    const formFeedback = useForm({
        defaultValues: {
            content: '',
        },
    })

    const handleFeedbackBill = async (values) => {
        try {
            const newFeedback = {
                content: values.content,
            }
            const response = await tradingPostApi.feedbackPost(tradingPostId, newFeedback);
            setOpenFeedback(false)
            await Swal.fire(
                'Send feedback successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
            setOpenFeedback(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    const handleCancelBill = async () => {
        try {
            const response = await billApi.Cancel(bill.id, 3)
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    isBillCreated: false
                });
            setOpenCheckBill(false)
            await Swal.fire(
                'Bill was canceled',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
            setOpenCheckBill(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    const handleClosedPost = async () => {
        try {
            const response = await billApi.ClosedPost(bill.id, 2)
            setOpenCheckBill(false)
            await Swal.fire(
                'Trading post was closed',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
            setOpenCheckBill(false)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }




    const renderStatus = () => {
        switch (bill?.status) {
            case 0:
                return <Typography className={classes.draft}>
                    Status: Draft
                </Typography>
                break;
            case 1:
                return <Typography className={classes.delivery}>
                    Status: Delivery
                </Typography>
                break;
            case 2:
                return <Typography className={classes.closed}>
                    Status: Closed
                </Typography>
                break;
            case 3:
                return <Typography className={classes.cancel}>
                    Status: Canceled
                </Typography>
                break;

            default:
                break;
        }
    }
    // Onclick redirect to Profile
    const handleOpenProfile = () => {
        history.push(`/account/${receiver?.id}`)
    }
    const renderChatView = () => {
        switch (tabStatus) {
            case "Userlist":
                return (
                    <div className='ChatView'>

                        {/* Header of Chat view */}
                        {
                            id ? <div className='ChatHeader'>
                                <Box onClick={handleOpenProfile} className='info'
                                    sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                    <Avatar sx={{ mr: 1 }} alt="name" src={receiver?.avatar} />
                                    <Typography>{receiver?.name}</Typography>
                                </Box>

                                <div>
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </div>
                            </div> : <></>
                        }


                        {/* Message container */}
                        {id ?
                            <div className='ChatContent'>
                                {/* CHAT CONTENT */}
                                <div ref={messageRef} className="MessageList">
                                    {messages?.map((msg, index) => {
                                        return <MessageObj key={index} users={users} msg={msg} receiver={receiver} />
                                    }
                                    )}
                                </div>
                                {/* DISPLAY IMAGE CHOOSEN */}
                                {inputImage.length ?
                                    <Card variant="outlined" sx={{ maxWidth: 400, padding: '10px', marginTop: 2, position: 'absolute', bottom: '100px' }}>
                                        <ImageList variant="masonry" cols={1} gap={8}>
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

                                {/* CHAT FORM */}
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <ChatField name="message" label='message' form={form} />
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
                                            <IconButton sx={{ height: '50px', width: '50px' }} aria-label="upload picture" component="span" onClick={handleChoose}>
                                                <ImageIcon></ImageIcon>
                                            </IconButton>
                                        </label>
                                        <IconButton sx={{ height: '50px', width: '50px' }} type='submit'>
                                            <SendIcon></SendIcon>
                                        </IconButton>
                                    </Box>
                                </form>

                            </div> : <></>
                        }
                    </div>
                )
            case "Trading":
                return (
                    <div className='ChatView'>
                        {/* Header of Chat view */}
                        {
                            id ? <div className='ChatHeader'>
                                <Box onClick={handleOpenProfile} className='info'
                                    sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                    <Avatar sx={{ mr: 1 }} alt="name" src={receiver?.avatar} />
                                    <Typography>{receiver?.name}</Typography>
                                    <Typography>- {tradingPostState?.title}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', }}>
                                    {currentUserId == buyerId ?
                                        <>
                                            <Button className={classes.cssBtn} onClick={handleClickOpenCheckBill}>Check Bill</Button>
                                        </> :
                                        currentUserId != buyerId && isBillCreated ? <>
                                            {/* <Button onClick={handleClickOpen}>Create Bill</Button> */}
                                            <Button className={classes.cssBtn} onClick={handleClickOpenCheckBill}>Check Bill</Button>
                                        </> :
                                            <>
                                                <Button className={classes.cssBtn} onClick={handleClickOpen}>Create Bill</Button>
                                                <Button className={classes.cssBtn} onClick={handleClickOpenCheckBill}>Check Bill</Button>
                                            </>
                                    }
                                    {
                                        // currentUserId == buyerId && isBillCreated ? <Button onClick={handleOpenRateAccount}>Rate Account</Button> : <></>
                                        currentUserId == buyerId && isBillCreated ? <Button className={classes.cssBtn} onClick={handleOpenRateAccount}>Rate Account</Button> : <></>
                                    }


                                    {/* DIALOG TO CREATE BILL */}
                                    <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>CREATE BILL</DialogTitle>

                                        <DialogContent>
                                            <DialogContentText>
                                                Your trading info will be saved in our system,
                                            </DialogContentText>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Sender</th>
                                                        <th>Receiver</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>{detailBill?.ownerName}</td>
                                                        <td>{receiver?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Value Exchange</td>
                                                        <td>{detailBill?.toyName}</td>
                                                        <td>{detailBill?.trading ? detailBill?.trading : detailBill?.value}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} sx={{ color: "#db36e4" }}>Cancel</Button>
                                            <Button onClick={handleCreateBill}>Create Bill</Button>
                                        </DialogActions>
                                    </Dialog>

                                    {/* DIALOG TO CHECK BILL */}
                                    <Dialog open={openCheckBill} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>CHECK YOUR BILL</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText sx={{ textAlign: 'center' }}>
                                                Your trading info will be saved in our system
                                            </DialogContentText>
                                            <DialogContentText>
                                                {renderStatus()}
                                            </DialogContentText>
                                            {
                                                bill ? <TableContainer component={Paper}>
                                                    <Table aria-label="simple table">
                                                        <TableHead sx={{
                                                            backgroundColor: 'pink',
                                                            '& :hover': {
                                                                backgroundColor: '#ffdde1',
                                                            },
                                                        }}>
                                                            <TableRow>
                                                                <TableCell></TableCell>
                                                                <TableCell>Bill From</TableCell>
                                                                <TableCell>Bill To</TableCell>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell >Name</TableCell>
                                                                <TableCell >{bill?.sellerName}</TableCell>
                                                                <TableCell >{bill?.buyerName}</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell >Toy Name</TableCell>
                                                                <TableCell >{bill?.toyOfSellerName}</TableCell>
                                                                <TableCell >{bill?.toyOfBuyerName}</TableCell>
                                                            </TableRow>
                                                        </TableBody>

                                                    </Table>
                                                    {/* {bill ? <Typography>Create Time: {bill?.updateTime}</Typography> : <></>} */}
                                                    {bill ? <Typography>Create Time: {formatDate(bill?.updateTime)}</Typography> : <></>}
                                                    {imgBills?.length ?
                                                        <ImageList sx={{ width: "100%", height: "auto", maxHeight: "600px" }} variant="masonry" cols={3} rowHeight={164}>
                                                            {imgBills.map((image, index) => (
                                                                <div key={index} className="image-item">
                                                                    <ImageListItem key={index} onClick={handleShowImageDialog} sx={{
                                                                        '&:hover': {
                                                                            opacity: [0.9, 0.8, 0.7],
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.5s'
                                                                        },
                                                                    }}>
                                                                        <img
                                                                            src={image.url}
                                                                            alt={'image'}
                                                                            loading="lazy"
                                                                        />
                                                                    </ImageListItem>
                                                                </div>
                                                            ))}
                                                        </ImageList>
                                                        : <></>
                                                    }

                                                </TableContainer> :
                                                    <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>Have No Bill Yet</Typography>
                                            }
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} sx={{ color: "#db36a4" }}>Close</Button>
                                            {
                                                bill?.status === 3 || bill?.status === 2 ? <></> :
                                                    isBillCreated && currentUserId == buyerId ?
                                                        <Button onClick={handleClickOpenFeedback} sx={{ color: "#db36a4" }}>Feedback</Button> :

                                                        isBillCreated && currentUserId != buyerId ?
                                                            <>
                                                                <Button onClick={handleCancelBill} sx={{ color: "#db36a4" }}>Cancel Bill</Button>
                                                                <Button onClick={handleClosedPost} sx={{ color: "#db36a4" }}>Delivered, Closed Post?</Button>
                                                            </> :
                                                            !isBillCreated && currentUserId == buyerId && bill ?
                                                                <>
                                                                    <Button onClick={handleAcceptBill} sx={{ color: "#db36a4" }}>Accept bill</Button>
                                                                    <Button onClick={handleDenyBill} sx={{ color: "#db36a4" }}>Deny bill</Button>
                                                                </> :
                                                                !isBillCreated && currentUserId != buyerId && bill ? <></> :

                                                                    <></>
                                            }
                                            {/* {currentUserId == buyerId && bill ? <Button onClick={handleAcceptBill}>Accept bill</Button> : <></>}
                                            {currentUserId == buyerId && bill ? <Button onClick={handleDenyBill}>Deny bill</Button> : <></>} */}
                                        </DialogActions>
                                    </Dialog>

                                    {/* DIALOG SHOW ONCLICK IMAGE */}
                                    <Dialog
                                        fullWidth={fullWidth}
                                        maxWidth={maxWidth}
                                        open={openImgBill}
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
                                                {imgBills?.map((src, index) => (
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
                                            </Swiper>
                                        </DialogContent>
                                    </Dialog>

                                    {/* DIALOG RATE ACCOUNT */}
                                    <Dialog open={openRateAccount} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>RATE ACCOUNT</DialogTitle>
                                        <form onSubmit={formRate.handleSubmit(handleCreateRate)}>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Your trading info will be saved in our systemYour trading info will be saved in our systemYour trading info will be saved in our system
                                                </DialogContentText>

                                                <StyledRating
                                                    name="customized-color"
                                                    defaultValue={0}
                                                    precision={0.5}
                                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                    icon={<FavoriteIcon fontSize="inherit" />}
                                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                                    onChange={async (event, newValue) => {
                                                        try {
                                                            setRatingNum(newValue)
                                                            setIsRate(true);
                                                        }
                                                        catch (error) {
                                                            console.log("fail to rate: ", error)
                                                        }
                                                    }}
                                                />
                                                <InputPostField name='rate' label='rate' form={formRate} />


                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} sx={{ color: "#db36a4" }}>Cancel</Button>
                                                <Button sx={{ color: "#db36a4" }} type="submit">RATE ACCOUNT</Button>
                                            </DialogActions>
                                        </form>
                                    </Dialog>

                                    {/* DIALOG FEEDBACK TRADINGPOST */}
                                    <Dialog open={openFeedback} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>FEEDBACK ACCOUNT</DialogTitle>
                                        <form onSubmit={formFeedback.handleSubmit(handleFeedbackBill)}>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Your trading info will be saved in our system
                                                </DialogContentText>
                                                <InputPostField name='content' label='Feedback' form={formFeedback} />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} sx={{ color: "#db36a4" }}>Cancel</Button>
                                                <Button type="submit" sx={{ color: "#db36a4" }}>Feedback Account</Button>
                                            </DialogActions>
                                        </form>
                                    </Dialog>

                                    {/* GET MORE INFO ABOUT POST */}
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            </div> : <></>
                        }

                        {/* Message container */}
                        {id ?
                            <div className='ChatContent'>
                                <div ref={messageRef} className="MessageList">
                                    {tradingmsgs?.map((msg, index) => {
                                        return <MessageObj key={index} users={users} msg={msg} receiver={receiver} />
                                    })}
                                </div>
                                {inputImage.length ?
                                    <Card variant="outlined" sx={{ maxWidth: 400, padding: '10px', marginTop: 2, position: 'absolute', bottom: '100px' }}>
                                        <ImageList variant="masonry" cols={1} gap={8}>
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
                                {/* input form */}
                                <form onSubmit={form.handleSubmit(handleSubmitTrading)}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <ChatField name="message" label='message' form={form} />
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
                                            <IconButton sx={{ height: '50px', width: '50px' }} aria-label="upload picture" component="span" onClick={handleChoose}>
                                                <ImageIcon></ImageIcon>
                                            </IconButton>
                                        </label>
                                        <IconButton sx={{ height: '50px', width: '50px' }} type='submit'>
                                            <SendIcon></SendIcon>
                                        </IconButton>
                                    </Box>
                                </form>

                            </div> : <></>
                        }
                    </div>
                )
            default: return;
        }
    }

    return (
        <>
            {renderChatView()}
        </>
    );
}

export default ChatView;