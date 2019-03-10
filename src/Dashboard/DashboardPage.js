import React from 'react';
import { Typography, Divider, TextField, Button, withStyles } from '@material-ui/core';

class DashboardPage extends React.Component {
    state = {
        action: 'getMenuItems',
        params: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props
        return (
            <div>
                <Typography variant="title">Dashboard</Typography>
                <Divider />
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Action"
                        className={classes.textField}
                        value={this.state.action}
                        onChange={this.handleChange('action')}
                        margin="normal"
                        variant="outlined"
                    />

                    <Button variant="contained" className={classes.button}>
                        Send
                    </Button>
                </form>
                <Divider />
                <div>
                    Response:
                    <pre>
                        {JSON.stringify(this.props, null, 2)}
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
        flexDirection: 'column'
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

export default withStyles(styles)(DashboardPage);