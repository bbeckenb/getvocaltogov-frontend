import React, { useEffect, useContext } from 'react';
import TemplateCard from './TemplateCard';
import TemplateCreateForm from './TemplateCreateForm';
import TemplateSearchForm from './TemplateSearchForm';
import LoadingSpinner from '../Common/LoadingSpinner';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import { Row, Container, Accordion } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function TemplateListShared({ type = 'full', templates, setTemplates }) {
    const { currUser, hasFavorited } = useContext(UserContext);

    useEffect(function getTemplatesOnMount() {
        console.debug('templateList useEffect getTemplatesOnMount')
        if (currUser !== null) {
            searchTemplates();
        }
    }, [currUser, hasFavorited]);

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
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Search for Templates</Accordion.Header>
                    <Accordion.Body>
                        <TemplateSearchForm searchTemplates={searchTemplates} />
                    </Accordion.Body>
                </Accordion.Item>
                {type === 'favorited' ? null : 
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Create New Template</Accordion.Header>
                        <Accordion.Body>
                            <TemplateCreateForm addTemplate={addTemplate}/>
                        </Accordion.Body>
                    </Accordion.Item>}
            </Accordion>
            <h1>Templates</h1>
            {templates.filter((t) => type === 'favorited' ? hasFavorited(t.id) : t.userId === currUser.username).length > 0 ? (
                <Container>
                    <Row className='justify-content-lg-center'>
                        {templates.filter((t) => type === 'favorited' ? hasFavorited(t.id) : t.userId === currUser.username).map((template) =>
                            <TemplateCard 
                                key={template.id} 
                                id={template.id}
                                title={template.title}
                                body={template.body}
                                userId={template.userId}
                                createdAt={template.createdAt}
                                handleDelete={removeTemplate} />)
                        }
                    </Row>
                </Container>
            ) : (
                <p>No results found!</p>
            )}
        </>
    )
}

export default TemplateListShared;