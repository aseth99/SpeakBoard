# Trello Integration Application

This project is a full-stack web application that integrates with Trello. Users can authenticate, create Trello cards, and view the created cards. The backend is built with Node.js and Express.js, while the frontend is built with Angular.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* Node.js
* npm
* MongoDB
* Angular CLI
* Trello Power Ups
  * Go to https://trello.com/power-ups/admin and register a new application. You'll receive a
key, token and a secret which you'll use to authenticate your application with Trello. Save these in .env in the Server directory.

### Installing
Clone the repository:

```bash
git clone git@github.com:aseth99/SpeakBoard.git
```

Navigate to the project directory:

```bash
cd SpeakBoard/SpeakBoardApp
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm start
```

Open another terminal and navigate to the Angular project, then start the Angular development server:


```bash
ng serve
```

## Built With
* Node.js - Backend
* Express.js - Backend framework
* MongoDB - Database
* Mongoose - MongoDB object modeling
* Angular - Frontend

## Features
* Trello card creation and retrieval
* Data storage in MongoDB

## TODO:
* User authentication with Trello (OAuth): 
  * Will need to add a route on the server that redirects users to Trello's OAuth authorization page and handles the OAuth callback. This will involve using the request library to make a server-side request to Trello's OAuth endpoint, handling the user's authorization, and storing the access token in the database
* Displaying cards from MongoDB: 
  * Although I have implemented displaying cards from Trello, I should also retrieve and display cards from the MongoDB database. This will involve modifying the card retrieval route to pull data from MongoDB and updating the Angular card display component to fetch data from this route.
* Unit testing: 
  * Should add unit tests for both the front-end and back-end code
* Error handling: 
  * Ensure I have proper error handling for both frontend and backend. Users should be notified when an error occurs, and the error should be logged on the backend for debugging purposes.

