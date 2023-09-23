# Social-Network-API

API for Social Media Web Application

## Description

![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-100%25-yellow.svg)
![express](https://img.shields.io/badge/express-v4.17.1-orange)
![eslint](https://img.shields.io/badge/eslint-v7.12.1-lightgrey)
![nodemon](https://img.shields.io/badge/nodemon-3.0.1-black)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Demo

[GIF]()

[Mp4]()

[YouTube]()

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [license](#license)

## Installation

[Models](https://github.com/jarrodbb/Social-Network-API/tree/main/models)

[Routes](https://github.com/jarrodbb/Social-Network-API/tree/main/routes)

[Controllers](https://github.com/jarrodbb/Social-Network-API/tree/main/controllers)

[Connection](https://github.com/jarrodbb/Social-Network-API/tree/main/config)

### Ensure a package.json file exists

If there is no package.json install one by running npm init

### Note:

.gitignore added to ignore node_modules

### Install

- express: ^4.17.1

- mogoose: ^7.0.2

- nodemon: ^2.0.9

### Run

- Run <strong>"npm run start"</strong> in the terminal to start the application

- No seed file to be run

### Technologies Used

<p><a href="https://nodejs.org/">Node.js</a></p>
<p><a href="https://www.npmjs.com/">NPM</a></p>
<p><a href="https://www.npmjs.com/package/express">Express.js</a></p>
<p><a href="https://www.npmjs.com/package/mongoose">mogoose</a></p>
<p><a href="https://nodemon.io/">nodemon</a></p>

## Usage

## Open Insomnia

When the application is running on localhost:3001 open Insomnia to check the backend

## Users

### Get All Users (Get request)

/api/users

### Get A Single User by ID (Get request)

/api/users/:userId

### Create a new User (Post request)

/api/users

Include the username and email of the new user in the body

```
{
	"username": "tims",
	"email": "tims@gmail.com"
}
```

### Update a Single User by ID (Put request)

/api/users/:userId

Include the username and email of the new user in the body

```
{
	"username": "tim",
    "email": "timsemail@gmail.com"
}
```

### Remove a Single User by ID (Delete request)

/api/users/:userId

A User's associated thoughts are removed when the user is removed

### Add a new friend to a User's friend list (Post request)

/api/users/:userId/friends/:friendId

### Remove a friend from a user's friend list (Delete request)

/api/users/:userId/friends/:friendId

## Thoughts

### Get all Thoughts (Get request)

/api/thoughts

### Get a Single Thought by ID (Get request)

/api/thoughts

### Create a new Thought

/api/thoughts

Include the thoughtText, username and userId in the body

When a thought is created, its ID is pushed into the associated user's thoughts array field

```
{
  "thoughtText": "This is a new thought",
  "username": "tims",
  "userId": "650e73146edcdcc9516de93e"
}
```

### Update a Thought by ID (Put request)

/api/thoughts/:thoughtId

Include the thoughtText, username and userId in the body

```
{
  "thoughtText": "Wow, great thought",
  "username": "tims",
  "userId": "650e73146edcdcc9516de93e"
}
```

### Remove a Thought by ID (Delete request)

/api/thoughts/:thoughtId

### Create a Reaction stored in a single Thought's Reaction array frield (Post request)

/api/thoughts/:thoughtId/reactions

Include in the body the reactionBody and the username of the user making the reaction

```
{
	"reactionBody": "good thought",
	"username": "tim"
}
```

### Remove a Reaction by the Reaction's reactionId (Delete request)

/api/thoughts/reactions/:reactionId

## License

Please refer to the licence in the repo.
