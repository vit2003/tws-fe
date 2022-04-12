import { Button } from '@mui/material';
import { Box } from '@mui/material/';
import React from 'react';
import { NavLink } from 'react-router-dom';

LeftNavigation.propTypes = {

};

function LeftNavigation(props) {
    return (
        <Box sx={{ display: 'block' }}>
            <Box>
                <NavLink activeClassName="active" to="/setting/account/edit">
                    <Button size="large" >
                        Edit Profile
                    </Button>
                </NavLink>
            </Box>
            <Box>
                <NavLink activeClassName="active" to="/setting/account/changePassword">
                    <Button size="large" >
                        Change Password
                    </Button>
                </NavLink>
            </Box>
        </Box>
    );
}

export default LeftNavigation;