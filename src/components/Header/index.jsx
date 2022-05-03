import AccountCircle from '@mui/icons-material/AccountCircle';
import BalanceIcon from '@mui/icons-material/Balance';
import Chat from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Home from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Button, Container, Grid, Slide, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logoutAccount } from '../../redux/actions/login';
import SearchBar from '../SearchBar/SearchBar';
import accountApi from './../../api/accountApi';
import groupApi from './../../api/groupApi';
import notiApi from './../../api/notiApi';
import tradingPostApi from './../../api/TradingPostApi';
import StorageKeys from './../../constants/storage-keys';
import { setAccount } from './../../redux/actions/login';
import formatDate from './../../utils/formatDate';
import WishList from './WishList';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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

function Header({ reloadWl }) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  let loggedInAccount = useSelector(state => state.login.infoUser);
  console.log("loggedInAccount: ", loggedInAccount);

  const AccountAvatar = loggedInAccount.avatar;
  const AccountId = loggedInAccount.accountId;
  const [reload, setReload] = useState(false);
  const [notiCount, setNotiCount] = useState('');
  const [notiList, setNotiList] = useState([]);
  useEffect(async () => {
    const reponse = await notiApi.getAllByAccountId(AccountId);
    setNotiList(reponse.data)
    setNotiCount(reponse.count)
  }, [3000, reload])

  // const countNoti = notiList.map(noti => noti.isReaded === false);

  const [openWishList, setOpenWishList] = useState(false);
  const handleClose = () => {
    setOpenWishList(true);
  };

  const [isSubmitWL, setIsSubmitWL] = useState(false)

  useEffect(() => {
    if (loggedInAccount.isHasWishlist === false) {
      setOpenWishList(true)
      // reload()
    }
  }, [isSubmitWL])

  const [groupList, setGroupList] = React.useState([]);
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

  // ANCHOR MENU
  const [anchorEl, setAnchorEl] = React.useState(null);

  // ANCHOR MENU
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // MENU MOBILE OPEN
  const isMenuOpen = Boolean(anchorEl);

  // MENU MOBILE OPEN
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // ANCHOR NOTIFICATION
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);

  // NOTI OPEN
  const isNotiOpen = Boolean(anchorElNoti);
  // HANDLE OPEN PROFILE MENU
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // HANDLE OPEN NOTI MENU
  const handleNotifiMenuOpen = (event) => {
    setAnchorElNoti(event.currentTarget);
  };


  // HANDLE CLOSE MENU
  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElNoti(null);
    handleMobileMenuClose();
  };

  // HANDLE LOGOUT
  const handleLogoutClick = () => {
    dispatch(logoutAccount(true));
  }

  // HANDLE OPEN PROFILE PAGE
  const handleOpenProfile = () => {
    history.push(`/account/${AccountId}`)
  }

  // HANDLE OPEN MSG PAGE
  const handleMessage = () => {
    history.push(`/message`)
  }

  // HANDLE OPEN SETTING PAGE
  const handleOpenSetting = () => {
    // if(!AccountId) return;
    history.push(`/setting/account/${AccountId}`)
    // <Redirect to="/setting/account/edit" />
  }
  // HANDLE OPEN PROPOSAL PAGE
  const handleOpenProposal = () => {
    // if(!AccountId) return;
    history.push('/proposalToOpenContest')
    // <Redirect to="/setting/account/edit" />
  }

  // HANDLE OPEN ADMIN PAGE
  const handleOpenAdmin = () => {
    history.push(`/admin`)
  }

  // HANDLE OPEN ADMIN PAGE
  const handleOpenManager = () => {
    history.push(`/manager`)
  }

  // AVATAR MENU
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
      <MenuItem onClick={handleOpenProposal}>Proposal Open Contest</MenuItem>
      {/* <MenuItem onClick={handleOpenProposalContest}>proposal Contest</MenuItem> */}
      {
        loggedInAccount.role == 0 && <MenuItem onClick={handleOpenAdmin}>Admin Page</MenuItem> ||
        loggedInAccount.role == 1 && <MenuItem onClick={handleOpenManager}>Manager Page</MenuItem>
      }
      <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
    </Menu>
  );

  // SEARCH FUNTION
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  function search(users) {
    return users.filter((user) => {
      return searchParam.some((newUser) => {
        return (
          user[newUser]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }


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
      setReload(!reload)
    } catch (error) {
      console.log("fail noti: ", error);
    }
  }

  // NOTIFICATION MENU
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
            <Typography sx={{ color: '#485563', fontSize: '13px', fontStyle: 'italic' }}>
              {formatDate(noti.createTime)}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );

  // HANDLE OPEN MOBILE MENU
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // HANDLE CLOSE MOBILE MENU 
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

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
          <Badge>
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
          <Badge badgeContent={notiCount} color="error">
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
  // END OF RENDER MOBILE RESPONSIV

  const [tradingPost, setTradingPost] = useState([]);
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 99
  })

  useEffect(async () => {
    const response = await tradingPostApi.getFind();
    setTradingPost(response);
  }, [])

  const anchorRefSearch = useRef(null);


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

  const pushUserWishList = {
    ...loggedInAccount,
    isHasWishlist: true,
  }

  const handleSubmitWishList = async () => {
    try {
      const newWishList = {
        groupIds: groupIdsSelect
      }
      const response = await accountApi.addWishList(newWishList);
      localStorage.setItem('user', JSON.stringify(pushUserWishList))
      setIsSubmitWL(!isSubmitWL)
      const pushUserEdited = {
        ...loggedInAccount,
        isHasWishlist: true,
      }
      localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(pushUserEdited))
      dispatch(setAccount(pushUserEdited));
      setOpenWishList(false);
      reloadWl()
      await Swal.fire(
        'Add wish list successfully',
        'Click button to continute!',
        'success'
      )
      setOpenWishList(false);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }



  return (
    <Box className={classes.TopHeader} sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          {/* ===========LEFT HEADER */}
          {/* Logo toysworld */}
          <Avatar src='/2.png' sx={{ height: '70px', width: '150px' }}></Avatar>

          {/* Search */}
          <SearchBar placeholder="Enter trading title..." data={tradingPost} />
          {/* END SEARCH */}

          {/* ===============MIDDLE HEADER  */}
          <Box className={classes.middleHeader} sx={{ flexGrow: 1, textAlign: 'center', }} >

            {/* Home Icon */}
            <NavLink exact to="/home">
              <IconButton size="large" >
                <Home sx={{ fontSize: 38 }} />
              </IconButton>
            </NavLink>


            {/* Notification icon */}
            <NavLink activeClassName="active" to="/trading/1">
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
              <Badge >
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
              <Badge badgeContent={notiCount} color="error">
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

      <Dialog
        fullScreen
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
            {groupList?.map((group, index) => (
              <Grid key={index} item xs={6} onClick={() => handleSelect(group.id)}>
                <WishList group={group} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Dialog>
    </Box >
  );
}
export default Header;