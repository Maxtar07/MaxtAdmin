const { Schema, model } = require(`mongoose`);
const warnSchema = new Schema({
    reason: {
        type: String,
        required: true
    },
    warnerId: {
        type: String,
        required: true
    },
    warnerName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    globalName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    hasLeave: {
        type: Boolean,
        default: false,
    },
    messages: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    warns: {
        type: Map,
        of: warnSchema
    }
});
const serverSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    guildName: {
        type: String,
        required: true,
    },
    users: {
        type: Map,
        of: userSchema
    }
});
module.exports = model(`GuildInfos`, serverSchema);