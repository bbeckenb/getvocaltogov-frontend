import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function TemplateCard({ title, body, userId, createdAt }) {
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
                </Card.Body>
            </Card>
        </>
    )
}

export default TemplateCard;
