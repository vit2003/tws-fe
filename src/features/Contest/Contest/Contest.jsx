import { Box, Dialog, DialogContent, Grid, Container } from '@mui/material/';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import eventApi from './../../../api/eventApi';
import prizeApi from './../../../api/prizeApi';
import Header from './../../../components/Header/index';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { Autoplay } from 'swiper';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import "./Contest.scss";


Contest.propTypes = {
};

const useStyle = makeStyles(theme => ({
    root: {
    },
    onClickOpenImgDiv: {
        position: 'relative',
        textAlign: 'center',
        padding: "10px",
        boxShadow: '6px 6px #000',
        backgroundColor: '#fff'
    },
    onClickOpenImg: {
        filter: 'brightness(90%)',
    },
    media: {
        objectFit: 'contain',
        minWidth: 'auto',
        minHeight: 'auto',
    },
}))
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function Contest(props) {
    const { params: { contestId } } = useRouteMatch();
    const currentAccount = useSelector(state => state.account.current);
    const currentAccountId = currentAccount.accountId;
    console.log(currentAccount.accountId);


    const classes = useStyle();
    const [rating, setRating] = React.useState(2);
    const [loading, setLoading] = useState(true)
    const [contest, setContest] = useState({})
    const [prizeList, setPrizeList] = useState([])
    const [rewardList, setRewardList] = useState([])
    const [postOfContestList, setPostOfContestList] = useState({})


    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [open, setOpen] = React.useState(false);
    const [isRate, setIsRate] = React.useState(false);

    const handleShowImageDialog = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const [urlImg, setUrlImg] = useState("")
    const storage = getStorage();
    const storageRef = ref(storage, `/Logo/3.png`)
    // useEffect(() => {
    //     (async () => {
    //         const storageRef = ref(storage, `/Logo/3.png`)
    //         await getDownloadURL(storageRef)
    //             .then((url) => {
    //                 linkURL.push(url)
    //                 console.log("url: ", url);
    //             })
    //             .catch((error) => {
    //                 console.log("error: ", error);
    //             })
    //     })
    // })


    useEffect(() => {
        (async () => {
            try {
                const [contestInfoData, prizeData, rewardData, postOfContestData,] = await Promise.all([
                    eventApi.getContestDetail(contestId),
                    prizeApi.getPrizeByContestId(contestId),
                    eventApi.getReward(contestId),
                    eventApi.getPostOfContest(contestId),

                ]);
                await getDownloadURL(storageRef)
                    .then((url) => {
                        setUrlImg(url);
                        console.log("url: ", url);
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                    })


                console.log(eventApi.getContestDetail(contestId),);
                console.log("contestId: ", contestId)
                console.log("contestInfo: ", contestInfoData)
                console.log("prize: ", prizeData)
                console.log("reward: ", rewardData)
                console.log("postOfContest: ", postOfContestData)

                setContest(contestInfoData);
                setPrizeList(prizeData);
                setRewardList(rewardData);
                setPostOfContestList(postOfContestData);
            } catch (error) {
                console.log('Failed to fetch contest data', error)
            }
            setLoading(false)
        })()
    }, [contestId])

    // const onChangeRating = async (newValue) => {
    //         try{
    //             console.log(runner.id);
    //             console.log(newValue);
    //             const response = await eventApi.rating(runner.id);
    //             console.log("rating response: ", response);
    //         }catch{
    //             console.log('Failed to rating contest', error)
    //         }
    // };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (

        <>
            <Header />
            <Box sx={{ paddingTop: '70px' }}></Box>

            <div className='contestDetail'>
                <div className="contest__carousel">
                    <Container sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        <Grid container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"

                        >
                            <Grid item xs={5}>
                                <img width='400px' src={urlImg} />
                            </Grid>
                            <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={7}>
                                <div className='contest__carousel__text'>
                                    <h2>LEGO CONTEST 2022 -</h2>
                                    <div className="swipper__container">
                                        <Swiper
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            modules={[Autoplay]}
                                            spaceBetween={50}
                                            slidesPerView={1}
                                        >
                                            <SwiperSlide>
                                                <h3>
                                                    STRAIGHT BUILD
                                                </h3>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <h3>
                                                    CUSTOM MUSUME
                                                </h3>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <h3>
                                                    CUSTOM MECHA
                                                </h3>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>

                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                </div>
                {/* <section class="container">
                    <div class="wave"></div>
                </section> */}
                {/* Rule */}
                <div className="contest__rule">

                    <Container>
                        <div className="contest__rule__content">
                            <h1>CONTEST RULES AND DETAILS</h1>
                            <div className="contest__date">
                                <h4>Date of competition :</h4>
                                <ul>
                                    <li>Start date: </li>
                                    <li>End date: </li>
                                    <li>Result: </li>
                                </ul>
                            </div>
                            <div className="contest__description">
                                <h4>Description :</h4>
                                <p>
                                    - Any model can be used as long as it stays within the mecha universe and is not counterfeit.
                                    - Unlicensed resin conversion kits are not allowed.
                                    - Scratchbuild and Kitbash are encouraged.
                                    - Painting is mandatory.
                                    - 3D printing is allowed up to 20% of the finished project.
                                    - The diorama is not mandatory and will not incur any penalties. However, it does offer a bonus.
                                </p>
                            </div>
                            <div className="contest__prize">
                                <h4>PRIZES TO BE WON</h4>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                >

                                    <Grid item xs={4}>
                                        <img src="" alt="img1" />
                                        <h5>1st</h5>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <img src="" alt="img1" />
                                        <h5>2nd</h5>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <img src="" alt="img1" />
                                        <h5>3rd</h5>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                    </Container>
                </div>



                {/* Firt Prize */}
                {prizeList.length ?
                    <>
                        <div className="contestDetail__content__firstPrize">
                            <div className='contestDetail__content__firstPrize__border'>
                                <div className="contestDetail__content__firstPrize__title">
                                    <h1>{prizeList[0].description}</h1>
                                    <h2>{prizeList[0].name}: {prizeList[0].value} VNĐ</h2>
                                </div>
                                <div className="contestDetail__content__firstPrize__prize">
                                    <img src="https://picsum.photos/400/400" alt="" />
                                    {/* <h3>Winner Name: {rewardList[0].post.ownerName}</h3>
                                    <h3>Sum Of Star: {rewardList[0].post.sumOfStar}</h3> */}
                                </div>
                            </div>
                        </div>
                        {/* Other Prize */}
                        <Grid className='contestDetail__content__ortherPrize' container >
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className="contestDetail__content__ortherPrize__title">
                                    <h1>{prizeList[1].description}</h1>
                                    <h2>{prizeList[1].name}: {prizeList[1].value} VNĐ</h2>
                                </div>
                                <div className="contestDetail__content__ortherPrize__prize">
                                    <img src="https://picsum.photos/400/400" alt="" />
                                    {/* <h3>Winner Name: {rewardList[1].post.ownerName}</h3>
                                    <h3>Sum Of Star: {rewardList[1].post.sumOfStar}</h3> */}
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className="contestDetail__content__ortherPrize__title">
                                    <h1>{prizeList[2].description}</h1>
                                    <h2>{prizeList[2].name}: {prizeList[2].value} VNĐ</h2>
                                </div>
                                <div className="contestDetail__content__ortherPrize__prize">
                                    <img src="https://picsum.photos/400/400" alt="" />
                                    {/* <h3>Winner Name: {rewardList[2].post.ownerName}</h3>
                                    <h3>Sum Of Star: {rewardList[2].post.sumOfStar}</h3> */}
                                </div>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <></>
                }
                {/* =======================================RUNNER */}
                <div className="runner">
                    <div className="runner__container">
                        <h1>RUNNERS-UP</h1>

                        <Grid className='runner__container__grid' container spacing={2}>
                            {postOfContestList.data?.map((runner) => (
                                <Grid key={runner.id} item xs={3} sm={3} md={3} lg={3}>
                                    <Box className={classes.onClickOpenImgDiv} sx={{
                                        border: '1px solid black !important',
                                    }}>
                                        <CardMedia onClick={handleShowImageDialog} className={classes.onClickOpenImg} height="200" component="img" src="https://picsum.photos/400/400"
                                            sx={{
                                                border: '1px solid black !important',
                                                '&:hover': {



                                                    opacity: [0.9, 0.8, 0.7],
                                                    cursor: 'pointer',
                                                    transition: 'all 0.5s'
                                                }
                                            }}></CardMedia>
                                        <Typography>{runner.ownerName}</Typography>
                                        <Typography>{runner.content}</Typography>

                                        {/* {runner.rates?.map((rater) => {
                                            if (currentAccountId === rater.ownerId ) {
                                                setIsRate(true);
                                            }
                                        })} */}
                                        {runner.isRated === true ?
                                            <StyledRating
                                                name="customized-color"
                                                defaultValue={runner.averageStar}
                                                precision={0.5}
                                                readOnly
                                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                icon={<FavoriteIcon fontSize="inherit" />}
                                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                            />
                                            : <StyledRating
                                                name="customized-color"
                                                defaultValue={runner.averageStar}
                                                precision={0.5}
                                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                icon={<FavoriteIcon fontSize="inherit" />}
                                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                                onChange={async (event, newValue) => {
                                                    const newRate = {
                                                        numOfStart: newValue,
                                                        note: '',
                                                    }
                                                    console.log("newValue: ", newValue);
                                                    console.log("runner id: ", runner.id);
                                                    try {
                                                        const response = await eventApi.rating(runner.id, newRate);
                                                        console.log("response: ", response);

                                                        setIsRate(true);
                                                    }
                                                    catch (error) {
                                                        console.log("fail to rate: ", error)
                                                    }
                                                    setRating(runner.averageStar);
                                                }}
                                            />}


                                    </Box>
                                </Grid>
                            ))}


                        </Grid>
                        <Dialog
                            fullWidth={fullWidth}
                            maxWidth={maxWidth}
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogContent>
                                <CardMedia className={classes.media} height="700" component="img" src="https://picsum.photos/400/400"></CardMedia>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {/* =======================================Previous Contest */}

            </div >
        </>
    );
}

export default Contest;