import { CardMedia } from '@mui/material/';
import React, { useEffect, useState } from 'react';
import tradingPostApi from './../../../api/TradingPostApi';

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