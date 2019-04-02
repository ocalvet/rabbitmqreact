export const drawerWidth = 240;

export const azureConnectionInfo = {
  connectString: process.env.REACT_APP_RABBITMQ_CONNECT_STRING_AZ,
  virtualHost: process.env.REACT_APP_RABBITMQ_VH_AZ,
  user: process.env.REACT_APP_RABBITMQ_USER_AZ,
  password: process.env.REACT_APP_RABBITMQ_PASSWORD_AZ
};

export const appsuiteConnectionInfo = {
  connectString: process.env.REACT_APP_RABBITMQ_CONNECT_STRING_AS,
  virtualHost: process.env.REACT_APP_RABBITMQ_VH_AS,
  user: process.env.REACT_APP_RABBITMQ_USER_AS,
  password: process.env.REACT_APP_RABBITMQ_PASSWORD_AS
};

const postTransactionXML = `
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <PostTransactionEx xmlns="http://micros-hosting.com/EGateway/">
            <vendorCode />
            <pGuestCheck>
                <CheckDateToFire>2019-03-26T14:10:50</CheckDateToFire>
                <CheckEmployeeObjectNum>90001</CheckEmployeeObjectNum>
                <CheckGuestCount>0</CheckGuestCount>
                <CheckID />
                <CheckNum>120</CheckNum>
                <CheckOrderType>1</CheckOrderType>
                <CheckRevenueCenterID>1</CheckRevenueCenterID>
                <CheckSeq>16186347</CheckSeq>
                <CheckStatusBits>0</CheckStatusBits>
                <CheckTableObjectNum>1</CheckTableObjectNum>
                <PCheckInfoLines>
                    <string />
                    <string />
                </PCheckInfoLines>
                <EventObjectNum>0</EventObjectNum>
            </pGuestCheck>
            <ppMenuItems>
                <SimphonyPosApi_MenuItem>
                    <Condiments />
                    <MenuItem>
                        <ItemDiscount>
                            <DiscObjectNum>0</DiscObjectNum>
                        </ItemDiscount>
                        <MiObjectNum>2</MiObjectNum>
                        <MiReference />
                        <MiWeight />
                        <MiMenuLevel>1</MiMenuLevel>
                        <MiSubLevel>1</MiSubLevel>
                        <MiPriveLevel>0</MiPriveLevel>
                    </MenuItem>
                </SimphonyPosApi_MenuItem>
            </ppMenuItems>
            <ppComboMeals />
            <pTmedDetail>
                <TmedEPayment>
                    <AccountDataSource>SOURCE_UNDEFINED</AccountDataSource>
                    <AccountType>ACCOUNT_TYPE_UNDEFINED</AccountType>
                    <AuthorizationCode />
                    <BaseAmount />
                    <CashBackAmount />
                    <DeviceId />
                    <ExpirationDate>0001-01-01T00:00:00</ExpirationDate>
                    <InterfaceName />
                    <IssueNumber>0</IssueNumber>
                    <KeySerialNum />
                    <PaymentCommand>NO_E_PAYMENT</PaymentCommand>
                    <StartDate>0001-01-01T00:00:00</StartDate>
                    <TipAmount />
                    <Track1Data />
                    <Track2Data />
                </TmedEPayment>
                <TmedObjectNum>1</TmedObjectNum>
            </pTmedDetail>
            <pTotalsResponse />
            <ppCheckPrintLines />
        </PostTransactionEx>
    </soap:Body>
</soap:Envelope>
`;

const getMenuItemsXML = `
<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <GetConfigurationInfo xmlns="http://micros-hosting.com/EGateway/">
            <vendorCode />
            <employeeObjectNum>90001</employeeObjectNum>
            <configurationInfoType><int>1</int></configurationInfoType>
            <revenueCenter>1</revenueCenter>
            <configInfoResponse />
        </GetConfigurationInfo>
    </soap:Body>
</soap:Envelope>
`;

/* eslint-disable no-useless-escape */
export const actions = {
  transactionManager: [
    {
      id: 1,
      label: 'Get Menu Items',
      payload: {
        request_type: 'transaction_service',
        command: '',
        command_id: 'f0bd1536-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          request_headers: {
            SOAPAction: 'http://micros-hosting.com/EGateway/GetOpenChecks',
            'Content-Type': 'text/xml; charset=utf-8'
          },
          request_body: getMenuItemsXML
        }
      }
    },
    {
      id: 2,
      label: 'Post Transaction',
      payload: {
        request_type: 'transaction_service',
        command: '',
        command_id: 'ifjslfjdk-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          request_headers: {
            SOAPAction: 'http://micros-hosting.com/EGateway/PostTransactionEx',
            'Content-Type': 'text/xml; charset=utf-8'
          },
          request_body: postTransactionXML
        }
      }
    }
  ],
  config: [
    {
      id: 3,
      label: 'Update URL - Appsuite',
      payload: {
        request_type: 'config',
        command: '',
        command_id: '3242iuouou-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          host: '10.10.0.8',
          port: '15674'
        }
      }
    },
    {
      id: 4,
      label: 'Update URL - Azure',
      payload: {
        request_type: 'config',
        command: '',
        command_id: '3242iuouou-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          host: '137.117.65.53',
          port: '15674'
        }
      }
    },
    {
      id: 5,
      label: 'Update Log Level - Debug',
      payload: {
        request_type: 'config',
        command: '',
        command_id: 'dsafsd2-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          logLevel: 'debug'
        }
      }
    },
    {
      id: 6,
      label: 'Update Log Level - Verbose',
      payload: {
        request_type: 'config',
        command: '',
        command_id: 'dsafsd2-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          logLevel: 'verbose'
        }
      }
    },
    {
      id: 7,
      label: 'Update Log Level - Quiet',
      payload: {
        request_type: 'config',
        command: '',
        command_id: '231dfds-b9d0-45f3-bbbe-6e2b8aae4c5a',
        data: {
          logLevel: 'quiet'
        }
      }
    }
  ]
};
