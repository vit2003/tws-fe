import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import tradingPostApi from './../../../api/TradingPostApi';
import WishListImg from './WishListImg';



const useStyle = makeStyles(theme => ({


}));

function WishListTrading(props) {
    const classes = useStyle();
    const history = useHistory();

    const [tradingWishList, setTradingWishList] = useState([]);
    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 10
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await tradingPostApi.getWishListTrading(filters)
                setTradingWishList(response.data)
            } catch (error) {
                console.log('Failed to fetch categorylist', error)
            }
        })()
    }, [])

    const handleRedirectTradingPostDetail = (id) => {
        history.push(`/tradingPost/${id}`);
    }


    return (
        <Container fixed sx={{ margin: '100px auto' }}>
            <Typography
                sx={{ textAlign: 'center', padding: '50px 0', textTransform: 'uppercase', fontSize: '48px', fontWeight: 'bold !important', fontFamily: "Wallpoet !important", textTransform: 'uppercase', background: "-webkit-linear-gradient(#c31432, #2C5364)", WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }}
            >
                TOP TRADING you'll be interested
            </Typography>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                spaceBetween={50}
                slidesPerView={5}
                autoplay
                // pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {tradingWishList?.map((tradingPost, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => handleRedirectTradingPostDetail(tradingPost.id)}
                    >
                        <Box sx={{
                            '&:hover': {
                                opacity: [0.9, 0.8, 0.7],
                                cursor: 'pointer',
                                transition: 'all 0.5s'
                            },
                        }}>
                            <WishListImg id={tradingPost.id} />
                            <h4>{tradingPost.title}</h4>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

export default WishListTrading;