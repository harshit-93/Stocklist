var express = require('express')
var app = express()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const events = require('./db/events.json')
var bodyParser = require('body-parser')
const cors = require('cors');

var PORT = 2020
const SECRET_KEY = "ongraph"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
    origin: '*'
}
));


app.post('/login', (req, res) => {
    const userDB = fs.readFileSync('./db/user.json')
    const userInfo = JSON.parse(userDB)
    if (
        req.body &&
        req.body.email === userInfo.email &&
        req.body.password === userInfo.password
    ) {
        const token = jwt.sign({ userInfo }, SECRET_KEY)
        res.json({
            token: {
                token,
                email: userInfo.email,
                name: userInfo.name
            },
            status: "present"
        })
    } else {
        res.json({
            status: "not present"
        })
    }
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(401)
    }
}

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})