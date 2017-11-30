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


app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db =>
    app.set('db', db)
);


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
    successRedirect: process.env.SUCCESSFUL_REDIRECT,
    failureRedirect: '/auth'
}))

app.get('/auth/me', (req, res) => {
    if (req.user) {
        return res.status(200).send(req.user)
    } else {
        return res.status(401).send(`You Need To Log In`)
    }
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.LOG_OUT_REDIRECT)
})


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


app.get('/api/recipe/:id', (req, res) => {
    axios.get(`http://food2fork.com/api/get?key=${API_KEY}&rId=${req.params.id}`).then(response => {
        res.status(200).send(response.data)
    }).catch(error => console.log(error))
})


app.get('/api/favorites', (req, res) => {
    var db = app.get('db');
    console.log(req.user.id)
    db.find_favorite_recipes([req.user.id]).then((recipeId) => {
        console.log('it made it here ', recipeId)
        res.status(200).send(recipeId)
    }).catch(error => console.log(error))
})


app.post('/api/favorites/add/:id', (req, res) => {
    var db = app.get('db');
    let { id } = req.params;
    db.add_to_favorites([id, req.user.id]).then((updatedFavorites) => {
        res.status(200).send(updatedFavorites)
    }).catch(error => console.log(error))
})


app.delete('/api/favorites/delete/:id', (req, res) => {
    var db = app.get('db');
    let { id } = req.params;
    db.remove_from_favorites([id, req.user.id]).then((deletedFavorite) => {
        res.status(200).send(deletedFavorite)
    }).catch(error => console.log(error))
})


const PORT = 3535
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));