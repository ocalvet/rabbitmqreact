import React from 'react';
import ReactDOM from 'react-dom';
import {
  Typography,
  Button,
  withStyles,
  FormControl,
  InputLabel,
  TextField,
  Select,
  OutlinedInput
} from '@material-ui/core';
import Stomp from 'stompjs';

function uuid() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

class DashboardPaction extends React.Component {
  state = {
    // action: 'getMenuItems',
    params: '',
    response: null,
    labelWidth: 0
  };

  componentDidMount() {
    const socket = new WebSocket(process.env.REACT_APP_RABBITMQ_CONNECT_STRING);
    this.client = Stomp.over(socket);
    this.client.debug = null; // comment out this line to see more logging
    this.client.connect(
      process.env.REACT_APP_RABBITMQ_USER,
      process.env.REACT_APP_RABBITMQ_PASSWORD,
      () => {
        console.log('CONNECTED');
      },
      error => {
        console.log('ERROR', error);
      },
      'appsuite'
    );
    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    // });
  }

  handleMessageReceived = (sub, message) => {
    this.setState({ response: message });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSendCommand = () => {
    const id = uuid();
    console.log('Sending', this.state.payload, id);
    const sub = this.client.subscribe('/amq/queue/rpc_queue', message => {
      console.log('received message', sub, message);
      if (message.headers['correlation-id'] === id) {
        this.handleMessageReceived(sub, message.body);
        sub.unsubscribe();
      }
    });
    this.client.send(
      '/amq/queue/rpc_queue',
      {
        'reply-to': 'rpc_queue',
        'correlation-id': id
      },
      this.state.payload
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="title">Dashboard</Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <FormControl variant="outlined" className={classes.formControl}>
            {/* <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-action-native-simple"
            >
              Action
            </InputLabel> */}
            {/* <Select
              native
              value={this.state.action}
              onChange={this.handleChange('action')}
              input={
                <OutlinedInput
                  name="action"
                  labelWidth={this.state.labelWidth}
                  id="outlined-action-native-simple"
                />
              }
            >
              <option value={'getMenuItems'}>Get menu items</option>
              <option value={'getConfig'}>Get configuration</option>
              <option value={'closeCheck'}>Close check</option>
              <option value={'sendCheck'}>Send check</option>
            </Select> */}
            <TextField
              id="outlined-multiline-flexible"
              label="Soap Payload"
              multiline
              rows="10"
              value={this.state.payload}
              onChange={this.handleChange('payload')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </FormControl>

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
          <pre>
            {this.state.response ? (
              JSON.stringify(this.state.response, null, 2)
            ) : (
              <div>No Response available</div>
            )}
          </pre>
        </div>
      </div>
    );
  }
}
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 16
  }
});

export default withStyles(styles)(DashboardPaction);
