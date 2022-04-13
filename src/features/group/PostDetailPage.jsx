import { Box, Card, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import GroupBar from '../../components/GroupBar';
import Header from '../../components/Header';
import CommentSkeleton from './../../components/CommentSkeleton/CommentSkeleton';
import PostSkeleton from './../../components/PostSkeleton/PostSkeleton';
import CommentList from './components/CommentList';
import PostDetail from './components/PostDetail';
import usePostDetails from './hooks/usePostDetails';
import postApi from './../../api/postApi';

PostDetailPage.propTypes = {

};

function PostDetailPage(props) {

    const { params: { postId } } = useRouteMatch();
    // const { post, loading } = usePostDetails(postId, reload);
    const [post, setPost] = useState({})
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postApi.get(postId);
                setPost(data)
            } catch (error) {
                console.log('Failed to fetch tradingpost detail', error)
            }
            setLoading(false);
        }
        fetchPost();
    }, [postId, reload])

    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <GroupBar />
            <Container maxWidth="md">
                <Card>
                    {loading ? <PostSkeleton length={1} /> : <PostDetail post={post} />}
                    {loading ? <CommentSkeleton length={3} /> : <CommentList postId={postId} reload={() => setReload(!reload)} />}
                </Card>


            </Container>
        </div>
    );
}

export default PostDetailPage;