import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import PostDetail from './../PostDetail/index';
PostList.propTypes = {
    postList: PropTypes.array,
};
PostList.defaultProps = {
    postList: [],
}

function PostList({ postList, reload }) {


    // console.log("reload: ", reload(true));

    return (
        <div>
            {postList.length ? postList.map((post) => (
                <PostDetail reload={reload} key={post.id} post={post} />
            )) : <></>}
        </div>


    );
}

export default PostList;