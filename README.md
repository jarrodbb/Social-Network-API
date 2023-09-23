# Social-Network-API

## Description

![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-100%25-yellow.svg)
![express](https://img.shields.io/badge/express-v4.17.1-orange)
![eslint](https://img.shields.io/badge/eslint-v7.12.1-lightgrey)
![nodemon](https://img.shields.io/badge/nodemon-3.0.1-black)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

This is an API for a Social Media Web Application where Users can share their thoughts and react with a friend's thoughts. The User is also given the ability to create a friends list where the friend can be added and removed from the list

To achieve the desired results of the Social Media Web Application the following routes were developed,

- Creating a new User
- Getting all Users and their Thoughts
- Getting a Single User and their Thoughts
- Updating a User by their _id
- Removing a User by their _id
- Adding a Friend 
- Removing a Friend
- Getting all Thoughts
- Getting a single Thought by its _id
- Creating a Thought
- Updating a Thought by its _id
- Removing a Thought by it _id
- Creating a Reaction
- Removing a Reaction


For the this Web Application, express.js was utilised along with MongoDB database and the Mongoose ODM.

### Demo

[Google](https://drive.google.com/file/d/1zEcT00TzjAyCF6laL97GlxD8X30moh-W/view)

[YouTube](https://youtu.be/xd_iWotA4pw)

[Mp4](https://github.com/jarrodbb/Social-Network-API/tree/main/assets/demo)


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

![Screenshot 2023-09-23 at 4 56 39 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/d31a1a3e-aee0-435b-bf95-806377464bde)

### Get A Single User by ID (Get request)

/api/users/:userId

![Screenshot 2023-09-23 at 4 56 59 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/46cdf706-9cec-477e-aca7-38afd29dcd71)

### Create a new User (Post request)

/api/users

Include the username and email of the new user in the body

```
{
	"username": "tom",
	"email": "tom@gmail.com"
}
```

![Screenshot 2023-09-23 at 4 56 28 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/c8b28ff6-c4c1-4adb-b77b-b73d4491d972)

### Update a Single User by _id (Put request)

/api/users/:userId

Include the username and email of the new user in the body

```
{
	"username": "timmy",
    	"email": "timwashere@gmail.com"
}
```

![Screenshot 2023-09-23 at 5 00 17 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/166c4356-7d75-43c4-bd4c-69adfe8ea7b6)

### Remove a Single User by _id (Delete request)

/api/users/:userId

A User's associated thoughts are removed when the user is removed

![Screenshot 2023-09-23 at 4 58 54 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/7fbe7b66-2df0-42e4-8d8f-8f537b278a71)

### Add a new friend to a User's friend list (Post request)

/api/users/:userId/friends/:friendId

![Screenshot 2023-09-23 at 5 02 14 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/2618a093-a7cf-4f05-a0c3-d2eed9d4634f)

### Remove a friend from a user's friend list (Delete request)

/api/users/:userId/friends/:friendId

![Screenshot 2023-09-23 at 5 03 43 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/5956ff8e-2410-4b49-835f-6fd85a1f0c55)

## Thoughts

### Get all Thoughts (Get request)

/api/thoughts

![Screenshot 2023-09-23 at 5 08 31 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/a0134be1-5b36-4dc4-8675-d60cf2120e0a)

### Get a Single Thought by _id (Get request)

/api/thoughts

![Screenshot 2023-09-23 at 5 08 58 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/e7399895-0adf-41f1-ac69-183132b48365)

### Create a new Thought

/api/thoughts

Include the thoughtText, username and userId in the body

When a thought is created, its ID is pushed into the associated user's thoughts array field

```
{
  "thoughtText": "This is a new thought",
  "username": "dave",
  "userId": "650e89aabd4ed15a122407ce"
}
```

![Screenshot 2023-09-23 at 5 04 40 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/73d75129-e701-4d91-bdd3-7b12a19d1bc4)

### Update a Thought by _id (Put request)

/api/thoughts/:thoughtId

Include the thoughtText, username and userId in the body

```
{
  "thoughtText": "What actually is going on??",
   "username": "dave",
  "userId": "650e89aabd4ed15a122407ce"
}
```

![Screenshot 2023-09-23 at 5 10 43 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/635b5dc3-cb1a-4b22-a5cf-de7e25c32b60)

### Remove a Thought by _id (Delete request)

/api/thoughts/:thoughtId

![Screenshot 2023-09-23 at 5 11 50 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/abde64c0-9a22-409f-ba51-38998f18805a)

### Create a Reaction stored in a single Thought's Reaction array frield (Post request)

/api/thoughts/:thoughtId/reactions

Include in the body the reactionBody and the username of the user making the reaction

```
{
	"reactionBody": "I agree",
	"username": "dave"
}
```

![Screenshot 2023-09-23 at 5 15 55 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/95f7d6ee-d87c-49e9-8d52-5a45b75374cc)

### Remove a Reaction by the Reaction's reactionId (Delete request)

/api/thoughts/reactions/:reactionId

![Screenshot 2023-09-23 at 5 16 48 pm](https://github.com/jarrodbb/Social-Network-API/assets/132813348/1a233d6e-a856-4ede-a90f-ffd421358697)

## License

Please refer to the licence in the repo.
