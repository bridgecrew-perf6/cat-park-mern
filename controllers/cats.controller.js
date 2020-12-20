const Cat = require('../models/cat.model');

// @desc        GET all cats breed information
// @route       GET /api/v1/cats
// @access      Public
exports.getCats = async (req, res) => {
    try {
        const cats = await Cat.find();

        return res.status(200).json({
            success: true,
            count: cats.length,
            data: cats,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
