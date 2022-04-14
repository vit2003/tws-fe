import React from 'react';
import PropTypes from 'prop-types';
import TradingPostDetail from './../TradingPostDetail/TradingPostDetail';
import { Typography } from '@mui/material';

TradingPostList.propTypes = {
    tradingPostList: PropTypes.array,
};

function TradingPostList({ tradingPostList, reload }) {
    return (
        <>
            {tradingPostList.length ? tradingPostList.map((tradingPost) => (
                <TradingPostDetail reload={reload} key={tradingPost.id} tradingPost={tradingPost} />
            )) : <></>}
        </>
    );
}

export default TradingPostList;