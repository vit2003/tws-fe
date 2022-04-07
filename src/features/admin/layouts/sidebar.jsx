import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import  EmojiEventsIcon  from '@mui/icons-material/EmojiEvents';

export default function SidebarAdmin() {
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
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Quick Menu</h3>
                        <ul className="sidebarList">
                            <Link to="/admin/account" className="link">
                                <li className="sidebarListItem">
                                    <PermIdentity className="sidebarIcon" />
                                    Account
                                </li>
                            </Link>
                            <Link to="/admin/post" className="link">
                                <li className="sidebarListItem">
                                    <Storefront className="sidebarIcon" />
                                    Post
                                </li>
                            </Link>
                            <Link to="/admin/group" className="link">
                                <li className="sidebarListItem">
                                    <AttachMoney className="sidebarIcon" />
                                    Group
                                </li>
                            </Link>

                            <Link to="/admin/proposal" className="link">
                                <li className="sidebarListItem">
                                    <EmojiEventsIcon className="sidebarIcon" />
                                    Proposal
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Notifications</h3>
                        <ul className="sidebarList">
                            <li className="sidebarListItem">
                                <MailOutline className="sidebarIcon" />
                                Mail
                            </li>
                            <li className="sidebarListItem">
                                <DynamicFeed className="sidebarIcon" />
                                Feedback
                            </li>
                            <li className="sidebarListItem">
                                <ChatBubbleOutline className="sidebarIcon" />
                                Messages
                            </li>
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
                </div>
            </div>
        </div>
    );
}