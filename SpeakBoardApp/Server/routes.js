var express = require('express');
// var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const e = require('express');
// var app = express();

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.status(200).json({
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            message: 'Login failed'
        });
    }
});

const fetch = require('node-fetch');
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
const SESSION_SECRET = process.env.SESSION_SECRET;
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/speakboard";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to database");
    } catch (err) {
        console.log("Error connecting to database", err);
    }
}

connectToDatabase();


// route for creating a card in Trello and storing it in MongoDB
router.post('/cards', (req, res) => {
    const { title, description, idList } = req.body;

    // validate the request body
    if (!title || !description || !idList) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    fetch(`https://api.trello.com/1/cards?idList=${idList}&key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`
    })

        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error creating card');
            }
        })
        .then(cardData => {
            const database = client.db('speakboard');
            const cardsCollection = database.collection('cards');
            console.log(cardsCollection);
            return cardsCollection.insertOne(cardData)
                .then(() => res.json(cardData))
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: 'Internal server error' });
                });

        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Route to get all cards on a board
router.get('/cards', async (req, res) => {
  try {
    const boardId = 'bQjvAEvw';

    const response = await fetch(`https://api.trello.com/1/boards/${boardId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Failed to get cards on board. Response: ${response.status} ${response.statusText}`);
    }

    const cards = await response.json();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// route for getting a card from Trello
router.get('/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;

        const response = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const cardData = await response.json();
        res.json(cardData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// route for updating a card in Trello
router.put('/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;
        const { title, description } = req.body;

        // validate the request body
        if (!title && !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const response = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&name=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const cardData = await response.json();
        res.json(cardData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;