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


    return (
        <div className='SidebarContainer'>

            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className="sidebarTitle">
                        <h3 className="sidebarTitle">Dashboard</h3>


                        {
                            currentUser.role === 0 &&
                            <div className="sidebarMenu">
                                <ul className="sidebarList">
                                    <Link to="/admin" className="link">
                                        <li className="sidebarListItem active">
                                            <LineStyle className="sidebarIcon" />
                                            Home
                                        </li>
                                    </Link>
                                    {/* <li className="sidebarListItem">
                                        <Timeline className="sidebarIcon" />
                                        Analytics
                                    </li>
                                    <li className="sidebarListItem">
                                        <TrendingUp className="sidebarIcon" />
                                        Sales
                                    </li> */}
                                </ul>
                            </div>
                        }
                        {
                            currentUser.role === 1 &&
                            <div className="sidebarMenu">
                                <ul className="sidebarList">
                                    <Link to="/manager" className="link">
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
                        }


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
                                    <Link to="/manager/group" className="link">
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
                                    <Link to="/manager/post" className="link">
                                        <li className="sidebarListItem">
                                            <DynamicFeedIcon className="sidebarIcon" />
                                            Post
                                        </li>
                                    </Link>
                                    <Link to="/manager/tradingPost" className="link">
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
                                    <Link to="/manager/contest" className="link">
                                        <li className="sidebarListItem">
                                            <EmojiEventsIcon className="sidebarIcon" />
                                            Contest
                                        </li>
                                    </Link>
                                    <Link to="/manager/prize" className="link">
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

                                    <Link to="/manager/bill" className="link">
                                        <li className="sidebarListItem">
                                            <DescriptionIcon className="sidebarIcon" />
                                            Bill
                                        </li>
                                    </Link>
                                    <Link to="/manager/feedback" className="link">
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