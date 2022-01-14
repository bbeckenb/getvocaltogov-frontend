import React, {useState} from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RepresentativeCard({ name, party, phones, urls, emails, photoUrl, address }) {
    const [cardColor, setCardColor] = useState(chooseColor(party));

    function chooseColor(party) {
        if (party === 'Republican Party') {
            return '#F75656'
        } else if (party === 'Democratic Party') {
            return '#48A8FA'
        } else {
            return '#CE93D8'
        }
    }



    return (
        <>
            <Card style={{"padding": "0px", "marginTop": "10px", "marginBottom": "10px"}}>
                <Card.Header as="h3" style={{backgroundColor: cardColor}}>
                    <b>{name}</b>
                </Card.Header>
               
                <ListGroup className="list-group-flush">
                    <ListGroupItem><b>{party}</b></ListGroupItem>
                    {phones ? <ListGroupItem><b>phone #: </b>{phones[0]}</ListGroupItem> : null}
                    {urls ? <ListGroupItem>
                                <a 
                                    href={urls[0]}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                ><b>website </b>
                                <span style={{"fontSize": "14px"}}> 
                                 (click to get in touch)</span>
                            </a></ListGroupItem> : null}
                    {emails ? <ListGroupItem><b>email: </b>
                        <a 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={`mailto:${emails[0]}`}>{emails[0]}</a>
                        </ListGroupItem> : null}
                    {address ? <ListGroupItem><b>Address: </b>
                        {`${address[0].locationName ? address[0].locationName+', ' : ''}
                        ${address[0].line1 ? address[0].line1+', ' : ''}
                        ${address[0].line2 ? address[0].line2+', ' : ''}
                        ${address[0].line3 ? address[0].line3+', ' : ''}
                        ${address[0].city ? address[0].city+', ' : ''}
                        ${address[0].state ? address[0].state+', ' : ''}
                        ${address[0].zip ? address[0].zip: ''}
                        `}
                    </ListGroupItem> : null}
                </ListGroup>
            </Card>
        </>
    )
}

export default RepresentativeCard;
