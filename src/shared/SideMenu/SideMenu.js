import React from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { menu } from '../MenuItems';
import styles from './SideMenuStyles';

const SideMenu = ({ classes, open, onCloseDrawer }) => {
    return (
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={onCloseDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menu.map(menuItem => (
              <ListItem component={Link} to={menuItem.path}>
              <ListItemIcon>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
            ))}
          </List>
        </Drawer>
    );
}

export default withStyles(styles)(SideMenu);
