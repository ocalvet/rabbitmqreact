import Stomp from 'stompjs';
import xmlFormatter from 'xml-formatter';

const initialize = connectionInfo => {
  const socket = new WebSocket(connectionInfo.connectString);
  const client = Stomp.over(socket);
  // client.debug = null; // comment out this line to see more logging
  client.connect(
    connectionInfo.user,
    connectionInfo.password,
    () => {
      console.log('CONNECTED');
    },
    error => {
      console.log('ERROR', error);
    },
    connectionInfo.virtualHost
  );
  return client;
};

const getXMLResponse = (sub, message) => {
  console.log('Got message', message);
  if (!message || message.lenght <= 1) {
    return `Empty message from server`;
  }
  const jsonBody = JSON.parse(message);
  if (jsonBody.command === 'config') {
    return jsonBody.response;
  }
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
  return formattedXml;
};

const consume = (id, client, state, handleMessageReceived) => {
  const responseQueue = `plugin_${state.locationKey}_response`;
  const sub = client.subscribe(`/amq/queue/${responseQueue}`, message => {
    console.log('received message', sub, message);
    if (message.headers['correlation-id'] === id) {
      handleMessageReceived(sub, message);
      sub.unsubscribe();
    }
  });
}

const sendCommand = (id, client, state) => {
  const commandQueue = `plugin_${state.locationKey}_command`;
  const responseQueue = `plugin_${state.locationKey}_response`;
  console.log(`Sending`);
  console.log(`id: ${id}`);
  console.log(`command queue: ${commandQueue}`);
  console.log(`response queue: ${responseQueue}`);
  console.log(state.payload);
  client.send(
    `/amq/queue/${commandQueue}`,
    {
      'reply-to': responseQueue,
      'correlation-id': id
    },
    state.payload
  );
};

export default {
  initialize,
  getXMLResponse,
  sendCommand, 
  consume,
};
