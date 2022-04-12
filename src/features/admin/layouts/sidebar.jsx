import {
    AttachMoney, ChatBubbleOutline, LineStyle, PermIdentity, Report, Timeline,
    TrendingUp, WorkOutline
} from "@material-ui/icons";
import DescriptionIcon from '@mui/icons-material/Description';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function SidebarAdmin({ reload }) {
    const currentUser = useSelector(state => state.login.infoUser)

    // useEffect(() => {
    //     if (!currentUser) {
    //         reload()
    //     }
    // }, [])
    // const [reload, setReload] = useState(false)
    // const reloadPage = () => {
    //     setReload(true);
    // }
    return (
        <div className='SidebarContainer'>

            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className="sidebarTitle">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <Link to="/admin" className="link">
                                <li className="sidebarListItem active">
                                    <LineStyle className="sidebarIcon" />
                                    Home
                                </li>
                            </Link>
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                            <li className="sidebarListItem">
                                <TrendingUp className="sidebarIcon" />
                                Sales
                            </li>
                        </ul>
                    </div>
                    {
                        currentUser.role === 0 && <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Admin</h3>
                            <ul className="sidebarList">
                                <Link to="/admin/account" className="link">
                                    <li className="sidebarListItem">
                                        <PermIdentity className="sidebarIcon" />
                                        Account
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    }
                    {
                        currentUser.role === 1 &&
                        <>
                            <div className="sidebarMenu">
                                <h3 className="sidebarTitle">Manager</h3>
                                <ul className="sidebarList">
                                    <Link to="/admin/group" className="link">
                                        <li className="sidebarListItem">
                                            <AttachMoney className="sidebarIcon" />
                                            Group
                                        </li>
                                    </Link>
                                </ul>
                            </div>


                            <div className="sidebarMenu">
                                <h3 className="sidebarTitle">Manage Post</h3>
                                <ul className="sidebarList">
                                    <Link to="/admin/post" className="link">
                                        <li className="sidebarListItem">
                                            <DynamicFeedIcon className="sidebarIcon" />
                                            Post
                                        </li>
                                    </Link>
                                    <Link to="/admin/tradingPost" className="link">
                                        <li className="sidebarListItem">
                                            <DynamicFeedIcon className="sidebarIcon" />
                                            Trading Post
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className="sidebarMenu">
                                <h3 className="sidebarTitle">Manage Contest</h3>
                                <ul className="sidebarList">
                                    <Link to="/admin/contest" className="link">
                                        <li className="sidebarListItem">
                                            <EmojiEventsIcon className="sidebarIcon" />
                                            Contest
                                        </li>
                                    </Link>
                                    <Link to="/admin/prize" className="link">
                                        <li className="sidebarListItem">
                                            <WorkspacePremiumIcon className="sidebarIcon" />
                                            Prize
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className="sidebarMenu">
                                <h3 className="sidebarTitle">Orther</h3>
                                <ul className="sidebarList">

                                    <Link to="/admin/bill" className="link">
                                        <li className="sidebarListItem">
                                            <DescriptionIcon className="sidebarIcon" />
                                            Bill
                                        </li>
                                    </Link>
                                    <Link to="/admin/feedback" className="link">
                                        <li className="sidebarListItem">
                                            <ChatBubbleOutline className="sidebarIcon" />
                                            Feedback
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className="sidebarMenu">
                                <h3 className="sidebarTitle">Staff</h3>
                                <ul className="sidebarList">
                                    <li className="sidebarListItem">
                                        <WorkOutline className="sidebarIcon" />
                                        Manage
                                    </li>
                                    <li className="sidebarListItem">
                                        <Timeline className="sidebarIcon" />
                                        Analytics
                                    </li>
                                    <li className="sidebarListItem">
                                        <Report className="sidebarIcon" />
                                        Reports
                                    </li>
                                </ul>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>
    );
}