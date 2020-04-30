const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'goldfish',
		database: 'smartbrain'
	}
});

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users); })

app.post('/signin', signin.handleSignin(db, bcrypt) )

app.post('/register', register.handleRegister(db, bcrypt) )

app.get('/profile/:id', profile.handleProfileGet(db) )

app.put('/image', image.handleImage(db) )

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => { console.log('app is running on port 3000'); })


/*
/(root route)--> res = (returs) message - this is working 
/signin (signin route)--> POST = (returns) success/fail
/register (register route)--> POST = (returns) new user object
/profile (profile route) with optional paramater userId
/profile/:userId --> GET = (returns) the user
/image --> PUT = (returns) user
(user already exists, and we're updating their profile with an image)
*/
//app.use(express.urlencoded({extended: false}));

//app.post ('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

