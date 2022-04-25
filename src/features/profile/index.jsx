import { Avatar, AppBar, Toolbar, IconButton, Box, Button, Slide, Card, Container, Typography, Chip, Stack, DialogActions, DialogContent } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import WishList from './../../components/Header/WishList';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import groupApi from './../../api/groupApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import accountApi from './../../api/accountApi';
import postApi from './../../api/postApi';
import Header from './../../components/Header/index';
import PostSkeleton from './../../components/PostSkeleton/PostSkeleton';
import PostList from './../group/components/PostList/index';
import tradingPostApi from './../../api/TradingPostApi';
import TradingPostDetail from './../exchange/components/TradingPostDetail/TradingPostDetail';
import TradingPostList from './../exchange/components/TradingPostList/TradingPostList';
import Swal from 'sweetalert2';
import proposalApi from './../../api/proposalApi';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    cssBtn: {
        backgroundColor: '#db36a4 !important',
        "&:hover": {
            backgroundColor: "#0f0c29 !important",
        },
        color: 'white !important',
    }


}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

UserProfile.propTypes = {

};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function UserProfile(props) {

    const currentAccount = useSelector(state => state.login.infoUser);
    const history = useHistory();
    const classes = useStyles();

    const [account, setAccount] = useState({});

    const { params: { accountId } } = useRouteMatch();

    const [value, setValue] = React.useState(0);

    const [postList, setPostList] = useState([]);
    const [tradingPostList, setTradingPostList] = useState([]);
    const [reload, setReload] = useState(false);

    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 99,
    })

    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

    const [loading, setLoading] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    // Open Dialog
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('md');
    const [openFollowingDlg, setOpenFollowingDlg] = useState(false);
    const [openFollowerDlg, setOpenFollowerDlg] = useState(false);
    const [openFavorite, setOpenFavorite] = useState(false);
    const [openWishList, setOpenWishList] = useState(false);
    const [favoTitle, setFavoTitle] = useState('');
    const [favoId, setFavoId] = useState('');
    const [openProposalList, setOpenProposalList] = useState(false);
    // OPEN DIALOG FOLLOWING
    const handleClickOpenFollowing = async () => {
        try {
            const followingData = await accountApi.getFollowing(accountId)
            setFollowingList(followingData)
        } catch (error) {
            console.log('Failed to fetch followingData By Id', error)
        }
        setOpenFollowingDlg(true);
    };

    // OPEN DIALOG FOLLOWER
    const handleClickOpenFollower = async () => {
        try {
            const followerData = await accountApi.getFollower(accountId)
            setFollowerList(followerData)
        } catch (error) {
            console.log('Failed to fetch followerData By Id', error)
        }
        setOpenFollowerDlg(true);
    };

    const handleOpenWishlist = () => {
        setOpenWishList(true)
    };



    const handleClose = (value) => {
        setOpenFollowerDlg(false);
        setOpenFollowingDlg(false);
        setOpenFavorite(false)
        setOpenWishList(false)
        setOpenProposalList(false);
    };


    useEffect(() => {
        const fetchAccountById = async () => {
            try {
                const response = await accountApi.getDetailAccountById(accountId)
                setAccount(response)
            } catch (error) {
                console.log('Failed to fetch Account By Id', error)
            }
        }
        fetchAccountById();
    }, [accountId, reload])


    const [proposals, setProposals] = useState([])

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await proposalApi.getAllByAccountId(accountId)
                setProposals(response)
            } catch (error) {
                console.log('Failed to fetch proposal By Id', error)
            }
        }
        fetchProposal();
    }, [accountId, reload])

    useEffect(() => {
        (async () => {
            try {
                const [postListData, tradingPostListData] = await Promise.all([
                    postApi.getAllByAccount(accountId, filters),
                    tradingPostApi.getAllByAccount(accountId, filters)

                ]);
                setPostList(postListData.data)
                setTradingPostList(tradingPostListData.data)
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch toy', error)

            }
            setLoading(false)
        })()
    }, [accountId, reload])

    const handleUnfollow = async () => {
        try {
            const reponse = await accountApi.unFollowAccount(accountId);
            setReload(!reload);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    const handleFollow = async () => {
        try {
            const reponse = await accountApi.unFollowAccount(accountId);
            setReload(!reload);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const handleOpenEdit = () => {
        history.push(`/setting/account/${currentAccount.accountId}`, account)
    }

    const handleDeleteWishList = (id, name) => {
        setOpenFavorite(true)
        setFavoTitle(name)
        setFavoId(id)
    }
    const handleDeleteWish = async () => {
        try {
            const newDeleteId = {
                id: parseInt(favoId)
            }
            await accountApi.deleteWishList(newDeleteId)
            setReload(!reload);
            await Swal.fire(
                'Delete Wish List successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        setOpenFavorite(false)
    }

    const [groupList, setGroupList] = useState([]);
    useEffect(async () => {
        const fetchGroup = async () => {
            try {
                const response = await groupApi.getAllGroup()
                setGroupList(response)
            } catch (error) {
                console.log('Failed to fetch groupList', error)
            }
        }
        fetchGroup();
    }, [])

    // WISH LIST
    let groupIdsSelect = [];
    const handleSelect = async (id) => {
        if (!groupIdsSelect.includes(id)) {
            groupIdsSelect.push(id)
        } else {
            const index = groupIdsSelect.indexOf(id);
            groupIdsSelect.splice(index, 1);
        }
    };

    // const pushUserWishList = {
    //     ...currentAccount,
    //     isHasWishlist: true,
    // }

    const handleSubmitWishList = async () => {
        try {
            const newWishList = {
                groupIds: groupIdsSelect
            }
            await accountApi.addWishList(newWishList);
            setReload(!reload);
            await Swal.fire(
                'Add Wish Lish successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        setOpenWishList(false);
    }

    const [proposalItem, setProposalItem] = useState({})

    const handleOpenProposalList = (proposal) => {
        setProposalItem(proposal)
        setOpenProposalList(true)
    }
    const handleDeleteProposal = async () => {
        try {
            await proposalApi.deleteProposal(proposalItem.id);
            await Swal.fire(
                'Delete successfully',
                'Click Button to continute!',
                'success'
            )
            setOpenProposalList(false)
            setProposalItem({})
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>

            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box sx={{
                                textAlign: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}>
                                <Avatar sx={{ margin: '10px auto', height: '200px', width: '200px' }} src={account.avatar}></Avatar>
                                <Typography>{account.name}</Typography>
                                {
                                    accountId == currentAccount.accountId ? <Button className={classes.cssBtn} onClick={handleOpenEdit}>Edit Profile</Button> :
                                        accountId !== currentAccount.accountId && account.isFollowed === false ? <Button className={classes.cssBtn} onClick={handleFollow}>Follow</Button> :
                                            accountId !== currentAccount.accountId && account.isFollowed === true ? <Button className={classes.cssBtn} onClick={handleUnfollow}>Unfollow</Button> : <></>
                                }

                            </Box>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    p: 2,
                                    m: 1,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                }}
                            >
                                <Box onClick={handleClickOpenFollower} sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <Typography >{account.noOfFollower}</Typography>
                                    <Typography>Follower</Typography>
                                </Box>
                                <Box onClick={handleClickOpenFollowing} sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                        transition: 'all 0.5s'
                                    },
                                }}>
                                    <Typography>{account.noOfFollowing}</Typography>
                                    <Typography>Following</Typography>
                                </Box>
                                <Box>
                                    <Typography>{account.noOfPost}</Typography>
                                    <Typography>Post</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                textAlign: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}>
                                <Typography sx={{ fontSize: '1.5rem', fontFamily: "Wallpoet !important", textTransform: 'uppercase', background: "-webkit-linear-gradient(#c31432, #2C5364)", WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }}>My Proposals</Typography>
                                {proposals?.map((proposal, index) => (
                                    <Box
                                        onClick={() => handleOpenProposalList(proposal)}
                                        key={index}
                                        sx={{
                                            height: '50px',
                                            '&:hover': {
                                                opacity: [0.9, 0.8, 0.7],
                                                cursor: 'pointer',
                                                transition: 'all 0.5s'
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '20px', fontStyle: 'italic', color: 'gray' }}>Contest: {proposal?.title}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader
                                    title="Biography"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {account.biography}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography sx={{ mb: 2 }}>
                                        My Favorite
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        {account.wishLists?.map((wl, index) => (
                                            <Chip
                                                label={wl.name}
                                                variant="outlined"
                                                onDelete={() => handleDeleteWishList(wl.id, wl.name)}
                                            />
                                        ))}
                                        <Chip label={<AddIcon />}
                                            variant="outlined"
                                            onClick={handleOpenWishlist}
                                        />
                                    </Stack>
                                </CardContent>

                            </Card>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Post" {...a11yProps(0)} />
                                        <Tab label="Trading Post" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    {loading ? <PostSkeleton /> : <PostList postList={postList} reload={() => setReload(!reload)} />}
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {loading ? <PostSkeleton /> : <TradingPostList tradingPostList={tradingPostList} reload={() => setReload(!reload)} />}
                                </TabPanel>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* dialog Following */}
                <Dialog fullWidth={fullWidth} maxWidth={maxWidth} onClose={handleClose} open={openFollowingDlg}>
                    <DialogTitle sx={{ width: '100%' }}>Following Account</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        {followingList.map((following) => (
                            <ListItem button key={following.id}>
                                <ListItemAvatar>
                                    <Avatar src={following.avatar}></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={following.name} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>

                {/* dialog Follower */}
                <Dialog fullWidth={fullWidth} maxWidth={maxWidth} onClose={handleClose} open={openFollowerDlg}>
                    <DialogTitle>Follower Account</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        {followerList.map((follower) => (
                            <ListItem button key={follower.id}>
                                <ListItemAvatar>
                                    <Avatar src={follower.avatar}></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={follower.name} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>

                {/* dialog Delete */}
                <Dialog fullWidth={fullWidth} maxWidth={maxWidth} onClose={handleClose} open={openFavorite}>
                    <DialogTitle sx={{ width: '100%', textAlign: 'center' }}>
                        Are you sure to delete {favoTitle} from your wish list
                    </DialogTitle>
                    <DialogActions>
                        <Button sx={{ color: 'black !important' }} onClick={handleClose} autoFocus>
                            Cancle
                        </Button>
                        <Button sx={{ color: '#db36a4 !important' }} onClick={handleDeleteWish}>Delete</Button>
                    </DialogActions>



                </Dialog>

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={openWishList}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: '#0F2027' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1, textAlign: 'center', }} variant="h6" component="div">
                                Select your favorite
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleSubmitWishList}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Container>
                        <Grid container spacing={2} sx={{ mt: 5 }}>
                            {
                                groupList?.filter(({ id: id1 }) => !account.wishLists?.some(({ id: id2 }) => id2 === id1)).map((group, index) => (
                                    <Grid key={index} item xs={6} onClick={() => handleSelect(group.id)}>
                                        <WishList group={group} />
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </Container>
                </Dialog>

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={openProposalList}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '1.5rem' }}>
                        proposal of {proposalItem.title}
                    </DialogTitle>
                    <DialogContent>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Title</td>
                                    <td>{proposalItem?.title}</td>
                                </tr>
                                <tr>
                                    <td>Reasone</td>
                                    <td>
                                        {(proposalItem?.reasone?.split('\n'))?.map((res, index) => (
                                            <li key={index}>{res}</li>
                                        ))}
                                    </td>
                                </tr>
                                {/* {(contest?.description?.split('\n'))?.map((des, index) => (
                                    <li key={index}>{des}</li>
                                ))} */}
                                <tr>
                                    <td>Slogan</td>
                                    <td>
                                        {(proposalItem?.slogan?.split('\n'))?.map((slog, index) => (
                                            <li key={index}>{slog}</li>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>
                                        {(proposalItem?.description?.split('\n'))?.map((des, index) => (
                                            <li key={index}>{des}</li>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rule</td>
                                    <td>
                                        {(proposalItem?.rule?.split('\n'))?.map((des, index) => (
                                            <li key={index}>{des}</li>
                                        ))}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: '#db367e' }} onClick={handleDeleteProposal}>Delete Proposal</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}

export default UserProfile;