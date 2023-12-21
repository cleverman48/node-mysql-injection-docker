import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import passport from 'passport'
import { creatDummyUsers } from './controllers/dummyController.js';

dotenv.config()

const app = express()
import mypass from './config/passport.js';
mypass(passport);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(passport.initialize());

import authentication from './routes/auth.js';
import appointment from './routes/appointment.js';

app.use('/', authentication);
app.use('/api', passport.authenticate('jwt', { session: false}), appointment);



const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

creatDummyUsers();