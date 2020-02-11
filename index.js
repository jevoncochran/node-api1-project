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
            res.status(500).json({ errorMessage: 'oops' });
        });
})

// gets user by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops' })
        })
})

// adds a user
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.insert(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops' });
        })
})

// edit a user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    users.update(id, updatedUser)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' });
    });
})

// deletes a user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops' });
        })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));