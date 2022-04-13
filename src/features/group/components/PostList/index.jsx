import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import PostDetail from './../PostDetail/index';
PostList.propTypes = {
    postList: PropTypes.array,
};
PostList.defaultProps = {
    postList: [],
}

function PostList({ postList }) {

    const listInnerRef = useRef();
    const onScroll = (event) => {
        const target = event.target;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            console.log("asasfasf")
        }
    };

    return (
        <div ref={listInnerRef} onScroll={onScroll}>
            {postList.length ? postList.map((post) => (
                <PostDetail key={post.id} post={post} />
            )) : <></>}
        </div>


    );
}

export default PostList;