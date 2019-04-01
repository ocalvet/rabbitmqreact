import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import queue from '../shared/queue';
import { withStyles } from '@material-ui/core/styles';
import { getCommandString } from '../shared/utils';
import {
  actions,
  appsuiteConnectionInfo,
  azureConnectionInfo
} from '../shared/constants';
import styles from './DashboardPageStyles';
import { uuid } from '../shared/utils';
import LocationEntry from './LocationEntry';

class DashboardPage extends React.Component {
  state = {
    params: '',
    response: null,
    transactionManager: actions.transactionManager[0].id,
    config: '',
    locationKey: '',
    payload: getCommandString(actions.transactionManager[0]),
    connectionInfo: 'AZ'
  };

  componentDidMount() {
    this.client = queue.initialize(azureConnectionInfo);
  }

  handleMessageReceived = (sub, message) => {
    const formattedText = queue.getXMLResponse(sub, message.body);
    this.setState({ response: formattedText });
  };

  handleCommandChange = command => event => {
    const id = parseInt(event.target.value);
    const action = actions[command].filter(a => a.id === id)[0];
    const oppositeCommandType =
      command === 'config' ? 'transactionManager' : 'config';
    this.setState({
      payload: getCommandString(action),
      [command]: event.target.value,
      [oppositeCommandType]: ''
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleRabbitServerSwitch = event => {
    const connectionInfo =
      event.target.value === 'AZ'
        ? azureConnectionInfo
        : appsuiteConnectionInfo;
    this.client = queue.initialize(connectionInfo);
    this.setState({
      connectionInfo: event.target.value
    });
  };

  onSendCommand = () => {
    const id = uuid();
    queue.consume(id, this.client, this.state, this.handleMessageReceived);
    queue.sendCommand(id, this.client, this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.root} autoComplete="off">
          <LocationEntry
            value={this.state.locationKey}
            handleChange={this.handleChange('locationKey')}
            classes={classes}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tmc-simple">Select Rabbit Instance</InputLabel>
            <Select
              value={this.state.connectionInfo}
              onChange={this.handleRabbitServerSwitch}
              inputProps={{
                name: 'connectionInfo',
                id: 'connectionInfo'
              }}
            >
              <MenuItem value={'AS'}>Appsuite (10.10.0.8)</MenuItem>
              <MenuItem value={'AZ'}>Azure (137.117.65.53)</MenuItem>
            </Select>
          </FormControl>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="tmc-simple">
                Transaction Manager Commands
              </InputLabel>
              <Select
                value={this.state.transactionManager}
                onChange={this.handleCommandChange('transactionManager')}
                inputProps={{
                  name: 'transactionManager',
                  id: 'tmc-simple'
                }}
              >
                <MenuItem value="">
                  <em>Select a command</em>
                </MenuItem>
                {actions.transactionManager.map(command => {
                  return (
                    <MenuItem key={command.id} value={command.id}>
                      {command.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="config-simple">
                Config Changes Commands
              </InputLabel>
              <Select
                value={this.state.config}
                onChange={this.handleCommandChange('config')}
                inputProps={{
                  name: 'config',
                  id: 'config-simple'
                }}
              >
                <MenuItem value="">
                  <em>Select a command</em>
                </MenuItem>
                {actions.config.map(command => {
                  return (
                    <MenuItem key={command.id} value={command.id}>
                      {command.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Soap Payload"
                multiline
                rows="10"
                fullWidth
                value={this.state.payload}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleChange('payload')}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </FormControl>
          </div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.onSendCommand}
          >
            Send
          </Button>
        </form>
        <div>
          Response:
          <pre>{this.state.response || <div>No Response available</div>}</pre>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardPage);
