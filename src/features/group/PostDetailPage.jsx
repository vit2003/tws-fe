import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import usePostDetails from './hooks/usePostDetails';
import PostDetail from './components/PostDetail';
import Post from './components/Post';
import CommentList from './components/CommentList';
import Header from '../../components/Header';
import GroupBar from '../../components/GroupBar';
import { Box, Container, Card, Typography } from '@mui/material';
import { useState } from 'react';
import PostSkeleton from './../../components/PostSkeleton/PostSkeleton';
import CommentSkeleton from './../../components/CommentSkeleton/CommentSkeleton';

PostDetailPage.propTypes = {

};

function PostDetailPage(props) {

    const { params: { postId } } = useRouteMatch();
    const [ reload, setReload ] = useState(false);
    const { post, loading } = usePostDetails(postId, reload);
    console.log("post By id: ", post);


    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <GroupBar />
            <Container maxWidth="md">
                <Card>
                    {loading ? <PostSkeleton length={1}/> : <PostDetail post={post} />}
                    {loading ? <CommentSkeleton/> : <CommentList postId={postId} comments={post.comments} reload={()=>setReload(!reload)} />}
                </Card>


            </Container>
        </div>
    );
}

export default PostDetailPage;