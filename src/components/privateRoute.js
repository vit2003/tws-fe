import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import StorageKeys from './../constants/storage-keys';
import { useSelector } from 'react-redux';

function PrivateRoute({ path, component: Component, exact , roles}) {

    const currentUser = useSelector(state => state.account.current);
    return (
        <Route path={path} exact={exact} render={(props) => {
            if(currentUser && roles.includes(currentUser['role'])){
                return (<Component />);
            }
            return <Redirect to="/" />
        }} />
    );
}

export default PrivateRoute;