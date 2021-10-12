import './App.css';
import TableItem from './TableItem.js';
import React, { useState } from 'react';
import axios from 'axios';

import { API, Auth } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { AmplifySignOut } from  '@aws-amplify/ui-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import Amplify from "aws-amplify";
import {AmplifyChatbot} from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);



function App() {

  let imageID = 'ami-0c2d06d50ce30b442';
  let instanceType = 't2.micro';
  let keyName = 'key';
  let subnetID = 'ID';
  let instanceID = '';
  let publicIP = '';
  let launchTime = '';

  async function callAPI(e) {
    e.preventDefault();
    setCount(count + 1);
    console.log(e);
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    console.log({ token });

    const data = await API.get('serverlessAPI', `/launchEC2-ServerlessProjectA?AMI=${imageID}&instanceType=${instanceType}`) 
  }

  async function updateTable(e) {
    e.preventDefault();

    const data = await API
    .get('serverlessAPI', `/CheckEC2Status-ServerlessProjectA`)
    .then(data => setInstanceList(data));

    console.log(instanceList);

  }

  const [instanceList, setInstanceList] = useState([])
  const [count, setCount] = useState(0)

  const handleAMI = (e) => {
    imageID = e.target.value;
    console.log(imageID);
  }
  
  const handleType = (e) => {
    instanceType = e.target.value;
    console.log(instanceType);
  }

  return (
    <div className="App">
      <div>
        <AmplifySignOut buttonText="Log Out"></AmplifySignOut>
      </div>
      <br></br>
      <Container>
        <Form onSubmit={(e) => callAPI(e)}>
          <Row>
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid" label="Image ID">
                <Form.Select onChange={(e) => handleAMI(e)} aria-label="Floating label select example">
                  <option>Choose an AMI</option>
                  <option value="ami-0c2d06d50ce30b442">Default</option>
                  <option value="ami-02e7fad8336aa2c57">SuperCool</option>
                  <option value="ami-02e7fad8336aa2c57">ExtraCool</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel controlId="floatingSelectGrid" label="Instance Type">
                <Form.Select onChange={(e) => handleType(e)} aria-label="Floating label select example">
                  <option>Choose an Instance Type</option>
                  <option value="t2.micro">t2.micro</option>
                  <option value="t2.small">t2.small</option>
                  <option value="t3.micro">t3.micro</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <br></br>
          <Button variant="dark" type="submit" >
            <strong>Instance Me!</strong>
          </Button>
        </Form>
        <br></br>
        <hr></hr>
        <br></br>
        <Button variant="dark" onClick={(e) => updateTable(e)}><FontAwesomeIcon icon={faCircleNotch}/></Button>
        <br></br>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Instance ID</th>
              <th>Instance Type</th>
              <th>Instance Public IP</th>
              <th>Launch Time</th>
            </tr>
          </thead>
          {/* <tbody>
            {instanceList}
          </tbody> */}
          <tbody>
            {instanceList.map(instance =>
              <TableItem instance={instance} key={instance.InstanceId}/>)}
          </tbody>
        </Table>
      </Container>
      <AmplifyChatbot
        botName="yourBotName"
        botTitle="My ChatBot"
        welcomeMessage="Hello, how can I help you?"
        textEnabled="true"
      />    
    </div>
  );
}

export default withAuthenticator(App)