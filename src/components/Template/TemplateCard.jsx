import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <Card style={{"padding": "0px", "marginTop": "5px", "marginBottom": "5px"}}>
                <Card.Header as="h3" style={{"backgroundColor": "#F1948A"}}><b>{title}</b>
                </Card.Header>
                <Card.Header style={{"backgroundColor": "#F2D7D5"}}>
                {currUser !== null ? (
                        <ButtonGroup >
                            <Button onClick={() => toggleFavorite(id)} className="btn btn-warning">{favorite ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}</Button>
                            <Button onClick={() => copyTemplate(body)} className="btn btn-info"><i className="far fa-copy"></i></Button>
                        </ButtonGroup>
                        ) : null}
                </Card.Header>
                <Card.Body style={{"backgroundColor": "#FFFFF6"}}>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {body}
                    </p>
                    <footer className="blockquote-footer" style={{"marginTop": "5px", "marginBottom": "20px"}}>
                        Created By {userId} at {createdAt}
                    </footer>
                    </blockquote>
                    {currUser !== null && currUser.username === userId ? (
                        <ButtonGroup className="mb-2">
                            <Button onClick={() => handleDelete(id)} className="btn btn-danger">Delete</Button>
                            <Button onClick={() => history.push(`/templates/${id}/edit`)}>Edit</Button>
                        </ButtonGroup>
                    ) : null}
                </Card.Body>
            </Card>
          
    )
}

export default TemplateCard;
