import { Avatar, Box, Button, Card, Container, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
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
    console.log("currentAccount: ", currentAccount);
    const history = useHistory();
    const classes = useStyles();

    const [account, setAccount] = useState({});
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xs');
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
    const [openFollowingDlg, setOpenFollowingDlg] = React.useState(false);
    const [openFollowerDlg, setOpenFollowerDlg] = React.useState(false);

    // OPEN DIALOG FOLLOWING
    const handleClickOpenFollowing = async () => {
        try {
            const followingData = await accountApi.getFollowing(accountId)
            console.log("followingData: ", followingData);
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
            console.log("followerData: ", followerData);
            setFollowerList(followerData)
        } catch (error) {
            console.log('Failed to fetch followerData By Id', error)
        }
        setOpenFollowerDlg(true);
    };
    const handleClose = (value) => {
        setOpenFollowerDlg(false);
        setOpenFollowingDlg(false);
    };


    useEffect(() => {
        const fetchAccountById = async () => {
            try {
                const response = await accountApi.getDetailAccountById(accountId)
                console.log("response: ", response);
                setAccount(response)
            } catch (error) {
                console.log('Failed to fetch Account By Id', error)
            }
        }
        fetchAccountById();
    }, [accountId, reload])

    console.log("account: ", account);

    useEffect(() => {
        (async () => {
            try {
                const [postListData, tradingPostListData] = await Promise.all([
                    postApi.getAllByAccount(accountId, filters),
                    tradingPostApi.getAllByAccount(accountId, filters)

                ]);
                console.log("postListData: ", postListData);
                setPostList(postListData.data)
                setTradingPostList(tradingPostListData.data)
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch toy', error)

            }
            setLoading(false)
        })()
    }, [accountId, reload])

    // const handleGetTradingPost = async () => {
    //     try {
    //         const reponse = await tradingPostApi.getAllByAccount(accountId, filters)
    //         setTradingPostList(reponse.data)
    //     } catch (error) {
    //         console.log('Failed to fetch trading post', error)
    //     }
    // }

    const handleUnfollow = async () => {
        try {
            const reponse = await accountApi.unFollowAccount(accountId);
            setReload(!reload);
            console.log("reponse: ", reponse);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    const handleFollow = async () => {
        try {
            const reponse = await accountApi.unFollowAccount(accountId);
            setReload(!reload);
            console.log("reponse: ", reponse);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const handleOpenEdit = () => {
        history.push(`/setting/account/${currentAccount.accountId}`, account)
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

            </Container>
        </div>
    );
}

export default UserProfile;