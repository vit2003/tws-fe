import { Grid } from '@mui/material/';
import { collection, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import accountApi from '../../api/accountApi';
import { db } from '../../Firebase/firebase';
import tradingPostApi from './../../api/TradingPostApi';
import Bill from './Bill/Bill';
import ChatView from './ChatView/ChatView';
import Sidebar from './Sidebar/Sidebar';




function Message() {
    const location = useLocation();
    const tradingPostId = location.state

    console.log("tradingPost id: ", tradingPostId);

    const currentUser = useSelector(state => state.login.login);

    const { params: { id } } = useRouteMatch();
    // const { params: { TradingId } } = useRouteMatch();
    // console.log("id: ", id);
    // console.log("id: ", TradingId);
    // console.log("messageId: ", messageId);

    // STATE GET LIST USERS
    const [users, setUsers] = useState([]);

    // STATE TRADINGPOST CLICK
    const [tradingPostClick, setTradingPostClick] = useState({});

    // STATE TRADINGPOST CLICK
    const [tradingPost, setTradingPost] = useState({});

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

    // STATE TRADINGPOST CLICK

    useEffect(() => {
        const fetchTradingpost = async () => {
            try {
                const response = await tradingPostApi.getDetail(tradingPostId);
                setTradingPost(response)
            } catch (error) {
                console.log('Failed to fetch userList', error)
            }
        }
        fetchTradingpost();
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
                    {/* <Bill tradingPost={tradingPost} tradingConver={tradingConver} id={id} /> */}
                    <Bill tradingConver={tradingConver} id={id} />
                </Grid>
            </Grid>
        </>
    );
}

export default Message;

