import PropTypes from 'prop-types';
import React from 'react';
import PostDetail from './../PostDetail/index';
import usePostDetails from './../../hooks/usePostDetails';
import { Typography } from '@mui/material';
PostList.propTypes = {
    postList: PropTypes.array,
};
PostList.defaultProps = {
    postList: [],
}

function PostList(props) {
    const { postList } = props;
    console.log("PostList: ", postList)

    return (
        <>
            {postList.length? postList.map((post) => (
                <PostDetail key={post.id} post={post} />
            )): <Typography> Have no post yet</Typography>}
        </>


    );
}

export default PostList;