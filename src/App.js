import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardPage from './Dashboard/DashboardPage';
import ConfigurationPage from './Configuration/ConfigurationPage';
import Header from './shared/Header/Header';
import SideMenu from './shared/SideMenu/SideMenu';
import { styles } from './AppStyles';

class App extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header open={this.state.open} onOpenDrawer={this.handleDrawerOpen} />
          <SideMenu open={this.state.open} onCloseDrawer={this.handleDrawerClose} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route path="/" exact component={DashboardPage} />
            <Route path="/configuration" component={ConfigurationPage} />
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);