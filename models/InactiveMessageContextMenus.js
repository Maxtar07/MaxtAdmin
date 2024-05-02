const { Schema, model } = require(`mongoose`);
const inactiveMessageContextMenusSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inactive: {
    type: Boolean,
    default: false,
  },
});
module.exports = model(`inactiveMessageContextMenus`, inactiveMessageContextMenusSchema);