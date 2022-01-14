import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostCard({ id, title, body, link, userId, tag, createdAt, location, handleDelete }) {
    const [bookmark, setBookmarkStatus] = useState();
    const { currUser, hasBookmarked, addBookmark, removeBookmark } = useContext(UserContext);
    const history = useHistory();

    useEffect(function updateFavoriteStatus() {
        setBookmarkStatus(hasBookmarked(id));
    }, [id, hasBookmarked]);

    async function toggleBookmark(id) {
        if(bookmark) {
            removeBookmark(id);
        } else {
            addBookmark(id) 
        }
        setBookmarkStatus(!bookmark);
    }

    return (
        <>
            <Card style={{"padding": "0px", "backgroundColor": "#E3F2FD"}}>
                <Card.Header as="h3" style={{"backgroundColor": "#42A5F5"}}><b>{title}</b>
                </Card.Header>
                <Card.Header style={{"backgroundColor": "#E3F2FD"}}>
                {currUser !== null ? (
                    <Button onClick={() => toggleBookmark(id)} className="btn btn-warning">
                        {bookmark ? <i className="fas fa-bookmark"></i> : <i className="far fa-bookmark"></i>}
                    </Button>) : null}    
                </Card.Header>
                <Card.Body style={{"backgroundColor": "#FAFAFA"}}>
                    <p style={{"fontSize": "14px", "color": "gray"}}>
                        <i>Posted by {userId} at {createdAt}</i>
                    </p>
                <hr className="my-2" />                 
                <ListGroup className="list-group-flush">
                    {link ? <ListGroupItem style={{"backgroundColor": "#FAFAFA"}}><a target="_blank" rel="noopener noreferrer" href={link}>See Article</a></ListGroupItem> : null}
                    <ListGroupItem style={{"backgroundColor": "#FAFAFA"}}><b>Tag: </b><Badge pill bg="info">{tag}</Badge></ListGroupItem>
                    <ListGroupItem style={{"backgroundColor": "#FAFAFA"}}><b>Location: </b><Badge pill bg="info">{location}</Badge></ListGroupItem>
                </ListGroup>
                <hr className="my-2" />                 
                    <Card.Text style={{"marginTop": "20px", "marginBottom": "5px"}}>
                        {body}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                <ButtonGroup className="mb-2">
                    <Button onClick={() => history.goBack()} className="btn btn-info">Go Back</Button>
                    {currUser !== null && currUser.username === userId ? (
                        <>
                            <Button onClick={() => handleDelete(id)} className="btn btn-danger">Delete</Button>
                            <Button onClick={() => history.push(`/posts/${id}/edit`)}>Edit</Button>
                        </>) : null}    
                </ButtonGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default PostCard;
