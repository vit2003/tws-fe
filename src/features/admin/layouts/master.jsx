import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import '../../../assets/css/admin.css';
import store from '../../../redux/store';
import Topbar from './../topbar/Topbar';
import SidebarAdmin from './sidebar';

function AdminLayout({ children }) {

    const dispatch = useDispatch();
    const [reload, setReload] = useState(false)

    return (
        // <Provider store={store}>
        <React.Fragment>
            <Topbar reload={() => setReload(!reload)} />
            <div className='container'>
                <SidebarAdmin reload={() => setReload(!reload)} />
                <div className="main-content">
                    <main>
                        {children}
                    </main>
                </div>
            </div>


        </React.Fragment>
        // </Provider>
    );
}

export default AdminLayout;