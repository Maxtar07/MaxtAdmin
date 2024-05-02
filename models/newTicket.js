const { Schema, model } = require(`mongoose`);
let NewTicketSchema = new Schema({
    NewTicket: String,
    content: Array
})
module.exports = model(`newTicket`, NewTicketSchema)