import React, { useState, useEffect } from "react";
import GetVocalToGovApi from "../../GetVocalToGovApi";

function PostList() {
    const [posts, setPosts] = useState(null);

    useEffect(function getPostsOnMount() {

    })

    async function retrievePosts() {
        const posts = await GetVocalToGovApi.
    }
}