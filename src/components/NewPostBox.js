import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NewPostBox() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleAddPost = async (event) => {
        event.preventDefault();
        const author = localStorage.getItem('username');
        const timestamp = new Date().toISOString();

        const newPost = {
            id: Date.now(),
            title,
            content,
            author,
            timestamp,
        };

        try {
            const response = await axios.post('http://192.168.1.12:5000/addpost',newPost);
            console.log('New post:', newPost);
            navigate('/dashboard');

        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div className="new-post-box">
            <h2>Create a New Post</h2>
            <form onSubmit={handleAddPost}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default NewPostBox;
