import React from 'react';
import PropTypes from 'prop-types';
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import "./Topbar.css";
import { IconButton, Avatar, MenuItem, Menu } from '@mui/material/';
import { logout, logout2 } from '../../authentication/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout3 } from './../../../redux/actions/account';
import Authentication from '../../authentication';


Topbar.propTypes = {

};

function Topbar(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.account.infoUser);
    console.log("infoUser: ", currentUser);

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
        // dispatch(logout2(history));
        dispatch(logout3());
        return history.push('/home1121');
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
                        <Avatar src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></Avatar>
                    </IconButton>
                    {/* <img src="" alt="" className="topAvatar" /> */}
                </div>
            </div>
            {renderMenu}
        </div>
    );
}

export default Topbar;