import { Route, Switch, Redirect } from 'react-router-dom';
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
import TradingPost from './features/exchange/components/TradingPost/TradingPost';
import TradingPostDetailPage from './features/exchange/components/TradingPostDetailPage.jsx/TradingPostDetailPage';
import ContestManagement from './features/admin/contest/index';
import PrizeManagement from './features/admin/prize/prize';
import EditPrize from './features/admin/prize/edit';
import TradingPostManagement from './features/admin/tradingPost/index';
import BillManagement from './features/admin/bill/bill';
import FeedbackManagement from './features/admin/feedback/Feedback';
import Message from './features/message/Message';

function App() {
  const currentUser = useSelector(state => state.account.current);

  // if (!currentUser) return <Redirect to="/" />

  return (
    <div className="App">
      <Switch>
        {/* =========== admin router =========== */}
        <Route path='/admin/:path?'>
          <AdminLayout>
            <Switch>
              {/* <Route path='/admin' exact component={Dashboard} roles={[0, 1]} />
              <Route path='/admin/post' exact component={PostManagement} roles={[0]} />
              <Route path='/admin/account' exact component={AccountManagement} roles={[0]} />
              <Route path='/admin/account/:id' exact component={EditAccount} roles={[0]} />
              <Route path='/admin/group' exact component={GroupManagement} roles={[0, 1]} />
              <Route path='/admin/group/:id' exact component={GroupManagement} roles={[0, 1]} />
              <Route path='/admin/contest' exact component={ContestManagement} roles={[0, 1]} />
              <Route path='/admin/prize' exact component={PrizeManagement} roles={[0, 1]} />
              <Route path='/admin/prize/:id' exact component={EditPrize} roles={[0, 1]} /> */}
              <Route path='/' exact render={() => {
                return <Authentication />
              }} />
              <Route path='/admin' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <Dashboard /> : <Redirect to="/" />
              }} />

              {/* ACCOUNT MANAGEMENT */}
              <Route path='/admin/account' exact render={() => {
                return currentUser && currentUser['role'] == 0 ? <AccountManagement /> : <Redirect to="/" />
              }} />
              <Route path='/admin/account/:id' exact render={() => {
                return currentUser && currentUser['role'] == 0 ? <EditAccount /> : <Redirect to="/" />
              }} />

              {/* POST MANAGEMENT */}
              <Route path='/admin/post' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <PostManagement /> : <Redirect to="/" />
              }} />

              {/* GROUP MANAGEMENT */}
              <Route path='/admin/group' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <GroupManagement /> : <Redirect to="/" />
              }} />
              <Route path='/admin/group/:id' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <GroupManagement /> : <Redirect to="/" />
              }} />

              {/* CONTEST MANAGEMENT */}
              <Route path='/admin/contest' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <ContestManagement /> : <Redirect to="/" />
              }} />

              {/* PRIZE MANAGEMENT */}
              <Route path='/admin/prize' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <PrizeManagement /> : <Redirect to="/" />
              }} />
              <Route path='/admin/prize/:id' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <EditPrize /> : <Redirect to="/" />
              }} />

              {/* TRADING POST MANAGEMENT */}
              <Route path='/admin/tradingPost' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <TradingPostManagement /> : <Redirect to="/" />
              }} />

              {/* BILL MANAGEMENT */}
              <Route path='/admin/bill' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <BillManagement /> : <Redirect to="/" />
              }} />

              {/* BILL MANAGEMENT */}
              <Route path='/admin/feedback' exact render={() => {
                return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 ? <FeedbackManagement /> : <Redirect to="/" />
              }} />


            </Switch>
          </AdminLayout>
        </Route>

        <Route path="/" component={Authentication} exact />

        <PrivateRoute path="/home" component={Home} exact roles={[0, 1, 2]} />

        <Route path="/toys" component={Toys} exact roles={[1, 2]} />
        <Route path="/toys/:toyId" component={DetailPage} exact roles={[1, 2]} />

        <Route path="/trading" component={Trading} exact roles={[1, 2]} />

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
        <PrivateRoute path="/message" component={Message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/message/:id" component={Message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/TradingMessage" component={Message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/TradingMessage/:id" component={Message} exact roles={[0, 1, 2]} />

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