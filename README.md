## Task-Manager-App

### Table of content

\*[Overview](#overview)

\*[Technologies used](#technologies-used)

\*[Skills practised](#skills-practised)

\*[Launch method](#launch-method)

### Overview

This is a task manager app where the user can:

1- Create an account using valid email and password, the data entered is validated and then the password is hashed and salted to increase security, thus a JWT (Json Web Token) is created for the user which is used thereafter for authentication and authorization.

2- Users can create a profile by providing their email, password, email and password.

3- Authenticated users can create, update and delete tasks as they desire.

4- Authenticated users can also upload an avatar image for their profile which is validated therefore resized ,cropped and transformed to png before upload using a middleware.

5- Users can signup, login and logout.

## Technologies used

1- MongoDB

2- Mongoose

3- Robo 3t

4- Node.js

5- Express

6- Postman

7- Bcrypt

8- JWT

9- Express Middleware

10- Multer npm package

11- Sharp npm package

12- Environment variables

13- Jest

## Skills practised

1- Setting up Mongoose

2- Connecting to MongoDB server

3- Creating Schemas

4- Creating a Mongoose model

5- Data validation with Mongoose

6- Data sanitization with Mongoose

7- Async CRUD operations

8- Routing with express router

9- REST API

10- Testing with Postman

11- Handling request status and bad requests

12- Hashing and salting passwords with Bcrypt

13- Generating JWT for users

14- Multer npm package

15- Sharp npm package

16- Environement variables

17- Automated testing with Jest

18- File upload

### Launch method

1- Download the project, or clone it by runnig the following command in your terminal:

```
git clone https://github.com/K-Mo2/task-manager-app.git
```

2- Install Node.js and Mongodb

3- If you want to launch the app localy, you should launch your mongodb server by running the following command in your terminal

```
mongod
```

4- In another terminal tab run the follwing commands:

```
npm install

npm start
```

5- If you want to run the app on the Mongodb Atlas cloud you should replace the local url of mongodb with your cloud Mongodb Atlas url and then run the follwing commands

```
npm install

npm start
```

4- Finally you can test this app either with Postman or by connecting it to a front-end app

# Instructions for the hosted version

### Open Postman or any (API designing and testing tool) and send the following requests (in the following order):

- Users routes

1- Signup route for registering a new user: "{{url}}/users/signup" (Post request)

2- Login route for logging the user in using a bearer JWT (JavascriptWebToken) in the Authorization section in Postman:
"{{url}/users/login" (Post request)

3- Me route which is a dashboard to show the users personal info and their tasks: "{{url}}/users/me" (Get request)

4- Logout route for loggin the user out : "{{url}}/users/logout" (Post request)

5- LogoutAll route for loggin all users out : "{{url}}/users/logoutAll" (Post request)

6- Me route to update the users personal info [email, password, name,age] (in lower case):
"{{url}}/users/me" (Patch request)

7- Me route to delete the user: "{{url}}/users/me" (Delete request)

8- Avatar route for uploading an avatar image : "{{url}}/users/me/avatar" (Post request)

8- Avatar route for deleting an avatar image : "{{url}}/users/me/avatar" (Delete request)

8- Avatar route for getting an avatar image : "{{url}}/users/:id/avatar" (Get request)
