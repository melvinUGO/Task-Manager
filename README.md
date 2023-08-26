# Task Manager

Task Manager is a Full stack task management web application where users can create, update, and manage tasks, made with React and CSS for the frontend with NodeJS and Express for the backend

## Server and Client Installation

Run the command "npm install" on both the root folder of client and server.

```bash
npm install
```

### Additional Installation for the Server

create a .env file on the root directory of the server folder and write 3 variables needed for usage :

1. "MONGO_URI" - with a link to connect to your database.
2. "JWT_SECRET" - needed to sign the JWT token sent to user for auth.
3. "JWT_LIFETIME" - to sign the token with a life time to expire.

#### Example

`MONGO_URI = "mongodb+srv://Melvin:<password>@cluster0.l8azq1d.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority"`

`JWT_SECRET="secret"`

`JWT_LIFETIME = "30d"`

## Server Usage

```bash
npm start
```

## Client Usage

```bash
npm run dev
```

## Frontend Features

- User registration and login pages.
- Dashboard displaying a list of tasks for the logged-in user.
- Task creation, editing, and deletion functionality.
- Filter and sorting options for tasks.
- User-friendly interface with responsive design.
- Use of modern frontend technologies like HTML5, CSS3, JavaScript (ES6+), and a frontend framework like React, Angular, or Vue.js.

## Backend Features

- RESTful API to handle user authentication (registration and login).
- API endpoints for CRUD operations on tasks.
- Secure authentication and authorization mechanisms.
- Database schema and design to store user information and tasks.
- Backend logic to handle task filtering and sorting.
- Use of a backend framework such as Express (Node.js), Django (Python), or Ruby on Rails (Ruby).
