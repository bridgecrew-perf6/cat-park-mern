const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const auth = require('./routes/auth');
const cats = require('./routes/cats');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const catComments = require('./routes/catComments');
const likes = require('./routes/likes');
const users = require('./routes/users');
const profile = require('./routes/profile');
const subscription = require('./routes/subscription');
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT || 5000;
require('dotenv').config({ path: './config/config.env' });

const enforceHttps = (req, res, next) => {
    // Check if directly requested via https
    if (req.secure) {
        next();
        // Heroku sets a header X-Forwarded-Proto to pass the user requested protocol
    } else if (
        (req.headers['x-forwarded-proto'] || '').substring(0, 5) === 'https'
    ) {
        next();
        // Only redirect GET and HEAD requests
    } else if (req.method === 'GET' || req.method === 'HEAD') {
        const host = req.headers['x-forwarded-host'] || req.headers.host;
        // Redirect with 301 Moved Permanently instead of default 302
        res.redirect(301, `https://${host}${req.originalUrl}`);
    } else {
        res.status(403).send('This server requires an HTTPS connection.');
    }
};

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(enforceHttps);
}

// Enable CORS
app.use(cors());
app.use(express.json({ extended: false }));

connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', auth);
app.use('/api/v1/cats', cats);
app.use('/api/v1/posts', posts);
app.use('/api/v1/users', users);
app.use('/api/v1/comments', comments);
app.use('/api/v1/catcomments', catComments);
app.use('/api/v1/likes', likes);
app.use('/api/v1/profile', profile);
app.use('/api/subscribe', subscription);

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, 'client')));
} else {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
