import React, { useState, useEffect, useContext } from 'react';
import PostCard from './PostCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import { Row, Container, Accordion } from 'react-bootstrap';
import PostCreateForm from './PostCreateForm';
import PostSearchForm from './PostSearchForm';
import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostList({ type = 'full' }) {
    const { currUser, hasBookmarked } = useContext(UserContext);
    const [posts, setPosts] = useState(null);

    useEffect(function getPostsOnMount() {
        console.debug('postList useEffect getPostsOnMount')
        if (type === 'full') {
            searchPosts();
        } else if (currUser !== null) {
            searchPosts();
        }
    }, [currUser, hasBookmarked]);

    async function searchPosts(formData) {
        try {
            const reqPosts = await GetVocalToGovApi.getPosts(formData);
            if (reqPosts) {
                if (type === 'full') {
                    setPosts(reqPosts);
                } else if (type === 'bookmarked') {
                    const bmPosts = reqPosts.filter((p) => hasBookmarked(p.id));
                    setPosts(bmPosts);
                } else {
                    const userPosts = reqPosts.filter((p) => p.userId === currUser.username);
                    setPosts(userPosts); 
                }
                return { success: true };
            }
          } catch (error) {
                console.error('Encountered issue searching Posts:', error);
                return { success: false, error }
          }
    }

    async function addPost(formData) {
        try {
            const post = await GetVocalToGovApi.createPost(formData);
            if (post) {
                setPosts([post, ...posts]);
                return { success: true };
            }
          } catch (error) {
                console.error('Encountered issue creating new Post:', error);
                return { success: false, error }
          }
    }

    async function removePost(id) {
        await GetVocalToGovApi.deletePost(id);
        setPosts((currPosts) => currPosts.filter(p => p.id !== id));
    }

    if (!posts) return <LoadingSpinner waitingOn={'Posts'} />;

    return (
        <>  
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Search for Post</Accordion.Header>
                    <Accordion.Body style={{"backgroundColor": "#F4F6F6"}}>
                        <PostSearchForm searchPosts={searchPosts} />
                    </Accordion.Body>
                </Accordion.Item>
                {type === 'bookmarked' ? null : 
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Create New Post</Accordion.Header>
                        <Accordion.Body style={{"backgroundColor": "#F4F6F6"}}>
                            <PostCreateForm addPost={addPost} />
                        </Accordion.Body>
                    </Accordion.Item>}
            </Accordion>
            <h1 style={{"marginTop": "20px", "marginBottom": "20px"}}>Posts</h1>
            <hr className="my-3" />
            {posts.length !== 0 ? (
                <Container>
                    <Row className='justify-content-lg-center'>
                        {posts.map((post) => 
                            <PostCard 
                                key={post.id} 
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                link={post.link}
                                tag={post.tag}
                                location={post.location}
                                userId={post.userId}
                                createdAt={post.createdAt}
                                handleDelete={removePost} />)}
                    </Row>
                </Container>
            ) : (
                <p>No results found!</p>
            )}
        </>
    )
}

export default PostList;