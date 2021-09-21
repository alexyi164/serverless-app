import './App.css';
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


function App() {

  let imageID = 'ami-0c2d06d50ce30b442';
  let instanceType = 't2.micro';
  let keyName = 'key';
  let subnetID = 'ID';

  async function callAPI(e){
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    console.log({ token });

    const requestInfo = {
      body: {
        instanceType: 't.2micro',
      },
      headers: {
      }
    }

    const data = await API.get('serverlessAPI', `/launchEC2-ServerlessProjectA?AMI=${imageID}&instanceType=${instanceType}`) 
    console.log(data);
  }

  // const [imageID, setImageID] = useState('ami-0c2d06d50ce30b442')
  // const [instanceType, setInstanceType] = useState('none')
  // const [keyName, setKeyName] = useState('none')
  // const [subnetID, setSubnetID] = useState('none')

  const [instanceList, setInstanceList] = useState(<div></div>)

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
      <Button onClick={callAPI}>Call API</Button>
      <br></br>
      <Container>
        <Form>
          <Row>
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid" label="Image ID">
                <Form.Select onChange={(e) => handleAMI(e)} aria-label="Floating label select example" value=''>
                  <option>Choose an AMI</option>
                  <option value="ami-0c2d06d50ce30b442">Default</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Key Name">
                <Form.Control type="key" placeholder="key" />
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
          <Button onSubmit={(e) => callAPI(e)} variant="primary" type="submit" >
            Instance Me!
          </Button>
        </Form>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{instanceType}</td>
              <td></td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default withAuthenticator(App)