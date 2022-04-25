import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Container, Typography, Button, Box } from '@mui/material';
import { Autoplay, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from "swiper/react";
import tradingPostApi from '../../../api/TradingPostApi';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import WishListImg from './WishListImg';
import eventApi from '../../../api/eventApi';


const useStyle = makeStyles(theme => ({


}));

function WishListContest(props) {
    const classes = useStyle();
    const history = useHistory();

    const [wishListContest, setWishListContest] = useState([]);
    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 99
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await eventApi.getWishListContest(filters)
                setWishListContest(response.data)
            } catch (error) {
                console.log('Failed to fetch categorylist', error)
            }
        })()
    }, [])

    const handleRedirectContestDetail = (id) => {
        history.push(`/contest/${id}`);
    }


    return (
        <Container fixed sx={{ margin: '100px auto' }}>
            <Typography
                sx={{ textAlign: 'center', padding: '50px 0', textTransform: 'uppercase', fontSize: '48px', fontWeight: 'bold !important', fontFamily: "Wallpoet !important", textTransform: 'uppercase', background: "-webkit-linear-gradient(#c31432, #2C5364)", WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }}
            >
                TOP contest you'll be interested
            </Typography>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                spaceBetween={50}
                slidesPerView={3}
                autoplay
                // pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {wishListContest?.map((contest, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => handleRedirectContestDetail(contest.id)}
                    >
                        <Box sx={{
                            '&:hover': {
                                opacity: [0.9, 0.8, 0.7],
                                cursor: 'pointer',
                                transition: 'all 0.5s'
                            },
                        }}>
                            <WishListImg coverImage={contest.coverImage} />
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>{contest.title} - {contest.slogan}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

export default WishListContest;