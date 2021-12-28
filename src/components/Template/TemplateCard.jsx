import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TemplateCard({ id, title, body, userId, createdAt, handleDelete }) {
    const {currUser} = useContext(UserContext);
    const history = useHistory();
    return (
        <>
            <Card>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {body}
                    </p>
                    <footer className="blockquote-footer">
                        Created By {userId} at {createdAt}
                    </footer>
                    </blockquote>
                    {currUser !== null && currUser.user.username === userId ? (
                        <ButtonGroup className="mb-2">
                            <Button onClick={() => handleDelete(id)}>Delete</Button>
                            <Button onClick={() => history.push(`/templates/${id}/edit`)}>Edit</Button>
                        </ButtonGroup>
                    ) : null}
                </Card.Body>
            </Card>
        </>
    )
}

export default TemplateCard;
