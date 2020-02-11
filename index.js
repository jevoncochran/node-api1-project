// implement your API here
const express = require('express');

const users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ hello: 'Web 26' })
})

// return list of all users
server.get('/api/users', (req, res) => {
    users.find()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
        });
})

// gets user by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })
        })
})

// adds a user
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for this user'})
    } else {
        users.insert(newUser)
            .then(user => {
                res.status(201).json(user);
                return newUser;
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' });
            })
    }
})

// edit a user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
    users.update(id, updatedUser)
    .then(user => {
        if (!user) {
            res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
        } else {
            res.status(200).json(user);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'The user information could not be modified.' });
    });
})

// deletes a user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'The user could not be removed' });
        })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));