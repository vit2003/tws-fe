import Box from '@mui/material/Box';
import React from 'react';
import GroupBar from '../../components/GroupBar';
import Header from './../../components/Header/index';
import GroupContent from './components/GroupContent/GroupContent';



Group.propTypes = {

};
function Group(props) {
    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <GroupBar />
            <GroupContent />
        </div>
    );
}

export default Group;