import { Card, CardContent, CardMedia, Container, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import eventApi from './../../api/eventApi';
import GroupBar from './../../components/GroupBar/index';
import Header from './../../components/Header/index';
import CrawlDataUnit from './CrawlDataUnit/index';
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import './styles.scss';


Home.propTypes = {

};

const useStyle = makeStyles(theme => ({
    root: {

    },
    titleToys: {
        fontSize: '3em !important',
        textAlign: 'center',
        letterSpacing: '5px !important',
        fontWeight: 'bold !important',
        margin: '30px 0 !important',
        color: '#db36a4',
    },
    media: {
        objectFit: 'contain',
        minWidth: 'auto',
        minHeight: 'auto',
        filter: "brightness(65%)",
    },
    boxContainImg: {
        display: 'flex',
        justifyContent: 'center',
    },
    btn: {
        "&:hover": {
            color: 'black !IMPORTANT',
            backgroundColor: '#fff !IMPORTANT',
        }
    }

}));

function Home(props) {



    const classes = useStyle();

    const [listHighLight, setListHighLight] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await eventApi.getHighLight()
                setListHighLight(response)
                return () => {
                    setListHighLight({})
                }
            } catch (error) {
                console.log('Failed to fetch categorylist', error)
            }
        })()
    }, [])



    var ToysHomePage = [
        {
            url: 'images/toys1.jpg',
            ToysTitle: 'GUNPLA',
            description: 'The word “Gunpla” is a combination of the phrase: Gundam plastic model. In other words, Gunpla kits are buildable and moveable plastic models inspired by the animated series, Gundam.',
        },
        {
            url: 'images/toys2.jpg',
            ToysTitle: 'LEGO',
            description: 'Lego Is the Perfect Toy Even if no one can really agree on what kind of toy it is anymore.',
        },
        {
            url: 'images/toys3.jpg',
            ToysTitle: 'FIGURE',
            description: 'Series Wing Gundam với dàn Mobile Suit chính gồm Heavyarms được trang bị hỏa lực cực mạnh,',
        },
        {
            url: 'images/toys4.jpg',
            ToysTitle: 'ART BOOK',
            description: 'Series Wing Gundam với dàn Mobile Suit chính gồm Heavyarms được trang bị hỏa lực cực mạnh,',
        },
    ];


    console.log("listHighLight: ", listHighLight);
    const { sx, ...other } = props;
    return (
        <div className='gradient-background'>
            <Fragment>
                <Header />
                <Box sx={{ paddingTop: '100px' }}>
                </Box>
                <GroupBar />

                {/* Event Slider */}
                {/* <div className='EventSlider__around '>
                    <Slider {...settings}>
                        {listHighLight.map((event) => {
                            return (
                                <div key={event.id} className='EventSlider'>
                                    <div className="EventSlider__detail">
                                        <img className='EventSlider__detail__image' src={event.coverImage} />
                                        <h1>{event.title}</h1>
                                        <h2>{event.slogan}</h2>
                                        <Button variant="contained">VIEW MORE</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div> */}
                <div className='EventSlider__around '>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay
                        pagination={{ clickable: true }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {listHighLight?.map((hightLight, index) => (
                            <SwiperSlide className={classes.boxContainImg} key={index}>
                                <div className="EventSlider__detail">
                                    <CardMedia className={classes.media} height="700" component="img" src={hightLight?.coverImage}></CardMedia>
                                    <h1>{hightLight.title}</h1>
                                    <h2>{hightLight.slogan}</h2>
                                    <Button className={classes.btn} variant="contained">VIEW MORE</Button>
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* ================TOYS============== */}
                <div className='hometoys'>
                    <Typography className={classes.titleToys}>
                        TOYS
                    </Typography>

                    <Container fixed>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 3,
                                rowGap: 10,
                                gridTemplateColumns: 'repeat(2, 1fr)',
                            }}
                        >
                            {ToysHomePage.map((toy) => {
                                return (
                                    <Card key={toy.ToysTitle} sx={{ maxWidth: 500, }} >
                                        <NavLink to="/toys">
                                            <div className='ShineEffect'>
                                                <CardMedia className='cardMedia' className={classes.cardMedia}
                                                    component="img"
                                                    alt="toyimg"
                                                    height="400"
                                                    image={toy.url}
                                                />
                                            </div>
                                        </NavLink>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {toy.ToysTitle}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {toy.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </Box>
                    </Container>
                </div>

                <CrawlDataUnit />
            </Fragment >
        </div>


    );
}

export default Home;