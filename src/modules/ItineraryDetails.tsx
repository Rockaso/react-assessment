import React from 'react';
import { Card, Radio, Typography } from 'antd';
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const appStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px'
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
};

const userInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const userInfoItemStyle: React.CSSProperties = {
  marginLeft: '10px'
};

const mainStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const flightCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const flightInfoStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px'
};

const App: React.FC = () => {
  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <Title level={2}>It_2</Title>
        <div style={userInfoStyle}>
          <UserOutlined />
          <Text style={userInfoItemStyle}>Pepe Ladino</Text>
          <QuestionCircleOutlined style={userInfoItemStyle} />
        </div>
      </header>
      <main style={mainStyle}>
        <Radio.Group>
          <Card style={flightCardStyle}>
            <Radio value="leg_1" />
            <Card.Meta
              title="Wizzair.com"
              description={
                <>
                  <Text strong>AIRLINE ID: WZ</Text>
                  <div style={flightInfoStyle}>
                    <div>
                      <Text>BUD</Text>
                      <Text>2020-10-31T15:35</Text>
                    </div>
                    <div>
                      <Text>LTN</Text>
                      <Text>2020-10-31T17:00</Text>
                    </div>
                  </div>
                  <Text>STOPS: 0</Text>
                  <Text>DURATION MINS: 145</Text>
                </>
              }
            />
          </Card>
          <Card style={flightCardStyle}>
            <Radio value="leg_5" />
            <Card.Meta
              title="British Airways"
              description={
                <>
                  <Text strong>AIRLINE ID: BA</Text>
                  <div style={flightInfoStyle}>
                    <div>
                      <Text>LHR</Text>
                      <Text>2020-11-11T11:25</Text>
                    </div>
                    <div>
                      <Text>BUD</Text>
                      <Text>2020-11-11T15:10</Text>
                    </div>
                  </div>
                  <Text>STOPS: 1</Text>
                  <Text>DURATION MINS: 190</Text>
                </>
              }
            />
          </Card>
        </Radio.Group>
      </main>
    </div>
  );
};

export default App;
