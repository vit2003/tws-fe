import { Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/css/style.css';
// import Admin from './features/admin/dashboard';
import NotFound from './components/NotFound/index';
import Authentication from './features/authentication';
// import {useState} from "react"
// import { auth } from './Firebase/firebase';
import Home from './features/home/index';
import Toys from './features/toys/index';
import Group from './features/group/index';
import DetailPage from './features/toys/ListPage.jsx/DetailPage';
import PostDetailPage from './features/group/PostDetailPage';
import UserProfile from './features/profile/index';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/privateRoute';
import SettingAccount from './features/settingAccount/SettingAccount';
import Trading from './features/exchange/index';
import ProposalToOpenContest from './features/ProposalToOpenContest/index';
import KnowMore from './features/Contest/KnowMoreContest/KnowMore';
import ViewAllContest from './features/Contest/ViewAllContest/ViewAllContest';

import AdminLayout from './features/admin/layouts/master';
import Dashboard from './features/admin/dashboard';
import PostManagement from './features/admin/post';
import GroupManagement from './features/admin/group';
import AccountManagement from './features/admin/account/index';
import EditAccount from './features/admin/account/edit';
import Contest from './features/Contest/Contest/Contest';
import message from './features/message/message';
import ProposalManagerment from './features/admin/proposal/index';
import approveProposal from './features/admin/proposal/approveProposal';
import TradingPost from './features/exchange/components/TradingPost/TradingPost';
import TradingPostDetailPage from './features/exchange/components/TradingPostDetailPage.jsx/TradingPostDetailPage';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* =========== admin router =========== */}
        <Route path='/admin/:path?'>
          <AdminLayout>
            <Switch>
              <Route path='/admin' exact component={Dashboard} />
              <Route path='/admin/post' exact component={PostManagement} />
              <Route path='/admin/account' exact component={AccountManagement} />
              <Route path='/admin/account/:id' exact component={EditAccount} />
              <Route path='/admin/group' exact component={GroupManagement} />
              <Route path='/admin/group/:id' exact component={GroupManagement} />
              <Route path='/admin/proposal' exact component={ProposalManagerment} />
              <Route path='/admin/proposal/:id' exact component={approveProposal} />
            </Switch>
          </AdminLayout>
        </Route>

        <Route path="/" component={Authentication} exact />


        <PrivateRoute path="/home" component={Home} exact roles={[2]} />

        <Route path="/toys" component={Toys} />
        <Route path="/trading" component={Trading} exact />

        <PrivateRoute path="/trading/:id" component={Trading} exact roles={[1, 2]} />
        <PrivateRoute path="/tradingPost/:postId" component={TradingPostDetailPage} exact roles={[0, 1, 2]} />

        <PrivateRoute path="/group/:id" component={Group} exact roles={[0, 1, 2]} />

        <PrivateRoute path="/post/:postId" component={PostDetailPage} exact roles={[0, 1, 2]} />

        <PrivateRoute path="/setting/account/:accountId" component={SettingAccount} exact roles={[2]} />
        {/* <PrivateRoute path="/setting/account/:accountId/edit" component={SettingAccount} exact roles={[2]} /> */}

        <PrivateRoute path="/account/:accountId" component={UserProfile} exact roles={[1, 2]} />

        <PrivateRoute path="/proposalContest" component={ProposalToOpenContest} exact roles={[1, 2]} />
        <PrivateRoute path="/proposalContest/knowmore" component={KnowMore} exact roles={[1, 2]} />
        <PrivateRoute path="/viewAllContest" component={ViewAllContest} exact roles={[1, 2]} />
        <PrivateRoute path="/contest/:contestId" component={Contest} exact roles={[1, 2]} />

        {/* Message */}
        <PrivateRoute path="/message" component={message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/message/:id" component={message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/TradingMessage" component={message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/TradingMessage/:id" component={message} exact roles={[0, 1, 2]} />

        {/* Admin */}'
        
        <PrivateRoute path="/admin" component={Dashboard} exact roles={[0, 1]} />
        {/* <PrivateRoute path='/admin/post' component={PostManagement} exact roles={[0, 1]} />
        <PrivateRoute path='/admin/account' component={AccountManagement} exact roles={[0, 1]} />
        <PrivateRoute path='/admin/account/:id' component={EditAccount} exact roles={[0, 1]} />
        <PrivateRoute path='/admin/group' component={GroupManagement} exact roles={[0, 1]} />
        <PrivateRoute path='/admin/group/:id' component={GroupManagement} exact roles={[0, 1]} /> */}

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;