import React, { useState, useContext } from "react";
import UserEditForm from "./UserEditForm";
import UserDeletePortal from "./UserDeletePortal";
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {

    return (
        <Tabs defaultActiveKey="userOptions" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="userOptions" title="User Options">
                <UserEditForm />
                <UserDeletePortal />
            </Tab>
            <Tab eventKey="templatesCreated" title="Templates Created">
                <h1>hi 2</h1>
            </Tab>
            <Tab eventKey="templatesFavorited" title="Templates Favorited">
                <h1>hi 3</h1>
            </Tab>
            <Tab eventKey="postsCreated" title="Posts Created">
                <h1>hi 4</h1>
            </Tab>
            <Tab eventKey="postsBookmarked" title="Posts Bookmarked">
                <h1>hi 5</h1>
            </Tab>
        </Tabs>
    )
}

export default UserProfile;