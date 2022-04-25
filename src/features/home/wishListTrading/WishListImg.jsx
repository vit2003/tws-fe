import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia } from '@mui/material/';
import { useEffect } from 'react';
import tradingPostApi from './../../../api/TradingPostApi';
import { useState } from 'react';

WishListImg.propTypes = {

};

function WishListImg({ id }) {

    const [listImg, setListImg] = useState([]);

    useEffect(async () => {
        const response = await tradingPostApi.getTradingPostImage(id)
        console.log(response);
        setListImg(response);
    }, [])

    return (
        <>
            {/* {listImg?.map((img, index) => ( */}
            <CardMedia height="400px" component="img" src={listImg ? listImg[0]?.url : ''}></CardMedia>
            {/* ))} */}
        </>

    );
}

export default WishListImg;