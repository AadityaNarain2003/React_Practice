import React, { useState } from 'react';
import { useDatabase } from './database.js';
import '../App.css';
import '../styles/posts.css'
import Navbar from './Navbar.js';
import NewPostBox from './NewPostBox.js';

function AddPost() {
    const LogInStatus = localStorage.getItem('isLoggedIn');
    const { database,posts, addUser } = useDatabase();
    const Show_Content = (
        <>
            <Navbar />
            <NewPostBox/>
        </>
    );

    return (
        <div className="app">
            {LogInStatus ? Show_Content : <div>Not logged IN Dashboard</div>}
        </div>
    );
}

export default AddPost;