const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// @desc        Create a user
// @route       POST /api/v1/users
// @access      Public
exports.createUser = async (req, res) => {
    const { userName, name, email, password, isAdmin } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (user) {
            return res
                .status(401)
                .json('This user name has been used, please change another');
        }

        const newUser = new User({
            userName,
            name,
            email,
            password,
            isAdmin,
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                if (err) throw err;
                // Set password to hashed
                newUser.password = hashedPassword;
                newUser.save().catch(err => console.log(err));
            });
        });

        res.json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Update a subscription
// @route       PUT /api/v1/users/:userName/subscription
// @access      Public
exports.updateSubscription = async (req, res) => {
    const subscription = req.body;
    const userName = req.params.userName;

    try {
        await User.updateOne({ userName }, { subscription });
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get a user by JWT
// @route       GET /api/v1/users/
// @access      Public
exports.getLoggedinUser = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'No such user on record',
            });
        }
        return res.json({
            id: user._id,
            name: user.userName,
            isAdmin: user.isAdmin,
            isSubscribed: user.isSubscribed,
            displayName: user.name,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get a user by ID
// @route       GET /api/v1/users/:userName
// @access      Public
exports.getUserByUsername = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'No such user on record',
            });
        }
        return res.json({
            id: user._id,
            userName: user.userName,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Edit a user
// @route       PUT /api/v1/users/:userName
// @access      Public
exports.editUser = async (req, res) => {
    try {
        const { name, email, isSubscribed } = req.body;
        const userName = req.params.userName;

        if (name && email) {
            await User.updateOne({ userName }, { name, email });
        } else if (name) {
            await User.updateOne({ userName }, { name });
        } else if (email) {
            await User.updateOne({ userName }, { email });
        } else if (isSubscribed !== undefined) {
            await User.updateOne({ userName }, { isSubscribed });
        }

        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
