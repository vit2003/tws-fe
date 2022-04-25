import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../../assets/css/admin.css';
import Topbar from './../topbar/Topbar';
import SidebarAdmin from './sidebar';

function AdminLayout({ children }) {

    const dispatch = useDispatch();
    const [reload, setReload] = useState(false)

    return (
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
    );
}

export default AdminLayout;