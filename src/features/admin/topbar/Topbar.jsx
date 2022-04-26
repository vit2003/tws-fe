import { NotificationsNone } from "@material-ui/icons";
import { Avatar, IconButton, Menu, MenuItem, Badge, Box, Typography } from '@mui/material/';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutAccount } from "../../../redux/actions/login";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chat from '@mui/icons-material/Chat';

import "./Topbar.css";
import notiApi from './../../../api/notiApi';
import formatDate from './../../../utils/formatDate';


Topbar.propTypes = {

};

function Topbar({ reload }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.login.infoUser);

    // ANCHOR NOTIFICATION
    const [anchorElNoti, setAnchorElNoti] = React.useState(null);

    const isNotiOpen = Boolean(anchorElNoti);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    // const [reload, setReload] = useState(false);
    const [notiCount, setNotiCount] = useState('');
    const [notiList, setNotiList] = useState([]);
    useEffect(async () => {
        const reponse = await notiApi.getAllByAccountId(currentUser.accountId);
        setNotiList(reponse.data)
        setNotiCount(reponse.count)
    }, [3000, reload])

    const handleReaded = async (noti) => {
        if (noti.postId) {
            history.push(`/post/${noti?.postId}`)
        } else if (noti.tradingPostId) {
            history.push(`/tradingPost/${noti?.tradingPostId}`)
        } else if (noti.contestId) {
            history.push(`/contest/${noti?.contestId}`)
        }
        try {
            const itemId = {
                id: noti.id
            }
            const reponse = await notiApi.changeReaded(noti.id);
            // setReload(!reload)
            reload();
        } catch (error) {
            console.log("fail noti: ", error);
        }
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        setAnchorElNoti(null);
        handleMobileMenuClose();
    };
    const handleMessage = () => {
        history.push(`/message`)
    }
    // Onclick redirect to Profile
    const handleOpenProfile = () => {
        history.push(`/account/${currentUser.accountId}`)
    }
    const handleOpenMemberPage = () => {
        history.push("/home")
    }
    const handleLogoutClick = () => {
        dispatch(logoutAccount(true));
        history.push("/")
    }
    const handleNotifiMenuOpen = (event) => {
        setAnchorElNoti(event.currentTarget);
    };

    const handleOpenSetting = () => {
        // if(!AccountId) return;
        history.push(`/setting/account/${currentUser.accountId}`)
        // <Redirect to="/setting/account/edit" />
    }

    // HANDLE OPEN PROPOSAL PAGE
    const handleOpenProposal = () => {
        // if(!AccountId) return;
        history.push('/proposalToOpenContest')
        // <Redirect to="/setting/account/edit" />
    }

    // Menu in avatar
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
            <MenuItem onClick={handleOpenSetting}>Edit Account</MenuItem>
            <MenuItem onClick={handleOpenProposal}>Proposal Open Contest</MenuItem>
            <MenuItem onClick={handleOpenMemberPage}>Go to member page</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>

        </Menu>
    );
    // Menu in Notification
    const notifiId = 'primary-search-account-menu';
    const renderNotifi = (
        <Menu
            anchorEl={anchorElNoti}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={notifiId}
            keepMounted
            open={isNotiOpen}
            onClose={handleMenuClose}
        >
            {notiList?.map((noti, index) => (
                <MenuItem key={index} sx={{ backgroundColor: noti.isReaded ? "#fff" : '#bdc3c7' }} onClick={() => handleReaded(noti)}>
                    <Box >
                        <Typography>
                            {noti.content}
                        </Typography>
                        <Typography>
                            {formatDate(noti.createTime)}
                        </Typography>
                    </Box>

                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    {
                        currentUser.role === 0 ? <span className="logo">ToyWorld Admin</span> :
                            currentUser.role === 1 ? <span className="logo">ToyWorld Manager</span> : <></>
                    }

                </div>
                <div className="topRight">
                    {/* <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div> */}
                    <IconButton onClick={handleMessage} size="large" aria-label="show 4 new mails" >
                        <Badge>
                            <Chat />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        aria-controls={notifiId}
                        aria-haspopup="true"
                        onClick={handleNotifiMenuOpen}
                    >
                        <Badge badgeContent={notiCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                    >
                        <Avatar src={currentUser.avatar}></Avatar>
                    </IconButton>
                    {/* <img src="" alt="" className="topAvatar" /> */}
                </div>
            </div>
            {renderMenu}
            {renderNotifi}
        </div>
    );
}

export default Topbar;