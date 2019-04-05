export const getCommandString = action =>
  action ? JSON.stringify(action.payload) : '';
