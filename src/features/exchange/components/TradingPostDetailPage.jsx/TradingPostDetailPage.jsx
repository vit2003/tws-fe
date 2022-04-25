import { Box, Card, Container } from '@mui/material/';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import CommentSkeleton from '../../../../components/CommentSkeleton/CommentSkeleton';
import tradingPostApi from './../../../../api/TradingPostApi';
import GroupBar from './../../../../components/GroupBar/index';
import Header from './../../../../components/Header/index';
import PostSkeleton from './../../../../components/PostSkeleton/PostSkeleton';
import CommentList from './../CommentList';
import TradingPost from './../TradingPost/TradingPost';



function TradingPostDetailPage() {

    const { params: { postId } } = useRouteMatch();

    const [tradingPost, setTradingPost] = useState([]);
    const [reload, setReload] = useState(false);
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
                    {loading ? <CommentSkeleton length={3} /> : <CommentList postId={postId} reload={() => setReload(!reload)} />}
                </Card>


            </Container>
        </div>
    );
}

export default TradingPostDetailPage;