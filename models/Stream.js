const { Schema, model } = require(`mongoose`);
let StreamSchema = new Schema({
    statusStream: String,
    content: Array
})
module.exports = model(`stream`, StreamSchema)
