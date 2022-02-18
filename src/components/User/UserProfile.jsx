import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import UserEditForm from "./UserEditForm";
import LoadingSpinner from "../Common/LoadingSpinner";
import UserDeletePortal from "./UserDeletePortal";
import TemplateListShared from "../Template/TemplateListShared";
import PostListShared from '../Post/PostListShared';
import RepresentativeList from '../Representatives/RepresentativeList';
import { Tab, Tabs, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function UserProfile() {
    const { loadingUser } = useContext(UserContext);
    const [templates, setTemplates] = useState(null);
    const [posts, setPosts] = useState(null);
    
    if (loadingUser) return <LoadingSpinner waitingOn={'User Information'} />;

    return (
        <Tabs defaultActiveKey="userOptions" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="userOptions" title="User Options">
                <Accordion>
                    <Accordion.Item eventKey="0" style={{"backgroundColor": "#EBDEF0"}}>
                        <Accordion.Header>Edit Profile</Accordion.Header>
                        <Accordion.Body style={{"backgroundColor": "#F4F6F6"}}>
                            <UserEditForm />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" style={{"backgroundColor": "#EBDEF0"}}>
                        <Accordion.Header>Delete Profile</Accordion.Header>
                        <Accordion.Body style={{"backgroundColor": "#F4F6F6"}}>
                            <UserDeletePortal />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>   
            </Tab>
            <Tab eventKey="postsCreated" title="Posts Created">
                <PostListShared type='created' posts={posts} setPosts={setPosts} />
            </Tab>
            <Tab eventKey="postsBookmarked" title="Posts Bookmarked">
                <PostListShared type='bookmarked' posts={posts} setPosts={setPosts} />
            </Tab>
            <Tab eventKey="templatesCreated" title="Templates Created">
                <TemplateListShared type='created' templates={templates} setTemplates={setTemplates} />
            </Tab>
            <Tab eventKey="templatesFavorited" title="Templates Favorited">
                <TemplateListShared type='favorited' templates={templates} setTemplates={setTemplates} />
            </Tab>
            <Tab eventKey="representatives" title="Representatives">
                <RepresentativeList />
            </Tab>
        </Tabs>
    )
}

export default UserProfile;