require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , axios = require('axios')
    , PORT=3535
    , API_KEY =process.env.API_KEY
    , app = express();

app.use(bodyParser.json());
app.use(cors());
massive(process.env.CONNECTION_STRING).then(db =>
    app.set('db', db)
);

console.log(`this is what app is : ${app}`)

app.get('/api/search', (req, res) => {
    if (req.query.term) {
        axios.get(`http://food2fork.com/api/search?key=${API_KEY}&q=${req.query.term}`).then(response => {
            res.status(200).send(response.data)
        })
    } else {
        axios.get(`http://food2fork.com/api/search?key=${API_KEY}`).then(response => {
            res.status(200).send(response.data)
        }).catch(error=>console.log(error))
    }
})

app.get('/api/recipe', (req, res) => {
    if (req.params.id) {
        axios.get(`http://food2fork.com/api/get?key=${API_KEY}&rId=${req.params.id}`).then(response => {
            res.status(200).send(response.data)
        })
    } else {
        axios.get(`http://food2fork.com/api/search?key=${API_KEY}`).then(response => {
            res.status(200).send(response.data)
        }).catch(error=>console.log(error))
    }
})




app.listen(PORT, () => console.log(`Listening on port:${PORT}`));