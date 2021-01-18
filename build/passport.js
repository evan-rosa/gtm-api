"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');
const gapi = require('googleapis');
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
/*  EXPRESS */
app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
}));
app.get('/', function (req, res) {
    res.render('pages/auth');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
/*  PASSPORT SETUP  */
var userProfile;
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send('error logging in'));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
//Auth
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken) => {
    console.log("access token: ", accessToken);
    const getStatus = axios.get('https://www.googleapis.com/tagmanager/v2/accounts/3327262173/containers', {
        headers: { authorization: 'bearer' + accessToken },
    });
    console.log(getStatus.data);
}));
app.get('/auth/google', passport.authenticate('google', {
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
}));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
});
