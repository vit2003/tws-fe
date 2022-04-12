import { Container, Grid, Paper } from '@mui/material/';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './../../components/Header/index';
import LeftNavigation from './LeftNavigation/LeftNavigation';
import ChangePassword from './RightComponent/ChangePassword';
import EditAccount from './RightComponent/EditAccount';


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
                <Box component={Paper} sx={{ marginTop: '40px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sx={{ borderRight: '1px solid #ccc' }}>
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