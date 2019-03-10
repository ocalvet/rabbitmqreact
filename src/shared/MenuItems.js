import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

export const menu = [{
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/'
}, {
    title: 'Configuration',
    icon: <SettingsIcon />,
    path: '/configuration'
}];