const PollsList = require(`../../models/PollsList`)
module.exports = async (bot, interaction) => {
    let pollsList = await PollsList.findOne({ guildId: interaction.guild.id });

    const userId = interaction.user.id;
    const userName = interaction.user.username;
    const pollId = interaction.message.id;
    const poll = pollsList.polls.get(pollId);
    const index = parseInt(interaction.customId.split(`_`)[1]);
    const embeds = interaction.message.embeds;
    const theembed = embeds[0];
    const value = parseInt(theembed.fields[index].value.split(` `)[1]);
    const eachchoice = Array.from(poll.choices)
    let count = 0;
    let previousVote;

    for (let i = 0; i < eachchoice.length; i++) {
        const users = Array.from(poll.choices.get(`Choix numéro ${i + 1}`).usersList.values());
        const matchingUsers = users.filter(user => user.userId === userId);
        if (matchingUsers.length > 0) { count++ }
    }
    if (count === 0) {
        theembed.fields[index].value = `Votes: ${value + 1}`;
        await interaction.update({ embeds: [theembed] });
        const user = {
            userName: userName,
            userId: userId,
            userChoice: index + 1
        };
        poll.choices.get(`Choix numéro ${index + 1}`).usersList.set(userName, user);
        await pollsList.save();
    } else {
        for (let i = 0; i < eachchoice.length; i++) {
            const choiceNumber = parseInt(poll.choices.get(`Choix numéro ${i + 1}`).usersList.get(userName)?.userChoice);
            if (choiceNumber) {
                previousVote = choiceNumber
            }
        }
        if (!(index + 1 === previousVote)) {
            const valuepreviousVote = parseInt(theembed.fields[previousVote - 1].value.split(` `)[1]);
            theembed.fields[index].value = `Votes: ${value + 1}`;
            theembed.fields[previousVote - 1].value = `Votes: ${valuepreviousVote - 1}`;
            await interaction.update({ embeds: [theembed] })
            const user = {
                userName: userName,
                userId: userId,
                userChoice: index + 1
            };
            poll.choices.get(`Choix numéro ${index + 1}`).usersList.set(userName, user);
            poll.choices.get(`Choix numéro ${previousVote}`).usersList.delete(userName, user);
            await pollsList.save();
        } else {
            return interaction.reply({ ephemeral: true, content: `Tu as déjà voté pour ce choix, tu peux changer ton vote en cliquant sur un autre bouton mais attention, cela va supprimer ce choix` })
        }
    };
}
