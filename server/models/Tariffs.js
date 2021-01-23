const mongoose = require('mongoose');

const TariffsSchema = new mongoose.Schema({
    name: String,
    description: String,
    cost: Number,
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
    activeServices: {
        type: Array,
        default: [],
    }
});


const Tariffs = mongoose.model('Tariffs', TariffsSchema);
module.exports = Tariffs;