import { Button } from '@mui/material';
import { Box } from '@mui/material/';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

LeftNavigation.propTypes = {

};

function LeftNavigation(props) {

    const currentAccount = useSelector(state => state.login.infoUser);

    return (
        <Box sx={{ display: 'block' }}>
            <Box>
                <NavLink activeClassName="active" to="/setting/account/edit"
                    style={({ isActive }) =>
                        isActive
                            ? {
                                color: '#fff',
                                background: '#7600dc',
                            }
                            : { color: '#545e6f', background: '#f0f0f0' }
                    }
                >
                    <Button size="large" >
                        Edit Profile
                    </Button>
                </NavLink>
            </Box>
            <Box>
                <NavLink activeClassName="active" to="/setting/account/changePassword"
                    style={({ isActive }) =>
                        isActive
                            ? {
                                color: '#fff',
                                background: '#7600dc',
                            }
                            : { color: '#545e6f', background: '#f0f0f0' }
                    }
                >
                    <Button size="large" >
                        Change Password
                    </Button>
                </NavLink>
            </Box>
        </Box >
    );
}

export default LeftNavigation;