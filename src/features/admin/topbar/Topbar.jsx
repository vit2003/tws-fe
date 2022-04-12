import { NotificationsNone } from "@material-ui/icons";
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material/';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutAccount } from "../../../redux/actions/login";
import "./Topbar.css";


Topbar.propTypes = {

};

function Topbar({ reload }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.login.login);
    // console.log("infoUser: ", currentUser);

    // useEffect(() => {
    //     if (!currentUser) {
    //         reload()
    //     }
    // }, [])

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
        handleMobileMenuClose();
    };
    const handleLogoutClick = () => {
        dispatch(logoutAccount(true));
        history.push("/")
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
            <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
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
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                    >
                        <Avatar src={currentUser?.avatar}></Avatar>
                    </IconButton>
                    {/* <img src="" alt="" className="topAvatar" /> */}
                </div>
            </div>
            {renderMenu}
        </div>
    );
}

export default Topbar;