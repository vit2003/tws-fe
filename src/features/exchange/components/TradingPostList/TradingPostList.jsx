import React from 'react';
import PropTypes from 'prop-types';
import TradingPostDetail from './../TradingPostDetail/TradingPostDetail';
import { Typography } from '@mui/material';

TradingPostList.propTypes = {
    listTradingPost: PropTypes.array,
};

function TradingPostList({ listTradingPost }) {
    return (
        <>
            {listTradingPost.length ? listTradingPost.map((tradingPost) => (
                <TradingPostDetail key={tradingPost.id} tradingPost={tradingPost} />
            )) : <></>}
        </>
    );
}

export default TradingPostList;