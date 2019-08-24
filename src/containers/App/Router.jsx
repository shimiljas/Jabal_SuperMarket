/* eslint-disable  */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';

import Splash from '../Splash';
// Sub Pages
import DashBoard from '../DashBoard';
import LimitForm from '../Limit';

import requireAuth from '../../modules/requireAuth';

import NotFound404 from '../DefaultPages/404';

import NewSale from '../Sales/new';

const Pages = () => (
  <Switch>
    <Route path='/pages/dashboard' component={DashBoard} />

    <Route path='/pages/sales/new' component={NewSale} />
    <Route path='/pages/sales/lmit' component={LimitForm} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className='container__wrap'>
      <Route path='/pages' component={requireAuth(Pages)} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path='/' component={LogIn} />
        <Route exact path='/log_in' component={LogIn} />
        <Route exact path='/splash' component={Splash} />
        <Route exact path='/404' component={NotFound404} />
        <Route path='/' component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
