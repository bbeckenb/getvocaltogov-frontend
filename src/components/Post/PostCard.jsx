import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {body}
                    </Card.Text>
                </Card.Body>
                {currUser !== null ? (
                    <button onClick={() => toggleBookmark(id)}>
                        {bookmark ? <i className="fas fa-bookmark"></i> : <i className="far fa-bookmark"></i>}
                    </button>) : null}
                <ListGroup className="list-group-flush">
                    {link ? <ListGroupItem><a href={link}>See Article</a></ListGroupItem> : null}
                    <ListGroupItem><b>Tag: </b>{tag}</ListGroupItem>
                    <ListGroupItem><b>Location: </b>{location}</ListGroupItem>
                    <ListGroupItem><b>Created at: </b>{createdAt}</ListGroupItem>
                    <ListGroupItem><b>Author: </b>{userId}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                <ButtonGroup className="mb-2">
                    {currUser !== null && currUser.username === userId ? (
                        <>
                            <Button onClick={() => handleDelete(id)}>Delete</Button>
                            <Button onClick={() => history.push(`/posts/${id}/edit`)}>Edit</Button>
                        </>) : null}
                        <Button onClick={() => history.push(`/posts/${id}/details`)}>Details</Button>
                </ButtonGroup>
              
                </Card.Body>
            </Card>
        </>
    )
}

export default PostCard;
