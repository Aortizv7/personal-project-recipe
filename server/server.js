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

//this is my middleware//
app.use(bodyParser.json());
app.use(cors());


//this will save the users session to keep them loged in for a while//
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

//Passport goes here //
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db =>
    app.set('db', db)
);

// I will set up the auth0 authentication here //
passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function (acessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    const userData = profile._json;
    db.find_user([userData.identities[0].user_id]).then(user => {
        if (user[0]) {
            return done(null, user[0].id);
        } else {
            db.create_user([
                userData.name,
                userData.email,
                userData.picture,
                userData.identities[0].user_id
            ]).then(user => {
                return done(null, user[0].id)
            })
        }
    })

}))
passport.serializeUser((id, done) => {
    done(null, id)
    console.log(id)
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then(user => {
        done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/search',
    failureRedirect: '/auth'
}))

app.get('/auth/me',(req,res)=>{
    if(req.user){
        return res.status(200).send(req.user)
    }else{
        return res.status(401).send(`You Need To Log In`)
    }
})

app.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('http://localhost:3000/')
})


//these are my axios calls that talk to the front end to get the recipe info//

//this one gets the initial search as well as any query i.e. if a customer
//wants to search by ingredients or keywords or recipe name it is done here//

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

// this is continued on axios requests but this one gets individual recipes paramed by id

app.get('/api/recipe/:id',(req,res)=>{
    axios.get(`http://food2fork.com/api/get?key=${API_KEY}&rId=${req.params.id}`).then(response=>{
        res.status(200).send(response.data)
    }).catch(error=>console.log(error))
})

//additional axios calls to talk directly to database
//I will be able to add favorite recipes based on a user_id
// i will be able to find a user's favorite recipes and send them to 
//fron end to display 











const PORT = 3535
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));