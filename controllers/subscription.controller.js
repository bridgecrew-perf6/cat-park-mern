const webpush = require('web-push');
const User = require('../models/user.model');
require('dotenv').config({ path: './config/config.env' });

webpush.setVapidDetails(
    `${process.env.HOST}`,
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_SECRET
);

// @desc        Create a subscription
// @route       POST /api/subscribe
// @access      Private
exports.subscribe = async (req, res) => {
    // Get pushSubscription object
    const { pushTitle, pushContent } = req.body;
    // Create payload
    const payload = JSON.stringify({
        title: pushTitle,
        body: pushContent,
        icon:
            'https://cdn3.iconfinder.com/data/icons/materia-flat-halloween-free/24/039_026_cat_black_witch_halloween-512.png',
    });

    // Get all subscriptions from DB and for each one, push a message
    let numOfSubscriber = 0;
    try {
        const users = await User.find();
        users.map(user => {
            // Pass object into sendNotification
            if (user.subscription && user.subscription.endpoint) {
                webpush
                    .sendNotification(user.subscription, payload)
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err.body);
                    });
                numOfSubscriber++;
            }
        });
        return res.status(200).json({ numOfSubscriber });
    } catch (err) {
        return res.status(500).json('Server Error');
    }
};

// @desc        Get the VAPID public key from the environment variable
// @route       GET /api/subscribe
// @access      Private
exports.getPublicVapidKey = async (req, res) => {
    return res.status(200).json(process.env.VAPID_KEY_PUBLIC);
};
