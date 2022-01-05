import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// <i class="fal fa-copy"></i> for quick copy

function TemplateCard({ id, title, body, userId, createdAt, handleDelete }) {
    const [favorite, setFavoriteStatus] = useState()
    const { currUser, hasFavorited, addFavorite, removeFavorite } = useContext(UserContext);
    const history = useHistory();
    
    useEffect(function updateFavoriteStatus() {
        setFavoriteStatus(hasFavorited(id));
    }, [id, hasFavorited]);

    async function toggleFavorite(id) {
        if(favorite) {
            await removeFavorite(id);
        } else {
            await addFavorite(id) 
        }
        setFavoriteStatus(!favorite);
    }

    function copyTemplate(templateBody) {
        let outputString = 'Dear [TITLE] [LAST NAME],\n\n';
        outputString += `${templateBody}\n\n`;
        outputString += 'Sincerely,\n\n';
        outputString += `${currUser.firstName} ${currUser.lastName}`;
        navigator.clipboard.writeText(outputString);
    }

    return (
        <>
            <Card>
                <Card.Header>{title} 
                    {currUser !== null ? (
                        <Button onClick={() => copyTemplate(body)} className="btn btn-secondary"><i className="far fa-copy"></i></Button>)
                         : null}
                </Card.Header>
                <Card.Body>
                    {currUser !== null ? (
                    <button onClick={() => toggleFavorite(id)}>
                        {favorite ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
                    </button>) : null}
                    <blockquote className="blockquote mb-0">
                    <p>
                        {body}
                    </p>
                    <footer className="blockquote-footer">
                        Created By {userId} at {createdAt}
                    </footer>
                    </blockquote>
                    {currUser !== null && currUser.username === userId ? (
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
