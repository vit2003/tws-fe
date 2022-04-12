import React, {useState, useEffect } from 'react';
import Header from './../../../../components/Header/index';
import { Box, Container, Card, Typography } from '@mui/material/';
import GroupBar from './../../../../components/GroupBar/index';
import TradingPost from './../TradingPost/TradingPost';
import tradingPostApi from './../../../../api/TradingPostApi';
import { useRouteMatch } from 'react-router-dom';
import CommentList from './../CommentList';
import PostSkeleton from './../../../../components/PostSkeleton/PostSkeleton';
import CommentSkeleton from '../../../../components/CommentSkeleton/CommentSkeleton';



function TradingPostDetailPage() {

    const { params: { postId } } = useRouteMatch();
    console.log("id: ", postId);

    const [tradingPost, setTradingPost] = useState([]);
    const [ reload, setReload ] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetTradingPostDetail = async () => {
            try {
                const data = await tradingPostApi.getDetail(postId);
                setTradingPost(data)
            } catch (error) {
                console.log('Failed to fetch tradingpost detail', error)
            }
            setLoading(false);
        }
        fetTradingPostDetail();
    }, [postId, reload])

    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <GroupBar />
            <Container maxWidth="md">
                <Card>
                    {loading ? <PostSkeleton length={1} /> : <TradingPost tradingPost={tradingPost} />}
                    {loading ? <CommentSkeleton/> : <CommentList postId={postId} comments={tradingPost.comment} reload={()=>setReload(!reload)} />}
                </Card>


            </Container>
        </div>
    );
}

export default TradingPostDetailPage;