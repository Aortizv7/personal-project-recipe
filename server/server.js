require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , axios = require('axios')
    , API_KEY = process.env.API_KEY

const app = express();

app.use(bodyParser.json());
app.use(cors());
massive(process.env.CONNECTION_STRING).then(db =>
    app.set('db', db)
);

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
},(accessToken, refreshToken, extraParams, profile, done)=>{
        const db= app.get('db')
    }))

// console.log(`this is what app is : ${app}`)

app.get('/api/search', (req, res) => {
    if (req.query.term) {
        axios.get(`http://food2fork.com/api/search?key=${API_KEY}&q=${req.query.term}`).then(response => {
            res.status(200).send(response.data)
        })
    } else {
        axios.get(`http://food2fork.com/api/search?key=${API_KEY}`).then(response => {
            res.status(200).send(response.data)
        }).catch(error => console.log(error))
    }
})


app.get('/api/recipe/:id',(req,res)=>{
    axios.get(`http://food2fork.com/api/get?key=${API_KEY}&rId=${req.params.id}`).then(response=>{
        res.status(200).send(response.data)
    }).catch(error=>console.log(error))
})



const PORT = 3535
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));