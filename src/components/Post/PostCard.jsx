import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostCard({ id, title, body, link, userId, tag, createdAt, location, handleDelete }) {
    const {currUser} = useContext(UserContext);
    const history = useHistory();
    return (
        <>
            <Card>
                {link ? <Card.Img variant="top" src={link} /> : null}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {body}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {link ? <ListGroupItem><a href={link}>See Article</a></ListGroupItem> : null}
                    <ListGroupItem><b>Tag: </b>{tag}</ListGroupItem>
                    <ListGroupItem><b>Location: </b>{location}</ListGroupItem>
                    <ListGroupItem><b>Created at: </b>{createdAt}</ListGroupItem>
                    <ListGroupItem><b>Author: </b>{userId}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
                {currUser !== null && currUser.user.username === userId ? (
                        <ButtonGroup className="mb-2">
                            <Button onClick={() => handleDelete(id)}>Delete</Button>
                            <Button onClick={() => history.push(`/posts/${id}/edit`)}>Edit</Button>
                        </ButtonGroup>
                    ) : null}
                </Card.Body>
            </Card>
        </>
    )
}

export default PostCard;
