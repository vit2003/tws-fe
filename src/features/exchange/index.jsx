import { Box } from '@mui/material/';
import React from 'react';
import GroupBar from '../../components/GroupBar';
import Header from './../../components/Header/index';
import TradingContent from './components/TradingContent/TradingContent';

Trading.propTypes = {

};

function Trading(props) {
    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '70px' }}></Box>
            <GroupBar />
            <TradingContent />
        </div>
    );
}

export default Trading;