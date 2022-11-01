/// IMPORTING
require('dotenv').config();

const express = require('express')
const cors = require('cors')

const {PORT} = process.env

const {register, login} = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express();

///MIDDLEWARE to parse requests into JSON
app.use(express.json())
app.use(cors())


///ENDPOINTS

//AUTH
app.post('/register', register)
app.post('/login', login)

//GET POSTS - no auth
app.get('/posts', getAllPosts)

///CRUD POSTS - auth required
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('posts/:id', isAuthenticated, deletePost)


//listening to port
app.listen(PORT, () => console.log(`db sync successful and server running on port ${PORT}`))
