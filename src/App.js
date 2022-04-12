import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/css/style.css';
// import Admin from './features/admin/dashboard';
import NotFound from './components/NotFound/index';
import PrivateRoute from './components/privateRoute';
import EditAccount from './features/admin/account/edit';
import AccountManagement from './features/admin/account/index';
import BillManagement from './features/admin/bill/bill';
import ContestManagement from './features/admin/contest/index';
import Dashboard from './features/admin/dashboard';
import FeedbackManagement from './features/admin/feedback/Feedback';
import GroupManagement from './features/admin/group';
import AdminLayout from './features/admin/layouts/master';
import PostManagement from './features/admin/post';
import EditPrize from './features/admin/prize/edit';
import PrizeManagement from './features/admin/prize/prize';
import TradingPostManagement from './features/admin/tradingPost/index';
import Authentication from './features/authentication';
import Contest from './features/Contest/Contest/Contest';
import KnowMore from './features/Contest/KnowMoreContest/KnowMore';
import ViewAllContest from './features/Contest/ViewAllContest/ViewAllContest';
import TradingPostDetailPage from './features/exchange/components/TradingPostDetailPage.jsx/TradingPostDetailPage';
import Trading from './features/exchange/index';
import Group from './features/group/index';
import PostDetailPage from './features/group/PostDetailPage';
// import {useState} from "react"
// import { auth } from './Firebase/firebase';
import Home from './features/home/index';
import Message from './features/message/message';
import UserProfile from './features/profile/index';
import ProposalToOpenContest from './features/ProposalToOpenContest/index';
import SettingAccount from './features/settingAccount/SettingAccount';
import Toys from './features/toys/index';
import DetailPage from './features/toys/ListPage.jsx/DetailPage';


function App() {
  // const currentUser = useSelector(state => state.login.login);
  const currentUser = useSelector(state => state.login.infoUser);

  // if (!currentUser) return <Redirect to="/" />

  return (
    <div className="App">
      <Switch>
        {/* =========== admin router =========== */}
        <Route path='/admin/:path?'>
          <AdminLayout>
            <Switch>
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

        {/* <Route path='/' exact render={() => {
          return currentUser ? <Home /> : <Redirect to="/home" />
        }} /> */}
        <Route path="/" component={Authentication} exact />

        <Route path='/home' exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Home /> : <Redirect to="/" />
        }} />

        {/* <PrivateRoute path="/home" component={Home} exact roles={[0, 1, 2]} /> */}

        {/* <Route path="/toys" component={Toys} exact roles={[1, 2]} /> */}
        {/* <Route path="/toys/:toyId" component={DetailPage} exact roles={[1, 2]} /> */}


        <Route path="/toys" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Toys /> : <Redirect to="/" />
        }} />
        <Route path="/toys/:toyId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <DetailPage /> : <Redirect to="/" />
        }} />


        {/* <Route path="/trading" component={Trading} exact roles={[1, 2]} /> */}
        {/* <PrivateRoute path="/trading/:id" component={Trading} exact roles={[1, 2]} />
        <PrivateRoute path="/tradingPost/:postId" component={TradingPostDetailPage} exact roles={[0, 1, 2]} /> */}
        <Route path="/trading" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Trading /> : <Redirect to="/" />
        }} />
        <Route path="/trading/:id" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Trading /> : <Redirect to="/" />
        }} />
        <Route path="/tradingPost/:postId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <TradingPostDetailPage /> : <Redirect to="/" />
        }} />




        <Route path="/group/:id" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Group /> : <Redirect to="/" />
        }} />
        {/* <PrivateRoute path="/group/:id" component={Group} exact roles={[0, 1, 2]} /> */}

        <Route path="/post/:postId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <PostDetailPage /> : <Redirect to="/" />
        }} />
        {/* <PrivateRoute path="/post/:postId" component={PostDetailPage} exact roles={[0, 1, 2]} /> */}

        <Route path="/setting/account/:accountId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <SettingAccount /> : <Redirect to="/" />
        }} />
        {/* <PrivateRoute path="/setting/account/:accountId" component={SettingAccount} exact roles={[2]} /> */}
        {/* <PrivateRoute path="/setting/account/:accountId/edit" component={SettingAccount} exact roles={[2]} /> */}

        <Route path="/account/:accountId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <UserProfile /> : <Redirect to="/" />
        }} />
        {/* <PrivateRoute path="/account/:accountId" component={UserProfile} exact roles={[1, 2]} /> */}
        {/* 
        <PrivateRoute path="/proposalContest" component={ProposalToOpenContest} exact roles={[1, 2]} />
        <PrivateRoute path="/proposalContest/knowmore" component={KnowMore} exact roles={[1, 2]} /> */}
        {/* <PrivateRoute path="/viewAllContest" component={ViewAllContest} exact roles={[1, 2]} /> */}
        <Route path="/contest/:contestId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Contest /> : <Redirect to="/" />
        }} />
        {/* <PrivateRoute path="/contest/:contestId" component={Contest} exact roles={[1, 2]} /> */}

        {/* Message */}
        <Route path="/message" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Message /> : <Redirect to="/" />
        }} />
        <Route path="/message/:id" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Message /> : <Redirect to="/" />
        }} />
        <Route path="/TradingMessage" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Message /> : <Redirect to="/" />
        }} />
        <Route path="/TradingMessage/:id" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Message /> : <Redirect to="/" />
        }} />
        {/* <PrivateRoute path="/message" component={Message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/message/:id" component={Message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/TradingMessage" component={Message} exact roles={[0, 1, 2]} />
        <PrivateRoute path="/TradingMessage/:id" component={Message} exact roles={[0, 1, 2]} /> */}

        {/* Admin */}'

        {/* <PrivateRoute path="/admin" component={Dashboard} exact roles={[0, 1]} /> */}

        {/* <Route exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <NotFound /> : <Redirect to="/" />
        }} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;