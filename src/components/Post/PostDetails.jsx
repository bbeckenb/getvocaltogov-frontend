import React, { useEffect, useState } from 'react';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import LoadingSpinner from '../Common/LoadingSpinner';
import PostDetailCard from './PostDetailCard';
import TemplateCard from '../Template/TemplateCard';
import TemplateCreateForm from '../Template/TemplateCreateForm';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Container, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostDetails() {
    const [currPost, setCurrPost] = useState(null);
    const [templates, setTemplates] = useState(null);
    const history = useHistory();
    const { postId } = useParams();

    useEffect(function getPostOnMount() {
        async function getPost() {
            const post = await GetVocalToGovApi.getPost(postId);
            console.log(post)
            setCurrPost(post);
            setTemplates(post.templates);
        }
        getPost(postId);
      }, []);
    
    async function removePost(id) {
        await GetVocalToGovApi.deletePost(id);
        history.push('/posts');
    }

    async function addTemplate(formData) {
        try {
            const template = await GetVocalToGovApi.createTemplate({...formData, postId: Number(postId)});
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
    
    if (!currPost || !templates) return <LoadingSpinner waitingOn={'Posts'} />;

    return (
        <>
            <PostDetailCard 
                    key={currPost.id} 
                    id={currPost.id}
                    title={currPost.title}
                    body={currPost.body}
                    link={currPost.link}
                    tag={currPost.tag}
                    location={currPost.location}
                    userId={currPost.userId}
                    createdAt={currPost.createdAt}
                    handleDelete={removePost} />
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create New Template For This Post</Accordion.Header>
                    <Accordion.Body>
                        <TemplateCreateForm addTemplate={addTemplate} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
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
                <p>No templates currently related to this post!</p>
            )}
        </>
    )
}

export default PostDetails;
