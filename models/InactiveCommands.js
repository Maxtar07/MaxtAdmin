const { Schema, model } = require(`mongoose`);
const inactiveCommandsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inactive: {
    type: Boolean,
    default: false,
  },
});
module.exports = model(`inactiveCommands`, inactiveCommandsSchema);