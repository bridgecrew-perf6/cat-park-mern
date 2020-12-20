const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    name: String,
    origin: String,
    temperament: String,
    weightImperial: String,
    lifeSpan: String,
    indoor: Boolean,
    lap: Boolean,
    intelligence: Number,
    adaptability: Number,
    energyLevel: Number,
    affectionLevel: Number,
    childFriendly: Number,
    strangerFriendly: Number,
    dogFriendly: Number,
    sheddingLevel: Number,
    socialNeeds: Number,
    description: String,
    wikipediaUrl: String,
    imageUrl: String,
});

module.exports = mongoose.model('Cat', CatSchema);
