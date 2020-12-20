const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc        Handle user login
// @route       POST /api/auth/login
// @access      Public
exports.handleLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res
                .status(400)
                .json('No account with this user name has been registered');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Incorrect password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.userName,
                isAdmin: user.isAdmin,
                isSubscribed: user.isSubscribed,
                displayName: user.name,
            },
        });
    } catch (err) {
        res.status(500).json('Server Error');
    }
};

// @desc        Handle user's account deletion
// @route       DELETE /api/auth/delete
// @access      Private
exports.handleDelete = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json({ name: deletedUser.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc        Validate user's token
// @route       POST /api/auth/tokenValidation
// @access      Private
exports.handleTokenValidation = async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.json(false);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            res.json(false);
        }

        const user = await User.findById(verified.id);
        if (!user) {
            res.json(false);
        }

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
