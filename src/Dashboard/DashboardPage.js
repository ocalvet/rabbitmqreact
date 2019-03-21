import React from 'react';
import xmlFormatter from 'xml-formatter';
import {
  Typography,
  Button,
  withStyles,
  FormControl,
  TextField
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
    params: '',
    response: null
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
  }

  handleMessageReceived = (sub, message) => {
    const jsonBody = JSON.parse(message);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(jsonBody.response, 'text/xml');
    console.log(xmlDoc);
    const xmlString = new XMLSerializer().serializeToString(
      xmlDoc.documentElement
    );
    const options = {
      indentation: '  ',
      stripComments: true,
      collapseContent: true
    };
    const formattedXml = xmlFormatter(xmlString, options);
    this.setState({ response: formattedXml });
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
          <pre>{this.state.response || <div>No Response available</div>}</pre>
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
