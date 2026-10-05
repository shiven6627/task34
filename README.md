# MERN User-Post Reference Project

This project implements the assignment requirements:

- Express.js + MongoDB + Mongoose backend
- User schema with `name` and `email`
- Post schema with `title`, `content`, and a reference to User
- `POST /api/users`
- `POST /api/posts`
- `GET /api/posts` with Mongoose `populate()` for user information
- React frontend with forms for users and posts
- React frontend sends POST requests and displays populated posts

## Project structure

```text
mern-user-post-reference/
├── backend/
│   ├── controllers/
│   │   ├── postController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostForm.jsx
│   │   │   ├── PostList.jsx
│   │   │   └── UserForm.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 1. Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Create `.env` from `.env.example`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/user_post_db?retryWrites=true&w=majority
```

Start backend:

```bash
npm start
```

Backend runs at:

```text
http://localhost:5000
```

Test:

```text
GET http://localhost:5000/
```

## 2. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

The Vite proxy forwards `/api` requests to the Express backend.

## API examples

### Create user

`POST /api/users`

```json
{
  "name": "Rahul",
  "email": "rahul@example.com"
}
```

### Create post

`POST /api/posts`

```json
{
  "title": "My First Post",
  "content": "Hello from my MERN application",
  "userId": "PASTE_USER_ID_HERE"
}
```

### Get posts with user information

`GET /api/posts`

The response contains populated user information:

```json
[
  {
    "_id": "...",
    "title": "My First Post",
    "content": "Hello from my MERN application",
    "user": {
      "_id": "...",
      "name": "Rahul",
      "email": "rahul@example.com"
    }
  }
]
```

## Important Mongoose relationship

The Post schema stores the user's ObjectId:

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
```

Then the GET route uses:

```js
Post.find().populate("user", "name email")
```

This is the required schema-to-schema reference and populated user information.

-created by shivensinh parmar
