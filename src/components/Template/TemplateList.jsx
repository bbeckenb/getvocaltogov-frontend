import React, { useState, useEffect } from 'react';
import TemplateCard from './TemplateCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import { Row, Container } from 'react-bootstrap';
// import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function TemplateList() {
    const [templates, setTemplates] = useState(null);

    useEffect(function getTemplatesOnMount() {
        console.debug('templateList useEffect getTemplatesOnMount')
        retrieveTemplates();
    }, []);

    async function retrieveTemplates(filterCriteria = {}) {
        const reqTemplates = await GetVocalToGovApi.getTemplates(filterCriteria);
        setTemplates(reqTemplates);
    }

    if (!templates) return <LoadingSpinner waitingOn={'Templates'} />;

    return (
        <>
            <div>SearchForm</div>
            <div>Create Form</div>
            {templates === undefined ? (
                <Container>
                    <Row className='justify-content-lg-center'>
                        {templates.map((template) => 
                            <TemplateCard 
                                key={template.id} 
                                title={template.title}
                                body={template.body}
                                userId={template.userId}
                                createdAt={template.createdAt} />)}
                    </Row>
                </Container>
            ) : (
                <p>No results found!</p>
            )}
        </>
    )
}

export default TemplateList;