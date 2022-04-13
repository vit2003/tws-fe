import AccountCircle from '@mui/icons-material/AccountCircle';
import BalanceIcon from '@mui/icons-material/Balance';
import Chat from '@mui/icons-material/Chat';
import Home from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { logout } from '../../features/authentication/accountSlice';
import { logoutAccount } from '../../redux/actions/login';
import StorageKeys from './../../constants/storage-keys'
import { login } from './../../redux/actions/login';
const useStyles = makeStyles(theme => ({
  root: {

  },
  TopHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    "& .MuiPaper-root": {
      backgroundColor: 'white !important',

    },
  },
  middleHeader: {
    "& .active": {
      borderBottom: '5px solid #DB36A4 !important',
      paddingBottom: '22px',

    }
  },

}))


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// Search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black'
}));

// Input of search
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    color: 'black',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Header() {

  const classes = useStyles();
  const dispatch = useDispatch();
  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // noti
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const isNotiOpen = Boolean(anchorElNoti);

  let loggedInAccount = useSelector(state => state.login.infoUser);
  console.log("loggedInAccount", loggedInAccount);

  const AccountAvatar = loggedInAccount.avatar;
  const AccountId = loggedInAccount.accountId;

  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifiMenuOpen = (event) => {
    setAnchorElNoti(event.currentTarget);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElNoti(null);
    handleMobileMenuClose();
  };

  const handleLogoutClick = () => {
    dispatch(logoutAccount(true));
  }

  // Onclick redirect to Profile
  const handleOpenProfile = () => {
    history.push(`/account/${AccountId}`)
  }
  const handleMessage = () => {
    history.push(`/message`)
  }
  const handleOpenSetting = () => {
    // if(!AccountId) return;
    history.push(`/setting/account/${AccountId}`)
    // <Redirect to="/setting/account/edit" />
  }

  const handleOpenAdmin = () => {
    history.push(`/admin`)
  }
  const handleOpenManager = () => {
    history.push(`/manager`)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  // Menu in avatar
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted

      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
      <MenuItem onClick={handleOpenSetting}>Setting</MenuItem>
      {/* <MenuItem onClick={handleOpenProposalContest}>proposal Contest</MenuItem> */}
      {
        loggedInAccount.role == 0 ? <MenuItem onClick={handleOpenAdmin}>Admin Page</MenuItem> :
          loggedInAccount.role == 1 ? <MenuItem onClick={handleOpenManager}>Manager Page</MenuItem> : <></>
      }
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

  // RENDER MOBILE RESSPONSIVE MENU
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMessage}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Chat />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  // END OF RENDER MOBILE RESPONSIVE

  return (
    <Box className={classes.TopHeader} sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>

          {/* ===========LEFT HEADER */}
          {/* Logo toysworld */}
          <Avatar src='/2.png' sx={{ height: '70px', width: '150px' }}></Avatar>
          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* end search */}

          {/* ===============MIDDLE HEADER  */}
          <Box className={classes.middleHeader} sx={{ flexGrow: 1, textAlign: 'center', }} >

            {/* Home Icon */}
            <NavLink exact to="/home">
              <IconButton size="large" >
                <Home sx={{ fontSize: 38 }} />
              </IconButton>
            </NavLink>


            {/* Notification icon */}
            <NavLink activeClassName="active" to="/trading">
              <IconButton size="large">
                <BalanceIcon sx={{ fontSize: 38 }} />
              </IconButton>
            </NavLink>

            {/* Icon toys */}
            <NavLink to="/toys">
              <IconButton size="large">
                <Avatar src='/toys.png' sx={{ height: '38px', width: '40px' }}></Avatar>
              </IconButton>
            </NavLink>
          </Box>

          {/* =================RIGHT HEADER==========*/}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, width: 400, justifyContent: 'flex-end' }}>
            {/* Message icon */}
            <IconButton onClick={handleMessage} size="large" aria-label="show 4 new mails" >
              <Badge badgeContent={4} color="error">
                <Chat />
              </Badge>
            </IconButton>

            {/* Notification icon */}
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

            {/* Avatar account icon */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar src={AccountAvatar}></Avatar>
            </IconButton>
          </Box>

          {/* Avatar account show more ressponsive */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifi}
    </Box>
  );
}
export default Header;