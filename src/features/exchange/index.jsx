import React from 'react';
import PropTypes from 'prop-types';
import Header from './../../components/Header/index';
import { Box } from '@mui/material/';
import GroupBar from '../../components/GroupBar';
import TradingContent from './components/TradingContent/TradingContent';

Trading.propTypes = {
    
};

function Trading(props) {
    return (
        <div>
            <Header/>
            <Box sx={{paddingTop: '70px'}}></Box>
            <GroupBar/>
            <TradingContent/>
        </div>
    );
}

export default Trading;