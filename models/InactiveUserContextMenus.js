const { Schema, model } = require(`mongoose`);
const inactiveUserContextMenusSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inactive: {
    type: Boolean,
    default: false,
  },
});
module.exports = model(`inactiveUserContextMenus`, inactiveUserContextMenusSchema);