const { Schema, model } = require(`mongoose`);
const UsersListSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userChoice: {
        type: String,
        required: true
    }
});
const ChoicesSchema = new Schema({
    choiceName: {
        type: String,
        required: true
    },
    usersList: {
        type: Map,
        of: UsersListSchema
    }
});
const pollSchema = new Schema({
    pollId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    choices: {
        type: Map,
        of: ChoicesSchema
    }
})
const pollsListSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    guildName: {
        type: String,
        required: true
    },
    polls: {
        type: Map,
        of: pollSchema
    },
});
module.exports = model(`PollsList`, pollsListSchema);