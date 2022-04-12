import React from 'react';
import store from '../../../redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../../../assets/css/admin.css';
import SidebarAdmin from './sidebar';
import Topbar from './../topbar/Topbar';
import Authentication from './../../authentication/index';
import { Redirect } from 'react-router-dom';

function AdminLayout({ children }) {

    const dispatch = useDispatch();

    return (

        <Provider store={store}>
            <React.Fragment>
                <Topbar />
                <div className='container'>
                    <SidebarAdmin />
                    <div className="main-content">
                        <main>
                            {children}
                        </main>
                    </div>
                </div>


            </React.Fragment>
        </Provider>
    );
}

export default AdminLayout;