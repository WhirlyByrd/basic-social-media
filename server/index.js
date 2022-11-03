/// IMPORTING
require('dotenv').config();

const {sequelize} = require('./util/database');
const {User} = require('./models/user')
const {Post} = require('./models/post')

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

//setup relationships for User and Post
User.hasMany(Post)
Post.belongsTo(User)


///ENDPOINTS

//AUTH
app.post('/register', register)
app.post('/login', login)

//GET POSTS - no auth
app.get('/posts', getAllPosts)

///CRUD POSTS - auth required
//uses isAuthenticate, if all passes 
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('posts/:id', isAuthenticated, deletePost)

//connect to database & listen to port
sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db sync succesful & server running on port ${PORT}`))
})
.catch(err => console.log(err))
