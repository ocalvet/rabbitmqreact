import React from 'react';
import ReactDOM from 'react-dom';
import { Typography, Button, withStyles, FormControl, InputLabel, Select, OutlinedInput } from '@material-ui/core';
import Stomp  from 'stompjs';

class DashboardPaction extends React.Component {
    state = {
        action: 'getMenuItems',
        params: '',
        response: null,
        labelWidth: 0,
    };

    componentDidMount() {
        const socket = new WebSocket(process.env.REACT_APP_RABBITMQ_CONNECT_STRING);
        this.client = Stomp.over(socket);
        this.client.debug = null; // comment out this line to see more logging
        this.client.connect(process.env.REACT_APP_RABBITMQ_USER, process.env.REACT_APP_RABBITMQ_PASSWORD, () => {
            console.log('CONNECTED');
            this.client.subscribe('/queue/web-test', this.handleMessageReceived);
        }, (error) => {
            console.log('ERROR', error);
        }, 'appsuite');
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleMessageReceived = message => {
        this.setState({ response: message });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSendCommand = () => {
        console.log('Sending ' + this.state.action);
        // this.setState({ response: { title: 'testing response for ' + this.state.action }});
        this.client.send('/queue/web-test', {}, this.state.action);
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Typography variant="title">Dashboard</Typography>
                <form className={classes.container} noValidate autoComplete="off">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-action-native-simple"
                        >
                            Action
                        </InputLabel>
                        <Select
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
                            <option value={"getMenuItems"}>Get menu items</option>
                            <option value={"getConfig"}>Get configuration</option>
                            <option value={"closeCheck"}>Close check</option>
                            <option value={"sendCheck"}>Send check</option>
                        </Select>
                    </FormControl>

                    <Button variant="contained" className={classes.button} onClick={this.onSendCommand}>
                        Send
                    </Button>
                </form>
                <div>
                    Response:
                    <pre>
                        {this.state.response ? 
                            JSON.stringify(this.state.response, null, 2) :
                            <div>No Response available</div>}
                    </pre>
                </div>
            </div>
        )
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
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        width: 200
    },
    dense: {
        marginTop: 16,
    },
});

export default withStyles(styles)(DashboardPaction);