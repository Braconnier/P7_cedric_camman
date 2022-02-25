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

// // CORS killer
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Access-Control-Request-Method', 'POST');
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept, Authorization");
//     res.setHeader('Content-Security-Policy', "default-src 'self'");
//     res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
//     res.setHeader('X-XSS-Protection', '1;mode=block');
//     res.setHeader('X-Frame-Options', 'SAMEORIGIN');
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     res.setHeader('Connection', 'keep-alive');
//     res.setHeader('Content-Type', 'application/json');
//     next();
// });




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
