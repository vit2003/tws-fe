import { NotificationsNone } from "@material-ui/icons";
import { Avatar, IconButton, Menu, MenuItem, Badge } from '@mui/material/';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutAccount } from "../../../redux/actions/login";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chat from '@mui/icons-material/Chat';

import "./Topbar.css";


Topbar.propTypes = {

};

function Topbar({ reload }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.login.infoUser);
    // console.log("infoUser: ", currentUser);

    // useEffect(() => {
    //     if (!currentUser) {
    //         reload()
    //     }
    // }, [])
    // NOTI OPEN
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
            <MenuItem>Noti</MenuItem>
            <MenuItem>Noti</MenuItem>
            <MenuItem>Noti Noti</MenuItem>
            <MenuItem>Noti Noti</MenuItem>
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
                        <Badge badgeContent={4} color="error">
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
                        <Badge badgeContent={17} color="error">
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
        </div>
    );
}

export default Topbar;