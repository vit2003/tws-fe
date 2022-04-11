import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Box, Button, Card,
    CardMedia, Container, Dialog,
    DialogContent, DialogContentText, DialogTitle, Grid, IconButton, ImageList, ImageListItem, Rating, Typography, DialogActions
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import InputField from '../../../components/form-controls/InputFields';
import eventApi from "./../../../api/eventApi";
import prizeApi from "./../../../api/prizeApi";
import Header from "./../../../components/Header/index";
import { useForm } from 'react-hook-form';
import Runner from './../Runner/Runner';
import Swal from 'sweetalert2'
import RunnerClosed from './../RunnerClosed/RunnerClosed';
import LazyLoad from 'react-lazyload';

import "./Contest.scss";



Contest.propTypes = {};

const useStyle = makeStyles((theme) => ({
    root: {},
    onClickOpenImgDiv: {
        position: "relative",
        textAlign: "center",
        padding: "10px",
        boxShadow: "6px 6px #000",
        backgroundColor: "#fff",
    },
    onClickOpenImg: {
        filter: "brightness(90%)",
    },
    media: {
        objectFit: "contain",
        minWidth: "auto",
        minHeight: "auto",
    },
    btn: {
        color: '#c31432 !important',
    },
    closeBtn: {
        position: 'absolute !important',
        // top: 0,
        bottom: 0,
        right: 0,
        color: 'black',
        backgroundColor: 'rgba(219, 54, 164, 0.3)'
    },
}));

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

