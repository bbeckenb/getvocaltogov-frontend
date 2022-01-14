import React, { useState, useEffect, useContext } from 'react';
import TemplateCard from './TemplateCard';
import TemplateCreateForm from './TemplateCreateForm';
import TemplateSearchForm from './TemplateSearchForm';
import LoadingSpinner from '../Common/LoadingSpinner';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import { Row, Container, Accordion } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function TemplateList({ type = 'full' }) {
    const { currUser, hasFavorited } = useContext(UserContext);
    const [templates, setTemplates] = useState(null);

    useEffect(function getTemplatesOnMount() {
        console.debug('templateList useEffect getTemplatesOnMount')
        if (type === 'full') {
            searchTemplates();
        } else if (currUser !== null) {
            searchTemplates();
        }
    }, [currUser, hasFavorited]);

    async function searchTemplates(formData) {
        try {
            const reqTemplates = await GetVocalToGovApi.getTemplates(formData);
            if (reqTemplates) {
                if (type === 'full') {
                    setTemplates(reqTemplates); 
                } else if (type === 'favorited') {
                    const favTemplates = reqTemplates.filter((t) => hasFavorited(t.id));
                    setTemplates(favTemplates); 
                } else {
                    const userTemplates = reqTemplates.filter((t) => t.userId === currUser.username);
                    setTemplates(userTemplates); 
                }
                return { success: true };
            }
          } catch (error) {
                console.error('Encountered issue searching Templates:', error);
                return { success: false, error }
          }
    }

    async function addTemplate(formData) {
        try {
            const template = await GetVocalToGovApi.createTemplate(formData);
            if (template) {
                setTemplates([template, ...templates]);
                return { success: true };
            }
          } catch (error) {
                console.error('Encountered issue creating new Template:', error);
                return { success: false, error }
          }
    }

    async function removeTemplate(id) {
        await GetVocalToGovApi.deleteTemplate(id);
        setTemplates((currTemplates) => currTemplates.filter(t => t.id !== id));
    }

    if (!templates) return <LoadingSpinner waitingOn={'Templates'} />;

    return (
        <>  
            <Accordion>
                <Accordion.Item eventKey="0" style={{"backgroundColor": "#F1948A"}}>
                    <Accordion.Header>Search for Templates</Accordion.Header>
                    <Accordion.Body style={{"backgroundColor": "#F4F6F6"}}>
                        <TemplateSearchForm searchTemplates={searchTemplates} />
                    </Accordion.Body>
                </Accordion.Item>
                {type === 'favorited' ? null : 
                    <Accordion.Item eventKey="1" style={{"backgroundColor": "#F1948A"}}>
                        <Accordion.Header>Create New Template</Accordion.Header>
                        <Accordion.Body style={{"backgroundColor": "#F4F6F6"}}>
                            <TemplateCreateForm addTemplate={addTemplate}/>
                        </Accordion.Body>
                    </Accordion.Item>}
            </Accordion>
            <h1 style={{"marginTop": "20px", "marginBottom": "20px"}}>Templates</h1>
            <hr className="my-3" />
            {templates.length !== 0 ? (
                <Container>
                    <Row className='justify-content-lg-center'>
                        {templates.map((template) => 
                            <TemplateCard 
                                key={template.id} 
                                id={template.id}
                                title={template.title}
                                body={template.body}
                                userId={template.userId}
                                createdAt={template.createdAt}
                                handleDelete={removeTemplate} />)}
                    </Row>
                </Container>
            ) : (
                <p>No results found!</p>
            )}
        </>
    )
}

export default TemplateList;