import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, Typography, Avatar, Card, ImageList, ImageListItem, Divider } from '@mui/material/';
import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ChatField from '../../../components/form-controls/ChatField/ChatField';
import MessageObj from './../MessageObj/MessageObj';
import './ChatView.scss';
import { useSelector } from 'react-redux';
import { addDoc, collection, serverTimestamp, setDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { Switch } from '@mui/material/';
import { useLocation, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { db } from '../../../Firebase/firebase';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from '@mui/material/';
import { PhotoCamera } from '@mui/icons-material/';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputField from './../../../components/form-controls/InputFields/index';
import { FormControlLabel } from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import billApi from './../../../api/billApi';
import { useSnackbar } from 'notistack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InputPostField from './../../../components/form-controls/InputPostFields/index';
import tradingPostApi from './../../../api/TradingPostApi';
import MultiInputField from './../../../components/form-controls/MultiInputField/MultiInputField';
import { useHistory } from 'react-router';

import Swal from 'sweetalert2'

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
        color: '#de6161',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    },
    delivery: {
        color: '#de6161',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    },
    closed: {
        color: 'green',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    },
    cancel: {
        color: 'red',
        letterSpacing: '5px !important',
        textTransform: 'uppercase'
    }
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

    console.log("tradingpost bill: ", tradingPost);
    console.log("tradingPostState bill: ", tradingPostState);

    // STYLED COMPONENT
    const classes = useStyle();

    const history = useHistory();

    // CURRENT USER
    const currentUser = useSelector(state => state.account.current);
    const currentUserId = currentUser.accountId;
    const currrentUserName = currentUser.name;

    const [isExchangeByMoney, setIsExchangeByMoney] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

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
    // console.log("myTradingConver: ", myTradingConver);




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




    // HANDLE OPEN DIALOG
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    // HANDLE OPEN CHECK BILL DIALOG
    const [openCheckBill, setOpenCheckBill] = React.useState(false);

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
            console.log("billIdClick: ", billIdClick);
            const respones = await billApi.getBillDetail(billIdClick);
            // console.log('api Log Bill: ', respones);
            setBill(respones)
            setOpenCheckBill(true);
        } catch (error) {
            console.log('failed to get bill: ', error);
        }
    };

    const handleClickOpenFeedback = async () => {
        setOpenCheckBill(false);
        setOpenFeedback(true);
    }



    const handleClose = () => {
        setOpen(false);
        setOpenCheckBill(false);
        setOpenRateAccount(false)
        setOpenFeedback(false)
    };

    // CHOOSE IMAGE
    const handleFileChange = (event) => {
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].type)
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
        console.log("values: ", values.message);
        console.log("strgImge: ", strgImg);

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
    // console.log("id: ", id)
    // console.log("buyerId: ", (myTradingConver?.filter(tradingPost => tradingPost.id == id))?.map(tdp => tdp.buyerId)[0])

    const handleCreateBill = async (values) => {
        try {
            const newBill = {
                toyOfSellerName: values.toyOfSellerName,
                isExchangeByMoney: isExchangeByMoney,
                // toyOfBuyerName: values.toyOfBuyerName ? values.toyOfBuyerName : '',
                // exchangeValue: values.exchangeValue ? values.exchangeValue : '',
                toyOfBuyerName: values.toyOfBuyerName,
                exchangeValue: values.exchangeValue,
                buyerId: buyerId,
                tradingPostId: tradingPostId,
            }

            console.log('newBill: ', newBill);
            const response = await billApi.createBill(newBill)
            enqueueSnackbar('New bill successfully!!', { variant: 'success' })
            setBillId(response.billId)
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    billId: response.billId
                });
            setOpen(false)

        } catch (error) {
            console.log('Failed create new bill: ', error);
            enqueueSnackbar('Failed to create bill!!', { variant: 'error' })
        }
    }
    const handleCreateRate = async (values) => {
        console.log("billIdToRate: ", billIdToRate);
        try {
            const newRate = {
                numOfStar: ratingNum,
                content: values.rate,
            }
            console.log('newRate: ', newRate);
            const response = await billApi.Rate(billIdToRate, newRate)
            console.log("rate response: ", response);
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
            console.log("bil id: ", bill.id);
            const response = await billApi.Accept(bill.id, 1)
            console.log("accept respone: ", response);
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    isBillCreated: true
                });
            setOpenCheckBill(false)
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
        }

    }

    const handleDenyBill = async () => {
        try {
            let deny = 0;
            console.log("bil id: ", bill.id);
            const response = await billApi.Deny(bill.id, deny);
            console.log("deny respone: ", response);
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    isBillCreated: false
                });
            setOpenCheckBill(false)
        } catch (error) {
            console.log("failed to deny: ", error);
        }

    }

    // DEFAULT VALUE FOR BILL FORM
    const formFeedback = useForm({
        defaultValues: {
            content: '',
        },
    })

    const handleFeedbackBill = async (values) => {
        console.log(" values: ", values);
        try {
            // console.log("bil id: ", bill.id);
            const newFeedback = {
                content: values.content,
            }
            const response = await tradingPostApi.feedbackPost(tradingPostId, newFeedback);
            console.log("accept respone: ", response);
            console.log(" newFeedback: ", newFeedback);
            setOpenFeedback(false)
            await Swal.fire(
                'Rate successfully',
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
            console.log("bil id: ", bill.id);
            const response = await billApi.Cancel(bill.id, 3)
            console.log("handleCancelBill respone: ", response);
            await updateDoc(doc(db, `tradingMessages/${id}/`),
                {
                    isBillCreated: false
                });
            setOpenCheckBill(false)
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
        }
    }

    const handleClosedPost = async () => {
        try {
            console.log("bil id: ", bill.id);
            const response = await billApi.ClosedPost(bill.id, 2)
            console.log("ClosedPost respone: ", response);
            setOpenCheckBill(false)
        } catch (error) {
            console.log("Hanlde accetp bill failed: ", error);
        }
    }

    // DEFAULT VALUE FOR BILL FORM
    const formRate = useForm({
        defaultValues: {
            rate: '',
        },
    })


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
                    Status: Cancel
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
                                </Box>

                                <Box sx={{ display: 'flex', }}>
                                    {currentUserId == buyerId ?
                                        <>
                                            <Button onClick={handleClickOpenCheckBill}>Check Bill</Button>
                                        </> :
                                        currentUserId != buyerId && isBillCreated ? <>
                                            {/* <Button onClick={handleClickOpen}>Create Bill</Button> */}
                                            <Button onClick={handleClickOpenCheckBill}>Check Bill</Button>
                                        </> :
                                            <>
                                                <Button onClick={handleClickOpen}>Create Bill</Button>
                                                <Button onClick={handleClickOpenCheckBill}>Check Bill</Button>
                                            </>
                                    }
                                    {
                                        // currentUserId == buyerId && isBillCreated ? <Button onClick={handleOpenRateAccount}>Rate Account</Button> : <></>
                                        currentUserId == buyerId ? <Button onClick={handleOpenRateAccount}>Rate Account</Button> : <></>
                                    }


                                    {/* DIALOG TO CREATE BILL */}
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>CREATE BILL</DialogTitle>
                                        <form onSubmit={formBill.handleSubmit(handleCreateBill)}>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Your trading info will be saved in our systemYour trading info will be saved in our systemYour trading info will be saved in our system
                                                </DialogContentText>
                                                <InputField name="toyOfSellerName" label="Toy Of Seller" form={formBill} />

                                                {isExchangeByMoney ? <>
                                                    <InputField name="exchangeValue" label="Exchange Value" form={formBill} />
                                                </>
                                                    : <InputField name="toyOfBuyerName" label="Toy Of Buyer" form={formBill} />
                                                }

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


                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button type="submit">Create Bill</Button>
                                            </DialogActions>
                                        </form>

                                    </Dialog>

                                    {/* DIALOG TO CHECK BILL */}
                                    <Dialog open={openCheckBill} onClose={handleClose}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>CHECK YOUR BILL</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Your trading info will be saved in our systemYour trading info will be saved in our systemYour trading info will be saved in our system
                                            </DialogContentText>
                                            <DialogContentText>
                                                {renderStatus()}
                                            </DialogContentText>
                                            <TableContainer component={Paper}>
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
                                                    {bill ? <TableBody>
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
                                                    </TableBody> :
                                                        <TableBody>
                                                            <Typography>Have No Bill</Typography>
                                                        </TableBody>

                                                    }
                                                </Table>
                                                {bill ? <Typography>Create Time: {bill?.createTime}</Typography> : <></>}
                                            </TableContainer>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Close</Button>
                                            {
                                                bill?.status === 3 || bill?.status === 2 ? <></> :
                                                    isBillCreated && currentUserId == buyerId ?
                                                        <Button onClick={handleClickOpenFeedback}>Feedback</Button> :

                                                        isBillCreated && currentUserId != buyerId ?
                                                            <>
                                                                <Button onClick={handleCancelBill}>Cancel Bill</Button>
                                                                <Button onClick={handleClosedPost}>Delivered, Closed Post?</Button>
                                                            </> :
                                                            !isBillCreated && currentUserId == buyerId && bill ?
                                                                <>
                                                                    <Button onClick={handleAcceptBill}>Accept bill</Button>
                                                                    <Button onClick={handleDenyBill}>Deny bill</Button>
                                                                </> :
                                                                !isBillCreated && currentUserId != buyerId && bill ? <></> :

                                                                    <></>
                                            }
                                            {/* {currentUserId == buyerId && bill ? <Button onClick={handleAcceptBill}>Accept bill</Button> : <></>}
                                            {currentUserId == buyerId && bill ? <Button onClick={handleDenyBill}>Deny bill</Button> : <></>} */}
                                        </DialogActions>
                                    </Dialog>


                                    {/* DIALOG RATE ACCOUNT */}
                                    <Dialog open={openRateAccount} onClose={handleClose}>
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
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button type="submit">RATE ACCOUNT</Button>
                                            </DialogActions>
                                        </form>
                                    </Dialog>

                                    {/* DIALOG FEEDBACK TRADINGPOST */}
                                    <Dialog open={openFeedback} onClose={handleClose}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>FEEDBACK THIS POST</DialogTitle>
                                        <form onSubmit={formFeedback.handleSubmit(handleFeedbackBill)}>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Your trading info will be saved in our systemYour trading info will be saved in our systemYour trading info will be saved in our system
                                                </DialogContentText>
                                                <InputPostField name='content' label='Feedback' form={formFeedback} />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button type="submit">Feedback Post</Button>
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