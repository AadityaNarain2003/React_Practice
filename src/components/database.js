let userData = require('./user_pass.json');
let postData = require('./posts.json');

export function useDatabase() {
    function addUser(username, password) {
        // Check if the username already exists
        const userExists = userData.some(user => user.username === username);
        if (userExists) {
            console.error('Username already exists. Please choose a different username.');
            return;
        }

        // Add the new user to the array
        userData.push({ username, password });
        console.log('User added successfully.');
    }

    return {
        database: userData,
        posts: postData,
        addUser,
    };
    
}

