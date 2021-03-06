import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardPage from './Dashboard/DashboardPage';
import ConfigurationPage from './Configuration/ConfigurationPage';
import Header from './shared/Header/Header';
import SideMenu from './shared/SideMenu/SideMenu';
import { styles } from './AppStyles';

const App = ({ classes }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Header open={open} onOpenDrawer={() => setOpen(true)} />
        <SideMenu open={open} onCloseDrawer={() => setOpen(false)} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route path="/" exact component={DashboardPage} />
          <Route path="/configuration" component={ConfigurationPage} />
        </main>
      </div>
    </Router>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
