import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import ChatView from './ChatView/ChatView';
import { Grid } from '@mui/material/';
import { Form, Button } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { db } from '../../Firebase/firebase';
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useCollectionData, useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import accountApi from '../../api/accountApi';
import Bill from './Bill/Bill';
import tradingPostApi from './../../api/TradingPostApi';

message.propTypes = {

};

function message() {
    const location = useLocation();
    const tradingPost = location.state

    const currentUser = useSelector(state => state.account.current);

    const { params: { id } } = useRouteMatch();
    // const { params: { TradingId } } = useRouteMatch();
    // console.log("id: ", id);
    // console.log("id: ", TradingId);
    // console.log("messageId: ", messageId);

    // STATE GET LIST USERS
    const [users, setUsers] = useState([]);

    // STATE TRADINGPOST CLICK
    const [tradingPostClick, setTradingPostClick] = useState({});

    // STATE TAB CLICK
    const [tabStatus, setTabStatus] = useState('Trading');

    // console.log('isTrading before: ', isTrading);


    //   FETCH USER LIST
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await accountApi.getAll();
                setUsers(response.data);
            } catch (error) {
                console.log('Failed to fetch userList', error)
            }
        }
        fetchUser();
    }, [])


    const onChangeTrading = (value) => {
        setTabStatus(value)
    }


    const mq = query(collection(db, `messages/${id}/${id}`), orderBy("timestamp"));
    const [messages] = useCollectionData(mq);

    const [snapshot] = useCollection(collection(db, "tradingMessages"));
    const tradingConver = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("tradingConver: ", tradingConver);

    const tmq = query(collection(db, `tradingMessages/${id}/${id}`), orderBy("timestamp"));
    const [tradingmsgs] = useCollectionData(tmq);

    let tradingPostState = tradingConver?.filter(tdPost => tdPost.id == id)[0];


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Sidebar tradingConver={tradingConver} users={users} tradingPost={tradingPost} onChangeTrading={onChangeTrading} />
                </Grid>
                <Grid item xs={7}>
                    <ChatView tradingPostState={tradingPostState} tradingPost={tradingPost} tabStatus={tabStatus} id={id} users={users} messages={messages} tradingmsgs={tradingmsgs} tradingConver={tradingConver} />
                </Grid>
                <Grid item xs={2}>
                    <Bill tradingPost={tradingPost} tradingConver={tradingConver} id={id} />
                </Grid>
            </Grid>
        </>
    );
}

export default message;

