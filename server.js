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
        userInfo.users.filter((user) => { return ((user.email == req.body.email) && (user.password == req.body.password)) }).length
    ) {
        const token = jwt.sign({ userInfo }, SECRET_KEY)
        res.json({
            token: {
                token,
                email: userInfo.email
            },
            status: "present"
        })
    } else {
        res.json({
            status: "not present"
        })
    }
})
app.post('/signup', (req, res) => {
    console.log(req.body);
    if (req.body.email!=""||req.body.password!="") {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(user)
        let data = JSON.parse(fs.readFileSync("./db/user.json"))
        if (data.users.filter((user) => { return user.email == req.body.email }).length) {
            res.json({
                status: "already present"
            })
        } 
        else {
            data.users.push(user)
            data = JSON.stringify(data, null, 2)
            fs.writeFile('./db/user.json', data, err => {
                if (err) {
                    console.log(err + data)
                } else {
                    const token = jwt.sign({ user }, SECRET_KEY)
                    res.json({
                        token: {
                            token,
                            email: user.email
                        },
                        status: "present"
                    })
                }
            })
        }
    } 
    else {
        res.json({
            status: "invalid"
        })
    }
})
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})