import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia } from '@mui/material/';
import { useEffect } from 'react';
import tradingPostApi from '../../../api/TradingPostApi';
import { useState } from 'react';

WishListImg.propTypes = {

};

function WishListImg({ coverImage }) {

    const [listImg, setListImg] = useState([]);

    return (
        <>
            {/* {listImg?.map((img, index) => ( */}
            <CardMedia height="400px" component="img" src={coverImage}></CardMedia>
            {/* ))} */}
        </>

    );
}

export default WishListImg;