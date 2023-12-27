const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON requests

app.post('/addpost', (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    let existingData = [];
    try {
        // Read existing data from the file
        let existingData = JSON.parse(fs.readFileSync('components/posts.json'));

        // Add the new post
        existingData.posts.push(newPost);

        fs.writeFileSync('components/posts.json', JSON.stringify(existingData, null, 2));

        console.log('New post added successfully.');
        res.status(200).json({ message: 'New post added successfully' });
    } catch (error) {
        console.error('Error updating file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/adduser', (req, res) => {
    const { username, password } = req.body;
    // Read existing data from the file
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync('components/user_pass.json'));
    } catch (error) {
        console.error('Error reading file:', error);
    }

    // Check if the username already exists
    const userExists = existingData.some((user) => user.username === username);

    if (userExists) {
        res.status(400).json({ error: 'Username already exists' });
    } else {
        // Add the new user data
        existingData.push({ username, password });

        // Write the updated data back to the file
        fs.writeFileSync('components/user_pass.json', JSON.stringify(existingData, null, 2));

        res.status(200).json({ message: 'User added successfully' });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/posts', (req, res) => {
    let existingData = [];
    try {
        existingData=JSON.parse(fs.readFileSync('components/posts.json'));
        console.log(existingData);
        // Send the entire JSON file as the response
        res.json(existingData);
    } catch (error) {
        console.error('ERROR GETTING POSTS:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
