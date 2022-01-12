import React from "react";
import ProfessionalShot from '../../images/professional_shot.jpeg';
import { Container, Card, ListGroup, ListGroupItem, Accordion, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

function About() {
  return (
  <Container>
    <h1 style={{'marginTop': '40px'}}>About GetVocalToGov</h1>
    <Card>
      <Card.Header style={{'fontSize': '30px', "backgroundColor": "#73C6B6"}}>About the App</Card.Header>
      <Card.Body>
        <Card.Title style={{'fontSize': '20px'}}><i>What is GetVocalToGov?</i></Card.Title>
        <Card.Text>
          GetVocalToGov is true to its name in that it is an application meant to help facilitate communication with a User's representatives. 
          There were two main goals I wanted this app to accomplish:
        </Card.Text>
        <div>
          <ul>
            <li>Lower the barrier for citizens to petition their representatives</li>
            <li>Act as an idea exchange for local and federal policy</li>
          </ul> 
        </div>
        <hr className="my-3" />
        <Card.Title style={{'fontSize': '20px'}}><i>How does it work?</i></Card.Title>
        <Accordion defaultActiveKey="" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header><Card.Title style={{'fontSize': '15px'}}><i><b>Retrieving a User's Representitives</b></i></Card.Title></Accordion.Header>
            <Accordion.Body>
                <Card.Text>
                  When a User registers, they are required to enter their residential address. This address is verified through an external service before being stored in the database. 
                  The address is then used to retrieve the User's Government representatives, from the President of The United States to their local officials. The list of representatives 
                  along with their contact information can be found on the User's <Link to={'/profile'}>profile</Link> page under the 'Representatives' tab.
                </Card.Text>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><Card.Title style={{'fontSize': '15px'}}><i><b>Posts</b></i></Card.Title></Accordion.Header>
            <Accordion.Body>
                <Card.Text>
                  A Post, in this context, is a User generated record containing information and commentary about a current event. Users can create then edit and/or delete posts they own. Any User
                  can read or bookmark/unbookmark a Post from the main <Link to={'/posts'}>Post feed</Link>. Posts are meant to create awareness of current events and to inspire Users to generate Templates to petition their Representatives.
                </Card.Text>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><Card.Title style={{'fontSize': '15px'}}><i><b>Templates</b></i></Card.Title></Accordion.Header>
            <Accordion.Body>
                <Card.Text>
                  A Template, in this context, is a User generated title and body of an email one would send to their Representative. Here is a 
                  sample <a target="_blank" rel="noopener noreferrer" href="https://www.nlacrc.org/home/showdocument?id=272">reference</a> of how 
                  one could structure Template content. Users can create Templates on a Post's details page in relation to that Post or independently 
                  unattached to a Post. They can then update and/or delete Templates they own. All Users can read and favorite/unfavorite Templates from 
                  the <Link to={'/templates'}>Template feed</Link>.
                </Card.Text>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header><Card.Title style={{'fontSize': '15px'}}><i><b>Intended Flow</b></i></Card.Title></Accordion.Header>
            <Accordion.Body>
              <Card.Text>
                How I envisioned the User experience when building this app was the User looking through and contributing to the Post and Template feeds.
                As they create and tag (bookmark Posts/ favorite Templates), they can navigate to their <Link to={'/profile'}>profile</Link> page where they
                can quick copy Templates, find the appropriate Representative's contact information, go to their website, and send the message!
              </Card.Text>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <hr className="my-3" />
        <Card.Title style={{'fontSize': '20px'}}><i>Technology Stack</i></Card.Title>
        <Row className='justify-content-md-center'>
          <ListGroup style={{'width': '75%'}}>
            <ListGroupItem variant="primary" style={{'textAlign': 'left'}}><b>Front-end:</b> React, Axios, React-Bootstrap, React Router, React Hook Form, Yup schema validation</ListGroupItem>
            <ListGroupItem variant="primary" style={{'textAlign': 'left'}}><b>Back-end:</b> Node.js, Express, Node-postgres, jsonwebtoken, jsonschema, bcrypt, winston, Axios, dotenv, colors, cors</ListGroupItem>
            <ListGroupItem variant="primary" style={{'textAlign': 'left'}}><b>Testing:</b> Jest, React-Testing-Library</ListGroupItem>
            <ListGroupItem variant="primary" style={{'textAlign': 'left'}}><b>Database:</b> Postgres</ListGroupItem>
            <ListGroupItem variant="primary" style={{'textAlign': 'left'}}><b>APIs Integrated:</b> <a href="https://developers.google.com/civic-information">Google Civic Information API</a>, <a href="https://www.easypost.com/docs/api">EasyPost API</a></ListGroupItem>
          </ListGroup>
        </Row>
      </Card.Body>
    </Card>
    <Card style={{'marginTop': '20px'}}>
      <Card.Header style={{'fontSize': '30px', "backgroundColor": "#73C6B6"}}>About the Developer</Card.Header>
      <Card.Body>
        <Row>
          <Col sm={12} md={6}>
            <Card.Title style={{'marginTop': '30px'}}>Let's Connect!</Card.Title>
            <Card.Text>Hello! Thank you very much for taking the time to check out CashView! I am a Software Engineer in the Jacksonville, Florida area, 
              passionate about building tools to help people! If you are looking for a motivated Engineer, please feel free 
              to <a href="mailto:brycebeckenbach@gmail.com">reach out</a> to see how I can help your organization!</Card.Text>
              <div className="social-links-container">
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/bryce-beckenbach-52a5276a/" style={{'marginLeft': '5px', 'marginRight': '5px', 'marginBottom': '5px'}}><i className="fab fa-linkedin fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/bbeckenb" style={{'marginLeft': '5px', 'marginRight': '5px', 'marginBottom': '5px'}}><i className="fab fa-github-square fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="mailto:brycebeckenbach@gmail.com" style={{'marginLeft': '5px', 'marginRight': '5px', 'marginBottom': '5px'}}><i className="fas fa-envelope-square fa-2x"></i></a>
              </div>
          </Col>
          <Col sm={12} md={6}>
            <h3>Bryce Beckenbach</h3>
            <img src={ProfessionalShot} className="card-img-top" alt="Bryce Beckenbach" style={{'height': '300px', 'width': '200px'}} />
            <h5 className="card-title" style={{'marginTop': '10px'}}>Software Engineer</h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Container>
     );
}

export default About;