import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RepresentativeCard({ name, party, phones, urls, emails, photoUrl }) {

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><b>{party}</b></ListGroupItem>
                    {/* <ListGroupItem><b>Location: </b>{address}</ListGroupItem> */}
                    <ListGroupItem><b>Phone: </b>{phones}</ListGroupItem>
                    <ListGroupItem><b>urls: </b>
                        <ListGroup className="list-group-flush">
                        {urls.map((u) => <ListGroupItem>
                            <a 
                                href={u}
                                rel="noopener noreferrer"
                                target="_blank"
                            >{u}
                            </a>
                            </ListGroupItem>)}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </>
    )
}

export default RepresentativeCard;
