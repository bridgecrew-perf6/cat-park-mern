const User = require('../models/user.model');

// @desc        Get user profile by user ID
// @route       GET /api/v1/profile/:userId
// @access      Public
exports.getProfileById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'No such post ID on record',
            });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
