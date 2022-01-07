import React, { useContext, useState, useEffect } from 'react';
import Alert from '../Common/Alert';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDeletePortal() {
    const { currUser, deleteProfile, logout } = useContext(UserContext);
    const [formMessage, setFormMessage] = useState({type: 'primary', message: 'Please no : ('});
    const [stage, setStage] = useState(0);
    const [username, setUsername] = useState();
    const history = useHistory();

    
    useEffect(function loadUser() {
        if (currUser !== null) {
            setUsername(currUser.username);
        }
    }, [currUser]);

    useEffect(function handleUserInteraction() {
        async function executeStageActions() {
            if (stage === 0) {
                setFormMessage({type: 'primary', message: 'Please no : ('});
            } else if (stage === 1) {
                setFormMessage({type: 'warning', message: 'This is a permanent action, are you sure?'});
            } else {
                const res = await deleteProfile(username);
                if (res.success) {
                    setFormMessage({type: 'success', message: 'success!'});
                    history.push('/');
                    logout();   
                } else {
                    console.log(res)
                    setFormMessage({type: 'danger', message: `${res.error}`});
                } 
            }
        }
        executeStageActions();
    }, [stage])

    function handleStage(num) {
        if (num === 0) {
            setStage(0);
        } else {
            setStage((s)=> s+=num);
        }

    };

    return (
        <>
            <Card>
                <Card.Header>Delete {username} Profile</Card.Header>
                <Card.Body>
                <Alert type={formMessage.type} message={formMessage.message} />  
                    <ButtonGroup className="mb-2">
                        <Button className='btn-danger' onClick={() => handleStage(1)}>Delete</Button>
                        <Button onClick={() => handleStage(0)}>Cancel</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default UserDeletePortal;