function Contest(props) {
    const { params: { contestId }, } = useRouteMatch();
    const currentAccount = useSelector((state) => state.account.current);
    const currentAccountId = currentAccount.accountId;
    // console.log("currentAccount: ", currentAccount);
    // console.log("currentAccountId: ", currentAccountId);

    // STYLE FOR INPUT IMAGE
    const Input = styled('input')({
        display: 'none',
    });

    const classes = useStyle();

    // STATE RATING
    const [rating, setRating] = useState(2);

    // STATE LOADING
    const [loading, setLoading] = useState(true);

    // STATE OBJ CONTEST
    const [contest, setContest] = useState({});

    // STATE LIST PRIZE
    const [prizeList, setPrizeList] = useState([]);

    // STATE REWARD LIST
    const [rewardList, setRewardList] = useState([]);

    // STATE REWARD LIST
    const [top3List, setTop3List] = useState([]);

    // STATE RUNNER LIST
    const [postOfContestList, setPostOfContestList] = useState({});

    // CHECK JOIN CONTEST
    const [isAttended, setIsAttended] = useState(false);

    // STATE FOR DIALOG
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("md");

    const [reload, setReload] = useState(false)

    // STATE IMAGE DIALOG
    const [open, setOpen] = useState(false);

    // STATE RUNNER DIALOG
    const [openRunnerDialog, setOpenRunnerDialog] = useState(false);

    // STATE RUNNER IS RATE
    const [isRate, setIsRate] = useState(false);

    // STATE URL SHOW IMAGE
    const [urlImg, setUrlImg] = useState("");

    // =========FOR FORM=============
    // STATE IMAGE TO PUSH FIREBASE
    const [strgImg, setStrgImg] = React.useState([]);

    // STATE TO SHOW IMAGE
    const [inputImage, setInputImage] = React.useState([]);

    // REF TO INPUT IMG
    const inputRef = React.useRef();

    // STATE RUNNER IS RATE
    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 99
    });

    // ===================
    // SHOW IMAGE DIALOG
    const handleShowImageDialog = () => {
        setOpen(true);
    };

    // SHOW RUNNER DIALOG
    const handleOpenDialogForRunner = async () => {
        setOpenRunnerDialog(true)
    }

    // CLOSE DIALOG
    const handleClose = () => {
        setOpen(false);
        setOpenRunnerDialog(false);
        setInputImage([]);
    };

    // GET  FIREBASE STORAGE
    const storage = getStorage();
    // REF TO LOGO CONTEST
    const storageRef = ref(storage, `/Toy/prize1.png`);

    // CALL API CHECK ATTENDED THEN SET STATE
    useEffect(() => {
        (async () => {
            try {
                const response = await eventApi.checkAttended(contestId);
                // console.log("check attended: ", response);
                setIsAttended(response.isJoinedToContest);
            } catch (error) {
                console.log("Failed to fetch contest data", error);
            }
        })();
    }, [contestId, isAttended]);

    // useEffect(async () => {
    //     await getDownloadURL(storageRef)
    //         .then((url) => {
    //             setUrlImg(url);
    //             console.log("url: ", url);
    //         })
    //         .catch((error) => {
    //             console.log("error: ", error);
    //         });
    // }, [])

    // GET API CONTEST, PRIZE,
    useEffect(() => {
        (async () => {
            try {
                const [contestInfoData, prizeData] = await Promise.all([
                    eventApi.getContestDetail(contestId),
                    prizeApi.getPrizeByContestId(contestId),
                ]);

                setContest(contestInfoData);
                setPrizeList(prizeData);
            } catch (error) {
                console.log("Failed to fetch contest data", error);
            }
            setLoading(false);
        })();
    }, [contestId]);

    // GET REWARD AND TOP3
    useEffect(() => {
        (async () => {
            try {
                const [rewardData, top3Data] = await Promise.all([
                    eventApi.getReward(contestId),
                    eventApi.getTop3(contestId),
                ]);
                setRewardList(rewardData);
                setTop3List(top3Data);
            } catch (error) {
                console.log("Failed to fetch contest data", error);
            }
        })();
    }, []);


    // CALL POST OF CONTEST 
    useEffect(() => {
        (async () => {
            try {
                const postOfContestData = await eventApi.getPostOfContest(contestId, filters);
                setPostOfContestList(postOfContestData);
            } catch (error) {
                console.log("Failed to fetch contest data", error);
            }
        })();
    }, [contestId, reload]);

    // console.log("contestId: ", contestId)
    // console.log("contest: ", contest);
    // console.log("prizeList: ", prizeList)
    // console.log("rewardList: ", rewardList);
    console.log("postOfContestList: ", postOfContestList)

    // DateFormat df = new SimpleDateFormat("YYYY-MM-DDThh:mm:ssTZD");

    // HANDLE JOIN CONTEST
    const handleJoinContest = async () => {
        try {
            const response = await eventApi.joinToContest(contestId);
            console.log("response: ", response);
            setIsAttended(true);
        } catch (error) {
            console.log("faile to join contestId: ", error);
        }
    };


    // ========================FORM==============================
    // DISPLAY SELECTED IMAGE
    const handleFileChange = (event) => {
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].type === 'image/png' || event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/jpg' || event.target.files[i].type === 'image/gif') {
                image.push(URL.createObjectURL(event.target.files[i]))
                storageImage.push(event.target.files[i]);
            }
        }
        setStrgImg(storageImage);
        setInputImage(image);
    };

    // Choose image and video
    const handleChoose = (event) => {
        inputRef.current.click();
    };

    // handle deleted iamge and video
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    }

    const form = useForm({
        defaultValues: {
            content: '',
        },
    })


    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    const imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        // console.log("objImage: ", strgImg)
        for (let i = 0; i < strgImg.length; i++) {
            const storageRefRunner = ref(storage, `/Runner/${strgImg[i].name}`)
            // console.log(strgImg[i].name)
            await uploadBytes(storageRefRunner, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRefRunner)
                .then((url) => {
                    imagesLink.push(url)
                    console.log("url: ", url);
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        }
    }

    // HANDLE SUBMIT RUNNER POST
    const handleSubmitRunner = async (values) => {
        await uploadAndGetLinkImg()
        try {
            const newRunnerPost = {
                content: values.content,
                imagesUrl: imagesLink,
            }
            const response = await eventApi.createRunnerPost(contestId, newRunnerPost)
            console.log("newRunnerPost: ", newRunnerPost);
            setOpenRunnerDialog(false);
            setReload(!reload);
            await Swal.fire(
                'Post your toy successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("faile to join contestId: ", error);
            setOpenRunnerDialog(false);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        form.reset();
        setInputImage([]);

    };
    console.log("contest status: ", contest?.status);

    // RENDER JOIN CONTEST BTN & POST RUNNER BTN
    const renderBtn = () => {
        switch (isAttended) {
            case false:
                switch (contest.status) {
                    case 1:
                        return (
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: "#c31432",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "#0f0c29 !important",
                                    },
                                }}
                                onClick={handleJoinContest}
                            >
                                Join To Contest
                            </Button>
                        );
                    case 2:
                        return (
                            <Button disabled variant="contained"
                                sx={{
                                    backgroundColor: "#c31432",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "#0f0c29 !important",
                                    },
                                }}
                            >
                                It's out of date, closed Registration
                            </Button>
                        );
                    case 3:
                        return (
                            <Button disabled variant="contained"
                                sx={{
                                    backgroundColor: "#c31432",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "#0f0c29 !important",
                                    },
                                }}
                            >
                                It's out of date, closed Registration
                            </Button>
                        );
                    case 4:
                        <></>;
                }
            case true:
                switch (contest.status) {
                    case 1:
                        return (
                            console.log("attended 1"),
                            (
                                <Button disabled variant="contained"
                                    sx={{
                                        backgroundColor: "#c31432",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor:
                                                "#0f0c29 !important",
                                        },
                                    }}
                                >
                                    You were Attended, please wait until it
                                    opens
                                </Button>
                            )
                        );
                    case 2:
                        return (
                            console.log("attended 2"),
                            (
                                <Button disabled variant="contained"
                                    sx={{
                                        backgroundColor: "#c31432",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor:
                                                "#0f0c29 !important",
                                        },
                                    }}
                                >
                                    You were Attended, please wait until it
                                    opens
                                </Button>
                            )
                        );
                    case 3:
                        return (
                            console.log("attended 3"),
                            (
                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: "#c31432",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor:
                                                "#0f0c29 !important",
                                        },
                                    }}
                                    onClick={handleOpenDialogForRunner}
                                >
                                    Post Your Toy
                                </Button>
                            )
                        );
                    case 4:
                        <></>;
                }
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ paddingTop: "70px" }}></Box>

            {/* CONTEST INFO */}
            <div className="contestDetail">
                {/* CONTEST BANNER CAROUSEL */}
                <div className="contest__carousel">
                    <Container sx={{ height: "100%", display: "flex", alignItems: "center" }} >
                        <Grid container direction="row" justifyContent="center" alignItems="center" >

                            {/* LOGO CONTEST */}
                            <Grid item xs={4}>
                                <LazyLoad>
                                    {/* <img width="400px" src={urlImg} /> */}
                                    <img width="400px" src={contest.coverImage} />
                                </LazyLoad>

                            </Grid>
                            {/* CONTEST TITLE AND SLOGAN */}
                            <Grid sx={{ display: "flex", alignItems: "center" }} item xs={8} >
                                <div className="contest__carousel__text">
                                    <h1 className="title">{contest.title}</h1>
                                    <h2 className="slogan">{contest.slogan}</h2>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                {/* CONTEST DESCRIPTION AND RULE */}
                <div className="contest__rule">
                    <Container>
                        {contest ? (
                            <div className="contest__rule__content">
                                <h1>CONTEST RULES AND DETAILS</h1>
                                {/* DATE OF CONTEST */}
                                <div className="contest__date">
                                    <h4>Date of competition:</h4>
                                    <ul>
                                        <li>
                                            Start Registration: {contest?.startRegistration}
                                            {/* {format(new Date(contest.startRegistration), ' dd-MM-yyyy - HH:mm')} */}
                                        </li>
                                        <li>
                                            End Registration: {contest?.endRegistration}
                                            {/* {format(new Date(contest.endRegistration), ' dd-MM-yyyy - HH:mm')} */}
                                        </li>
                                        <li>
                                            State Date: {contest?.startDate}
                                            {/* {format(new Date(contest.startDate), ' dd-MM-yyyy - HH:mm')} */}
                                        </li>
                                        <li>
                                            End Date: {contest?.endDate}
                                            {/* {format(new Date(contest.endDate), ' dd-MM-yyyy - HH:mm')} */}
                                        </li>
                                    </ul>
                                </div>

                                {/* CONTEST DESCRIPTION */}
                                <div className="contest__description">
                                    <h4>Description:</h4>
                                    <ul>
                                        {(contest?.description?.split('\n'))?.map((des, index) => (
                                            <li key={index}>{des}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CONTEST RULE */}
                                <div className="contest__description">
                                    <h4>Rule:</h4>
                                    <ul>
                                        {(contest?.rule?.split('\n'))?.map((rule, index) => (
                                            <li key={index}>{rule}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CONTEST PRIZE */}
                                <LazyLoad>
                                    {prizeList.length > 0 ? (
                                        <div className="contest__prize">
                                            <h4>PRIZES TO BE WON</h4>
                                            <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center">
                                                {prizeList?.map((prize, index) => (
                                                    <Grid key={index} item xs={4}>
                                                        <div className="contest__prize__image">
                                                            <img src={prize.images[0].url} alt="img1" />
                                                        </div>
                                                        <h4>{prize.name}</h4>
                                                        <h5>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prize.value)}</h5>

                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    ) : <></>}
                                </LazyLoad>

                                <div className="joinBtn"> {renderBtn()} </div>
                            </div>
                        ) : (<></>)
                        }
                    </Container>
                </div>

                {/* TOP 3 LIST */}
                <LazyLoad>
                    {
                        contest.status == 3 & top3List?.length && <>
                            <div className="contestDetail__content__firstPrize">
                                <div className="contestDetail__content__firstPrize__border">
                                    <div className="contestDetail__content__firstPrize__title">
                                        <h1>TOP 1 RUNNER</h1>
                                        <h2>{top3List[0]?.ownerName}</h2>
                                    </div>
                                    <div className="contestDetail__content__firstPrize__prize">
                                        <img src={top3List[0]?.images[0].url} alt="" />
                                    </div>
                                </div>
                            </div>
                            <Grid className="contestDetail__content__ortherPrize" container >
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <div className="contestDetail__content__ortherPrize__title">
                                        <h1>TOP 2 RUNNER</h1>
                                        <h2>{top3List[1]?.ownerName}</h2>
                                    </div>
                                    <div className="contestDetail__content__ortherPrize__prize">
                                        <img src={top3List[1]?.images[0].url} alt="" />
                                    </div>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <div className="contestDetail__content__ortherPrize__title">
                                        <h1>TOP 3 RUNNER</h1>
                                        <h2>{top3List[2]?.ownerName}</h2>
                                    </div>
                                    <div className="contestDetail__content__ortherPrize__prize">
                                        <img src={top3List[2]?.images[0].url} alt="" />
                                    </div>
                                </Grid>
                            </Grid>
                        </>

                    }
                </LazyLoad>

                {/* REWARD LIST */}
                <LazyLoad>
                    {contest.status == 4 & rewardList?.length &&
                        <>
                            <div className="contestDetail__content__firstPrize">
                                <div className="contestDetail__content__firstPrize__border">
                                    <div className="contestDetail__content__firstPrize__title">
                                        <h1>{rewardList[0]?.prizes.description}</h1>
                                        <h2>{rewardList[0]?.prizes.name}:{" "}{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rewardList[0].prizes.value)}</h2>
                                    </div>
                                    <div className="contestDetail__content__firstPrize__prize">
                                        <img src={rewardList[0]?.post.images[0].url} alt="" />
                                    </div>
                                </div>
                            </div>
                            <Grid className="contestDetail__content__ortherPrize" container >
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <div className="contestDetail__content__ortherPrize__title">
                                        <h1>{rewardList[1]?.prizes.description}</h1>
                                        <h2>{rewardList[1]?.prizes.name}:{" "}{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rewardList[1].prizes.value)}</h2>
                                    </div>
                                    <div className="contestDetail__content__ortherPrize__prize">
                                        <img src={rewardList[1]?.post.images[0].url} alt="" />
                                    </div>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <div className="contestDetail__content__ortherPrize__title">
                                        <h1>{rewardList[2]?.prizes.description}</h1>
                                        <h2>{rewardList[2]?.prizes.name}:{" "}{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rewardList[2].prizes.value)}</h2>
                                    </div>
                                    <div className="contestDetail__content__ortherPrize__prize">
                                        <img src={rewardList[2]?.post.images[0].url} alt="" />
                                    </div>
                                </Grid>
                            </Grid>
                        </>
                    }
                </LazyLoad>


                {/* CONTEST RUNNER */}
                {isAttended & contest.status == 3 ?
                    <>
                        {
                            postOfContestList?.data?.length > 0 && contest?.status == 3 ?
                                <div className="runner">
                                    <div className="runner__container">
                                        <h1>RUNNERS-UP</h1>
                                        <Grid className="runner__container__grid" container spacing={2} >
                                            {postOfContestList.data?.map((runner) =>
                                                <Runner key={runner.id} runner={runner} contest={contest} contestId={contestId} reload={() => setReload(!reload)} />
                                            )}
                                        </Grid>
                                    </div>
                                </div> : <></>
                        }
                    </>
                    : <></>
                }
                {
                    contest.status === 4 && <>
                        {
                            postOfContestList.data?.length > 0 ?
                                <div className="runner">
                                    <div className="runner__container">
                                        <h1>RUNNERS-UP</h1>
                                        <Grid className="runner__container__grid" container spacing={2} >
                                            {postOfContestList.data?.map((runner) =>
                                                <RunnerClosed key={runner.id} runner={runner} contest={contest} />
                                            )}
                                        </Grid>
                                    </div>
                                </div> : <></>
                        }
                    </>
                }

                {
                    contest.status === 4 && <>
                        <Box sx={{ height: '300px', width: '100%', textAlign: 'center' }}>
                            <Typography sx={{ fontSize: '3vw', fontWeight: 'bold', color: '#080C3921', lineHeight: '0.8em', lettrSpacing: '4.4px', mb: 3 }}>CONGRATULATIONS TO ALL</Typography>
                            <Typography sx={{ fontSize: '18px', color: '#403B4A', mb: 2 }}>
                                The Toy World Contest Team, the Judges and the Sponsors of the contest thank you for your participation and hope to see you next season!
                            </Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#434343', mb: 2 }}>
                                The 3 winners will be contacted by email to send the prizes!
                            </Typography>
                            <Typography sx={{ fontSize: '18px', color: '#403B4A', mb: 2 }}>
                                Your project does not appear in the gallery? It is possible that it was not selected for example because of a breach of the rules. Do not hesitate to contact us for more information.
                            </Typography>

                        </Box>
                    </>
                }


                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={openRunnerDialog}
                    onClose={handleClose}
                >
                    <form onSubmit={form.handleSubmit(handleSubmitRunner)}>
                        <DialogTitle sx={{ textAlign: 'center', borderBottom: '1px solid #d3d3d3', backgroundColor: '#c31432', color: 'white', textTransform: 'uppercase' }}>Create your post</DialogTitle>

                        <DialogContent sx={{ marginTop: '30px' }}>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We
                                will send updates occasionally.
                            </DialogContentText>

                            <InputField name='content' label='Content' form={form} />
                            <label htmlFor="contained-button-file">
                                <Input accept="image/* " id="contained-button-file" type="file" onChange={handleFileChange} />
                                <Button sx={{ backgroundColor: "#c31432 !important" }} variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />}>
                                    Photo</Button>


                            </label>


                            {inputImage.length ?
                                <Card variant="outlined" sx={{ padding: '10px', marginTop: 2, position: 'relative' }}>
                                    <ImageList variant="masonry" cols={3} gap={8}>
                                        {inputImage.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <ImageListItem key={index}>
                                                    <img
                                                        src={image}
                                                        alt={'image'}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            </div>
                                        ))}
                                    </ImageList>
                                    <IconButton className={classes.closeBtn} onClick={handleDeleteSelectedSource}>
                                        <CloseIcon />
                                    </IconButton>
                                </Card>
                                : <></>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button color='inherit' onClick={handleClose}>Cancel</Button>
                            <Button className={classes.btn} type='submit'>Post</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </>
    );
}

export default Contest;
