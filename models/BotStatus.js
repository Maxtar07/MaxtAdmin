const { Schema, model } = require(`mongoose`);
const botStatusSchema = new Schema({
    activity: {
        type: Number,
        required: true,
    },
    motd: {
        type: [String], required: true,
    },
    url: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    customInterval: {
        type: Number,
        required: false
    },
});
module.exports = model(`botStatus`, botStatusSchema);