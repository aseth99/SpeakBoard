const fetch = require('node-fetch');
const express = require('express');
const routes = require('./routes');
const app = express();

app.use('/api', routes);

async function testCreateCard() {
    try {
        const response = await fetch('http://localhost:3000/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test Card',
                description: 'This is a test card.',
                idList: '647e1e7bbfd1a55713a7ef1e'
            })
        });

        const data = await response.json();
        console.log(data);
        return data.shortLink; // return the card ID
    } catch (error) {
        console.error(error);
    }
}

async function testGetCard(cardId) {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function testUpdateCard(cardId) {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Updated Title',
                description: 'Updated Description'
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// testCreateCard();
// testGetCard('JGX40243');
// testUpdateCard('JGX40243');

testCreateCard().then(cardId => {
    console.log('Created card with ID:', cardId);
    testGetCard(cardId);
    testUpdateCard(cardId);
});
