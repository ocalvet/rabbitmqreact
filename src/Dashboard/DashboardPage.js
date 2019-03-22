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

/* eslint-disable no-useless-escape */
const actions = [
  {
    id: 1,
    label: 'Get Menu Data',
    payload: `{
       "request_type": "transaction_service",
       "command": "",
       "command_id": "f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a",
       "data": {
           "request_headers": {
               "SOAPAction": "http://micros-hosting.com/EGateway/GetOpenChecks",
               "Content-Type": "text/xml; charset=utf-8"
           },
           "request_body": "<soap:Envelope xmlns:soap=\\"http://schemas.xmlsoap.org/soap/envelope/\\"><soap:Body><GetOpenChecks xmlns=\\"http://micros-hosting.com/EGateway/\\"><vendorCode/><employeeObjectNum>90001</employeeObjectNum></GetOpenChecks></soap:Body></soap:Envelope>"
       }
   }`
  },
  {
    id: 2,
    label: 'Post Order',
    payload: `{
       "request_type": "transaction_service",
       "command": "",
       "command_id": "f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a",
       "data": {
           "request_headers": {
               "SOAPAction": "http://micros-hosting.com/EGateway/GetOpenChecks",
               "Content-Type": "text/xml; charset=utf-8"
           },
           "request_body": "<soap:Envelope xmlns:soap=\\"http://schemas.xmlsoap.org/soap/envelope/\\"><soap:Body><GetOpenChecks xmlns=\\"http://micros-hosting.com/EGateway/\\"><vendorCode/><employeeObjectNum>90001</employeeObjectNum></GetOpenChecks></soap:Body></soap:Envelope>"
       }
   }`
  },
  {
    id: 3,
    label: 'Post Items',
    payload: `{
       "request_type": "transaction_service",
       "command": "",
       "command_id": "f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a",
       "data": {
           "request_headers": {
               "SOAPAction": "http://micros-hosting.com/EGateway/GetOpenChecks",
               "Content-Type": "text/xml; charset=utf-8"
           },
           "request_body": "<soap:Envelope xmlns:soap=\\"http://schemas.xmlsoap.org/soap/envelope/\\"><soap:Body><GetOpenChecks xmlns=\\"http://micros-hosting.com/EGateway/\\"><vendorCode/><employeeObjectNum>90001</employeeObjectNum></GetOpenChecks></soap:Body></soap:Envelope>"
       }
   }`
  },
  {
    id: 4,
    label: 'Post Services',
    payload: `{
       "request_type": "transaction_service",
       "command": "",
       "command_id": "f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a",
       "data": {
           "request_headers": {
               "SOAPAction": "http://micros-hosting.com/EGateway/GetOpenChecks",
               "Content-Type": "text/xml; charset=utf-8"
           },
           "request_body": "<soap:Envelope xmlns:soap=\\"http://schemas.xmlsoap.org/soap/envelope/\\"><soap:Body><GetOpenChecks xmlns=\\"http://micros-hosting.com/EGateway/\\"><vendorCode/><employeeObjectNum>90001</employeeObjectNum></GetOpenChecks></soap:Body></soap:Envelope>"
       }
   }`
  },
  {
    id: 5,
    label: 'Post Discounts',
    payload: `{
       "request_type": "transaction_service",
       "command": "",
       "command_id": "f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a",
       "data": {
           "request_headers": {
               "SOAPAction": "http://micros-hosting.com/EGateway/GetOpenChecks",
               "Content-Type": "text/xml; charset=utf-8"
           },
           "request_body": "<soap:Envelope xmlns:soap=\\"http://schemas.xmlsoap.org/soap/envelope/\\"><soap:Body><GetOpenChecks xmlns=\\"http://micros-hosting.com/EGateway/\\"><vendorCode/><employeeObjectNum>90001</employeeObjectNum></GetOpenChecks></soap:Body></soap:Envelope>"
       }
   }`
  },
  {
    id: 6,
    label: 'Post Payments',
    payload: `{
       "request_type": "transaction_service",
       "command": "",
       "command_id": "f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a",
       "data": {
           "request_headers": {
               "SOAPAction": "http://micros-hosting.com/EGateway/GetOpenChecks",
               "Content-Type": "text/xml; charset=utf-8"
           },
           "request_body": "<soap:Envelope xmlns:soap=\\"http://schemas.xmlsoap.org/soap/envelope/\\"><soap:Body><GetOpenChecks xmlns=\\"http://micros-hosting.com/EGateway/\\"><vendorCode/><employeeObjectNum>90001</employeeObjectNum></GetOpenChecks></soap:Body></soap:Envelope>"
       }
   }`
  }
];

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
    const sub = this.client.subscribe('/amq/queue/rpc_reply', message => {
      console.log('received message', sub, message);
      if (message.headers['correlation-id'] === id) {
        this.handleMessageReceived(sub, message.body);
        sub.unsubscribe();
      }
    });
    this.client.send(
      '/amq/queue/rpc_queue',
      {
        'reply-to': 'rpc_reply',
        'correlation-id': id
      },
      this.state.payload
    );
  };

  updatePayload = id => () => {
    const action = actions.filter(a => a.id === id)[0];
    this.setState({ payload: action.payload });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="title">Dashboard</Typography>
        <div>
          {actions.map(action => (
            <Button
              variant="contained"
              style={{ marginRight: 12, marginTop: 10 }}
              onClick={this.updatePayload(action.id)}
            >
              {action.label}
            </Button>
          ))}
        </div>
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
