const { Schema, model } = require(`mongoose`);
const roleSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    },
});
const autoRoleSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    guildName: {
        type: String,
        required: true,
    },
    roles: {
        type: Map,
        of: roleSchema
    }
});
module.exports = model(`AutoRole`, autoRoleSchema);