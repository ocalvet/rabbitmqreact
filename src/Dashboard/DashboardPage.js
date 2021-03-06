import React from 'react';
import Button from '@material-ui/core/Button';
import queue from '../shared/queue';
import { withStyles } from '@material-ui/core/styles';
import { getCommandString } from '../shared/utils';
import {
  actions,
  otherConnectionInfo,
  azureConnectionInfo
} from '../shared/constants';
import styles from './DashboardPageStyles';
import uuid from 'uuid';
import LocationEntry from './LocationEntry';
import RabbitSelector from './RabbitSelector';
import CommandSelector from './CommandSelector';
import Payload from './Payload';
import Response from './Response';

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
      event.target.value === 'AZ' ? azureConnectionInfo : otherConnectionInfo;
    this.client = queue.initialize(connectionInfo);
    this.setState({
      connectionInfo: event.target.value
    });
  };

  onSendCommand = () => {
    const id = uuid.v4();
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
          <RabbitSelector
            value={this.state.connectionInfo}
            handleChange={this.handleRabbitServerSwitch}
            classes={classes}
          />
          <div>
            <CommandSelector
              label="Transaction Manager Commands"
              value={this.state.transactionManager}
              handleChange={this.handleCommandChange('transactionManager')}
              classes={classes}
              name={'transactionManager'}
              commands={actions.transactionManager}
            />
            <CommandSelector
              label="Config Changes Commands"
              value={this.state.config}
              handleChange={this.handleCommandChange('config')}
              classes={classes}
              name={'config'}
              commands={actions.config}
            />
          </div>
          <div>
            <Payload
              payload={this.state.payload}
              handleChange={this.handleChange('payload')}
              classes={classes}
            />
          </div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.onSendCommand}
          >
            Send
          </Button>
        </form>
        <Response response={this.state.response} />
      </div>
    );
  }
}

export default withStyles(styles)(DashboardPage);
