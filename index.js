require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./routes/Routes')
const models = require('./models/Models')
const sequelize = require('./DB')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/ErrorMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Started!')
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

start();
