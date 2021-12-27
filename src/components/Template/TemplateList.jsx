import React, { useState, useEffect } from 'react';
import TemplateCard from './TemplateCard';
import TemplateCreateForm from './TemplateCreateForm';
import TemplateSearchForm from './TemplateSearchForm';
import LoadingSpinner from '../Common/LoadingSpinner';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import { Row, Container, Accordion } from 'react-bootstrap';
// import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function TemplateList() {
    const [templates, setTemplates] = useState(null);

    useEffect(function getTemplatesOnMount() {
        console.debug('templateList useEffect getTemplatesOnMount')
        searchTemplates();
    }, []);

    // async function retrieveTemplates(filterCriteria = {}) {
    //     const reqTemplates = await GetVocalToGovApi.getTemplates(filterCriteria);
    //     console.log(reqTemplates)
    //     setTemplates(reqTemplates);
    // }

    async function addTemplate(formData) {
        try {
            const template = await GetVocalToGovApi.createTemplate(formData);
            if (template) {
                console.log('HELLO')
                setTemplates([template, ...templates]);
                return { success: true };
            }
          } catch (error) {
                console.error('Encountered issue creating new Template:', error);
                return { success: false, error }
          }
    }

    async function searchTemplates(formData) {
        try {
            const reqTemplates = await GetVocalToGovApi.getTemplates(formData);
            if (reqTemplates) {
                setTemplates(reqTemplates);
                return { success: true };
            }
          } catch (error) {
                console.error('Encountered issue searching Templates:', error);
                return { success: false, error }
          }
    }

    if (!templates) return <LoadingSpinner waitingOn={'Templates'} />;

    return (
        <>  
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create New Template</Accordion.Header>
                    <Accordion.Body>
                        <TemplateCreateForm addTemplate={addTemplate}/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Search for Templates</Accordion.Header>
                    <Accordion.Body>
                        <TemplateSearchForm searchTemplates={searchTemplates} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {templates !== undefined ? (
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