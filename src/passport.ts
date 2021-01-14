const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');
const gapi = require('googleapis');

import * as dotenv from 'dotenv';

dotenv.config();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

/*  EXPRESS */
app.set('view engine', 'ejs');

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  })
);

app.get('/', function (req: any, res: any) {
  res.render('pages/auth');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */
var userProfile: any;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req: any, res: any) => res.send(userProfile));
app.get('/error', (req: any, res: any) => res.send('error logging in'));

passport.serializeUser(function (user: any, cb: any) {
  cb(null, user);
});

passport.deserializeUser(function (obj: any, cb: any) {
  cb(null, obj);
});

//Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },

    (accessToken: any) => {
      console.log("access token: ", accessToken);
      const getStatus = axios.get('https://www.googleapis.com/tagmanager/v2/accounts/3327262173/containers', {
        headers: { authorization: 'bearer' + accessToken },
      });

      console.log(getStatus.data);
    }


  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/tagmanager.readonly',
      'https://www.googleapis.com/auth/tagmanager.manage.accounts',
      'https://www.googleapis.com/auth/tagmanager.edit.containers',
      'https://www.googleapis.com/auth/tagmanager.delete.containers',
      'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
      'https://www.googleapis.com/auth/tagmanager.manage.users',
      'https://www.googleapis.com/auth/tagmanager.publish',
    ],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req: any, res: any) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  }
);
