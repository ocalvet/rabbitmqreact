# Project to test connection with rabbitmq from a web client

### How to run

1. Create a .env file at the root of the project with the following:

```
REACT_APP_RABBITMQ_CONNECT_STRING_AS=ws://[hostname]:15674/ws]
REACT_APP_RABBITMQ_CONNECT_STRING_AZ=ws://[hostname]:15674/ws]
REACT_APP_RABBITMQ_VH_AS=[virtualhost]
REACT_APP_RABBITMQ_VH_AZ=[virtualhost]
REACT_APP_RABBITMQ_USER_AS=[user]
REACT_APP_RABBITMQ_USER_AZ=[user]
REACT_APP_RABBITMQ_PASSWORD_AS=[password]
REACT_APP_RABBITMQ_PASSWORD_AZ=[password]
```

2. Install dependencies `$ npm install`
3. Run application `$ npm start`
