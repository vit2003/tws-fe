import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Sidebar.scss';




// ==================TAB SIDEBAR================
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
  tradingConver: PropTypes.array,
  onChangeTrading: PropTypes.func,
  tradingPost: PropTypes.object
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// ================== END TAB SIDEBAR================


function Sidebar({ users, tradingConver, onChangeTrading, tradingPost }) {

  // CURRENT USER
  const currentUser = useSelector(state => state.login.login);
  const currentUserName = currentUser.name
  const currentUserId = currentUser.accountId


  // TRADING CONVERSATION OF CURRENT ACCOUNT
  const myTradingConver = tradingConver?.filter(trading => currentUserId == trading?.buyerId || currentUserId == trading?.sellerId);

  // STYLED COMPONENT
  const history = useHistory();
  // TAB
  const [value, setValue] = useState(0);

  // HANDLE CHANGE TAB
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ONCLICK REDIRECT CHAT

  const handleOpenChat = (id) => {
    let messageId = "";
    if (currentUserId.toString() <= id.toString()) {
      messageId = `${currentUserId}-${id}`;
    } else {
      messageId = `${id}-${currentUserId}`;
    }
    history.push(`/message/${messageId}`)
  }
  // ONCLICK REDIRECT TRADING CHAT
  const handleOpenTradingChat = (id) => {
    history.push(`/TradingMessage/${id}`)
  }

  // SEARCH
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



  const handleOnChangeTrading = () => {
    if (onChangeTrading) {
      onChangeTrading('Trading')
    }
  }

  const handleOnChangeUSerList = () => {
    if (onChangeTrading) {
      onChangeTrading('Userlist')
    }
  }
  // Onclick redirect to Profile
  const handleOpenProfile = () => {
    history.push(`/account/${currentUserId}`)
  }

  return (
    <div className='sidebarView'>

      {/* HEADER OF SIDEBAR */}
      <div className='sidebarHeader'>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', pl: 3, justifyContent: 'space-between' }}>

          <Box onClick={handleOpenProfile} sx={{
            display: 'flex', alignItems: 'center',
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
              cursor: 'pointer',
              transition: 'all 0.5s'
            },
          }}>
            <Avatar sx={{ mr: 1, }} alt="name" src={currentUser?.avatar} />
            <Typography>{currentUser?.name}</Typography>
          </Box>
          <Link to="/" className="link">
            <Box sx={{
              display: 'flex', alignItems: 'center',
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                cursor: 'pointer',
                transition: 'all 0.5s'
              },
            }}>
              <Avatar src='/2.png' sx={{ height: '37px', width: '107px' }}></Avatar>
            </Box>
          </Link>

        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Contacts" {...a11yProps(0)} />
            <Tab label="Conversation" {...a11yProps(1)} />
            <Tab label="Tradings" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </div>

      {/* CONTENT OF SIDEBAR */}
      <div className='sidebarContent'>

        {/* SEARHC IN PUT */}
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '85%', margin: "20px auto 10px", backgroundColor: '#ddd' }}
        >
          <IconButton disabled sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <InputBase
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            value={q}
            onChange={(e) => setQ(e.target.value)} />
        </Paper>

        {/* ============================== */}

        {/* TAB CONVERSATION */}
        <div className='sidebarList'>
          <TabPanel onClick={handleOnChangeUSerList} value={value} index={0}>
            {
              search(users)?.map(user => user.id !== currentUserId ? (
                <Box key={Math.random()}
                  sx={{
                    display: 'fex',
                    backgroundColor: '#ddd',
                    alignItems: 'center',
                    width: '100%',
                    height: '70px',
                    m: 1,
                    p: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: [0.9, 0.8, 0.7],
                      transition: 'all 0.5s'
                    },
                  }}
                  onClick={() => handleOpenChat(user.id)}
                >
                  <Avatar sx={{ width: 50, height: 50 }} alt="name" src={user.avatar} />
                  <Typography sx={{ pl: 1 }}>{user.name}</Typography>
                </Box>) :
                <></>)
            }

          </TabPanel>
        </div>

        <div className='sidebarList'>
          <TabPanel value={value} index={1}>
            {
              search(users)?.map(user => user.id !== currentUserId ? (
                <Box key={Math.random()}
                  sx={{
                    display: 'fex',
                    backgroundColor: '#ddd',
                    alignItems: 'center',
                    width: '100%',
                    height: '70px',
                    m: 1,
                    p: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: [0.9, 0.8, 0.7],
                      transition: 'all 0.5s'
                    },
                  }}
                  onClick={() => handleOpenChat(user.id)}
                >
                  <Avatar sx={{ width: 50, height: 50 }} alt="name" src={user.avatar} />
                  <Typography sx={{ pl: 1 }}>{user.name}</Typography>
                </Box>) :
                <></>)
            }
            {
              users?.map(user => user.id !== currentUserId ? (
                <Box key={Math.random()}
                  sx={{
                    display: 'fex',
                    backgroundColor: '#ddd',
                    alignItems: 'center',
                    width: '100%',
                    height: '70px',
                    m: 1,
                    p: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: [0.9, 0.8, 0.7],
                      transition: 'all 0.5s'
                    },
                  }}
                  onClick={() => handleOpenChat(user.id)}
                >
                  <Avatar sx={{ width: 50, height: 50 }} alt="name" src={user.avatar} />
                  <Typography sx={{ pl: 1 }}>{user.name}</Typography>
                </Box>) :
                <></>)
            }
            {
              users?.map(user => user.id !== currentUserId ? (
                <Box key={Math.random()}
                  sx={{
                    display: 'fex',
                    backgroundColor: '#ddd',
                    alignItems: 'center',
                    width: '100%',
                    height: '70px',
                    m: 1,
                    p: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: [0.9, 0.8, 0.7],
                      transition: 'all 0.5s'
                    },
                  }}
                  onClick={() => handleOpenChat(user.id)}
                >
                  <Avatar sx={{ width: 50, height: 50 }} alt="name" src={user.avatar} />
                  <Typography sx={{ pl: 1 }}>{user.name}</Typography>
                </Box>) :
                <></>)
            }
            {
              users?.map(user => user.id !== currentUserId ? (
                <Box key={Math.random()}
                  sx={{
                    display: 'fex',
                    backgroundColor: '#ddd',
                    alignItems: 'center',
                    width: '100%',
                    height: '70px',
                    m: 1,
                    p: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: [0.9, 0.8, 0.7],
                      transition: 'all 0.5s'
                    },
                  }}
                  onClick={() => handleOpenChat(user.id)}
                >
                  <Avatar sx={{ width: 50, height: 50 }} alt="name" src={user.avatar} />
                  <Typography sx={{ pl: 1 }}>{user.name}</Typography>
                </Box>) :
                <></>)
            }
          </TabPanel>
        </div>

        {/* TRADING MESSAGES */}
        <div className='sidebarList'>
          <TabPanel onClick={handleOnChangeTrading} value={value} index={2}>
            {myTradingConver?.map(conver => (
              <Box key={Math.random()}
                sx={{
                  display: 'fex',
                  backgroundColor: '#ddd',
                  alignItems: 'center',
                  width: '100%',
                  height: '70px',
                  m: 1,
                  p: 1,
                  '&:hover': {
                    cursor: 'pointer',
                    opacity: [0.9, 0.8, 0.7],
                    transition: 'all 0.5s'
                  },
                }}
                onClick={() => handleOpenTradingChat(conver.id)}
              >
                {/* <Avatar sx={{ width: 50, height: 50 }} alt="name" src={user.avatar} /> */}

                {
                  (users?.filter(user => user.id == conver.buyerId)).map(buyer => (
                    <Typography sx={{ pl: 1 }}>
                      {buyer.name} - {conver.title}
                    </Typography>
                  ))
                }

              </Box>
            ))
            }
          </TabPanel>
        </div>
      </div>
    </ div >
  );
}

export default Sidebar;