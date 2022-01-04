import React from "react";
import UserEditForm from "./UserEditForm";
import UserDeletePortal from "./UserDeletePortal";
import TemplateList from "../Template/TemplateList";
import PostList from '../Post/PostList';
import { Tab, Tabs, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {

    return (
        <Tabs defaultActiveKey="userOptions" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="userOptions" title="User Options">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Edit Profile</Accordion.Header>
                        <Accordion.Body>
                            <UserEditForm />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Delete Profile</Accordion.Header>
                        <Accordion.Body>
                            <UserDeletePortal />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                
            </Tab>
            <Tab eventKey="templatesCreated" title="Templates Created">
                <TemplateList type='created' />
            </Tab>
            <Tab eventKey="templatesFavorited" title="Templates Favorited">
                <TemplateList type='favorited' />
            </Tab>
            <Tab eventKey="postsCreated" title="Posts Created">
                <PostList type='created' />
            </Tab>
            <Tab eventKey="postsBookmarked" title="Posts Bookmarked">
                <PostList type='bookmarked' />
            </Tab>
        </Tabs>
    )
}

export default UserProfile;