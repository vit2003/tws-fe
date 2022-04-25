import { Box } from '@mui/material/';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from './../../components/Header/index';
import ListPage from './ListPage.jsx';
import DetailPage from './ListPage.jsx/DetailPage';

Toys.propTypes = {

};

function Toys(props) {
    const match = useRouteMatch();

    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <Box pt={4}>
                <Switch>
                    <Route path={match.url} exact component={ListPage} />
                    <Route path={`${match.url}/:toyId`} component={DetailPage} />
                </Switch>
                {/* <ListPage /> */}
            </Box>

        </div>
    );
}

export default Toys;