import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, Box, CardMedia, DialogContent, Dialog } from '@mui/material/';
import { useSelector } from 'react-redux';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import { makeStyles } from '@mui/styles';
import { format, compareAsc } from 'date-fns'
import endOfDay from './../../../../node_modules/date-fns/esm/endOfDay/index';
import { Tooltip } from '@mui/material';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const useStyles = makeStyles(theme => ({
    msgSender: {
        alignItems: 'flex-end',
    },
    msgReceiver: {
        alignItems: 'flex-start'
    },
    msgChatSender: {
        backgroundColor: '#DB36A4',
        color: 'white',
    },
    msgChatReceiver: {
        backgroundColor: '#ddd',
        color: 'black',
    }
}))


MessageObj.propTypes = {
    msg: PropTypes.object,
    receiver: PropTypes.object,
    users: PropTypes.array
};

function MessageObj({ msg, users, receiver }) {

    const currentUser = useSelector(state => state.account.current);
    const currrentUserId = currentUser.accountId

    const classes = useStyles();
    const [srcList, setSrcList] = useState([]);

    const sender = msg.fromId == currrentUserId || msg.fromId === currrentUserId;
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [open, setOpen] = React.useState(false);
    // let receiver = users?.filter(user => user.id == msg.fromId)[0];
    const handleShowImageDialog = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (

        <Box className={sender ? classes.msgSender : classes.msgReceiver}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                margin: '0'
            }}>


            {sender ?
                <Box ></Box> :
                <Box sx={{
                    p: 1,
                    m: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Avatar sx={{ mr: 1 }} alt="name" src={receiver?.avatar} />
                    <Typography >
                        {receiver?.name}
                    </Typography>
                </Box>

            }


            {
                sender ?
                    <Box className={classes.msgChatSender} sx={{
                        p: 1,
                        mr: '40px',
                        mb: '5px',
                        width: 'auto',
                        borderRadius: '10px'
                    }}>
                        <Tooltip title={(msg.timestamp.toDate().toISOString())}>
                            {msg.type == 0 ?
                                <Typography>{msg.content}</Typography> :
                                msg.type == 1 ?

                                    <Box onClick={handleShowImageDialog} key={Math.random()} gridColumn="span 12" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={msg.content}></CardMedia>
                                    </Box>

                                    : <></>
                            }
                        </Tooltip>
                    </Box> :
                    <Box className={classes.msgChatReceiver} sx={{
                        p: 1,
                        ml: '40px',
                        width: 'auto',
                        borderRadius: '10px'
                    }}>

                        <Tooltip title={(msg.timestamp.toDate().toISOString())}>
                            {msg.type == 0 ?
                                <Typography>{msg.content}</Typography> :
                                msg.type == 1 ?

                                    <Box onClick={handleShowImageDialog} key={Math.random()} gridColumn="span 12" sx={{
                                        '&:hover': {
                                            opacity: [0.9, 0.8, 0.7],
                                            cursor: 'pointer',
                                            transition: 'all 0.5s'
                                        },
                                    }}>
                                        <CardMedia height="200" component="img" src={msg.content}></CardMedia>
                                    </Box>

                                    : <></>
                            }

                        </Tooltip >
                    </Box >
            }
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
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

                        <SwiperSlide className={classes.boxContainImg}>
                            <CardMedia className={classes.media} height="700" component="img" src={msg.content}></CardMedia>
                        </SwiperSlide>
                    </Swiper>
                </DialogContent>
            </Dialog>
        </Box >

    );
}

export default MessageObj;