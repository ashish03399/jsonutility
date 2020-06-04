import React from 'react';
import PropTypes from 'prop-types';
import JsonUtility from "../../components/JSON/JSONUtility";
import {Route} from "react-router-dom";
import {AppHeader, AppFooter} from '@coreui/react';
const DefaultFooter = React.lazy(() => import('../Footer/Footer'));
// const DefaultHeader = React.lazy(() => import('../Header/Header'));

const Dashboard = props => {
  return (
    <div>
      <Route path="/json" name="" render={props => <JsonUtility {...props}/>}/>
      <Route path="/" name="" render={props => <JsonUtility {...props}/>}/>
      {/*<AppFooter>*/}
      {/*  <DefaultFooter/>*/}
      {/*</AppFooter>*/}
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
