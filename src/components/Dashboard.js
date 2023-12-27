import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Login from './Login.js';
import Navbar from './Navbar.js';
import PostBox from './PostBox.js';

function Dashboard() {
    let [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // New state to track loading status
    const LogInStatus = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://192.168.1.12:5000/posts');
                setPosts(response.data.posts);
            } catch (error) {
                console.error('ERROR:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        if (LogInStatus) {
            fetchPosts();
            console.log("POSts is BLAH");
            console.log(posts);

        }
    }, [LogInStatus]);

    const Show_Content = (
        <>
            <Navbar />
            {loading ? (
                <div>Loading posts...</div>
            ) : (
                <PostBox posts={posts} />
            )}
        </>
    );

    return (
        <div className="app">
            {LogInStatus ? Show_Content : <div>Not logged IN Dashboard</div>}
        </div>
    );
}

export default Dashboard;
