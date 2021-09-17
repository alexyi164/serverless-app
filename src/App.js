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

  async function callAPI(){
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    console.log({ token });

    const requestInfo = {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Contorl-Allow-Methods": "*",
        Authorization: token
      }
    }

    const data = await API.get('serverlessAPI', '/hello', requestInfo) 
    console.log(data);
  }

  const [imageID, setImageID] = useState('none')
  const [instanceType, setInstanceType] = useState('none')
  const [keyName, setKeyName] = useState('none')
  const [subnetID, setSubnetID] = useState('none')

  const [instanceList, setInstanceList] = useState(<div></div>)

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
              <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                <Form.Select aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Email address">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                <Form.Select aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <br></br>
          <Button variant="primary" type="submit" >
            Submit
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