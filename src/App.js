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

            </Switch>
          </AdminLayout>
        </Route>


        <Route path='/manager/:path?'>
          <AdminLayout>
            <Switch>
              <Route path='/' exact render={() => {
                return <Authentication />
              }} />
              <Route path='/manager' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <Dashboard /> : <Redirect to="/" />
              }} />

              {/* POST MANAGEMENT */}
              <Route path='/manager/post' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <PostManagement /> : <Redirect to="/" />
              }} />

              {/* GROUP MANAGEMENT */}
              <Route path='/manager/group' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <GroupManagement /> : <Redirect to="/" />
              }} />
              <Route path='/manager/group/:id' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <GroupManagement /> : <Redirect to="/" />
              }} />

              {/* CONTEST MANAGEMENT */}
              <Route path='/manager/contest' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <ContestManagement /> : <Redirect to="/" />
              }} />

              {/* PRIZE MANAGEMENT */}
              <Route path='/manager/prize' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <PrizeManagement /> : <Redirect to="/" />
              }} />
              <Route path='/manager/prize/:id' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <EditPrize /> : <Redirect to="/" />
              }} />

              {/* TRADING POST MANAGEMENT */}
              <Route path='/manager/tradingPost' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <TradingPostManagement /> : <Redirect to="/" />
              }} />

              {/* BILL MANAGEMENT */}
              <Route path='/manager/bill' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <BillManagement /> : <Redirect to="/" />
              }} />

              {/* BILL MANAGEMENT */}
              <Route path='/manager/feedback' exact render={() => {
                return currentUser && currentUser['role'] == 1 ? <FeedbackManagement /> : <Redirect to="/" />
              }} />




            </Switch>
          </AdminLayout>
        </Route>



        {/* USER PAGE */}
        <Route path="/" component={Authentication} exact />
        <Route path='/home' exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Home /> : <Redirect to="/" />
        }} />

        {/* TOY PAGE */}
        <Route path="/toys" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Toys /> : <Redirect to="/" />
        }} />
        <Route path="/toys/:toyId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <DetailPage /> : <Redirect to="/" />
        }} />


        {/* TRADING EXCHANGE */}
        <Route path="/trading" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Trading /> : <Redirect to="/" />
        }} />
        <Route path="/trading/:id" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Trading /> : <Redirect to="/" />
        }} />
        <Route path="/tradingPost/:postId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <TradingPostDetailPage /> : <Redirect to="/" />
        }} />

        {/* GROUP POST */}
        <Route path="/group/:id" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Group /> : <Redirect to="/" />
        }} />

        <Route path="/post/:postId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <PostDetailPage /> : <Redirect to="/" />
        }} />


        {/* PROFILE EDIT */}
        <Route path="/setting/account/:accountId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <SettingAccount /> : <Redirect to="/" />
        }} />
        <Route path="/account/:accountId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <UserProfile /> : <Redirect to="/" />
        }} />

        {/* CONTEST */}
        <Route path="/contest/:contestId" exact render={() => {
          return currentUser && currentUser['role'] == 0 || currentUser && currentUser['role'] == 1 || currentUser && currentUser['role'] == 2 ? <Contest /> : <Redirect to="/" />
        }} />

        {/* MESSAGE */}
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

        {/* NOT FOUND */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;