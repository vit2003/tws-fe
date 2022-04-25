import { CardMedia } from '@mui/material/';
import React, { useState } from 'react';

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