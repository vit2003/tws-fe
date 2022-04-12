import React from 'react';
import PropTypes from 'prop-types';
import Header from './../../components/Header/index';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Grid, Paper } from '@mui/material/';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import LeftNavigation from './LeftNavigation/LeftNavigation';
import EditAccount from './RightComponent/EditAccount';
import { useLocation } from 'react-router-dom'
import ChangePassword from './RightComponent/ChangePassword';


SettingAccount.propTypes = {
    window: PropTypes.func,
};

// ==================================

// ==================================


function SettingAccount(props) {

    const location = useLocation();
    const pathName = location.pathname;


    return (
        <div>
            <Header />
            <Box sx={{ textAlign: 'center', paddingTop: '80px' }}></Box>

            <Container>
                <Box component={Paper} sx={{marginTop: '40px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sx={{borderRight: '1px solid #ccc'}}>
                            <LeftNavigation />
                        </Grid>
                        <Grid item xs={8}>
                            {pathName === '/setting/account/edit' ? <EditAccount /> :
                                pathName === '/setting/account/changePassword' ? <ChangePassword /> : <></>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            {/* ================ */}



            {/* ================ */}

        </div>
    );
}

export default SettingAccount;