import React, { useState, useEffect, useContext } from 'react';
import RepresentativeCard from './RepresentativeCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import { Row, Container, Accordion } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostList() {
    const { currUser } = useContext(UserContext);
    const [offices, setOffices] = useState(null);
    const [officials, setOfficials] = useState(null);

    useEffect(function getReps() {
        console.debug('postList useEffect getPostsOnMount')
        if (currUser !== null) {
            retreiveReps(currUser.username);
        }
    }, [currUser]);

    async function retreiveReps(username) {
        const reqReps = await GetVocalToGovApi.getRepresentatives(username);
        setOffices(reqReps.offices);
        setOfficials(reqReps.officials);
        console.log(reqReps.offices);
        console.log(reqReps.officials);

    }

    if (!offices || !officials) return <LoadingSpinner waitingOn={'Representatives'} />;

    return (
        <>  
            <h1>Representatives</h1>
            {officials.length !== 0 ? (
                <Container>
                    <Row className='justify-content-lg-center'>
                    <Accordion>
                        {offices.map((office, officeIdx) => 
                            <Accordion.Item key={officeIdx} eventKey={officeIdx}>
                                <Accordion.Header>{office.name}</Accordion.Header>
                                <Accordion.Body>
                                    {office.officialIndices.map((idx) => <RepresentativeCard 
                                        key={idx}
                                        name={officials[idx].name}
                                        // address={officials[idx].address}
                                        party={officials[idx].party}
                                        phones={officials[idx].phones}
                                        urls={officials[idx].urls}
                                        emails={officials[idx].emails}
                                        photoUrl={officials[idx].photoUrl}    
                                    />)}
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                    </Row>
                </Container>
            ) : (
                <p>No results found!</p>
            )}
        </>
    )
}

export default PostList;