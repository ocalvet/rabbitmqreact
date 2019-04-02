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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300
  }
});

export default styles;
