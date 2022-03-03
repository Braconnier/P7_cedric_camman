const express = require('express')
const path = require('path');
const { sequelize } = require('./models')
const commentsRoutes = require('./routes/comments.routes');
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');
const likesRoutes = require('./routes/likes.routes')

const cors = require('cors')
const helmet = require('helmet')


const app = express()

app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(express.json())
// app.use(express.urlencoded({ extended: true }));


app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/api/comments', commentsRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/post', likesRoutes)



app.listen(async () => {
    console.log(`Server running on https://localhost:${process.env.SERVER_PORT}`)
    await sequelize.authenticate({ alter: true })
    console.log('Database connected')
})

module.exports = app
