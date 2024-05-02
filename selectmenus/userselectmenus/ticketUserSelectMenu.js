module.exports = {
    name: `ticketUserSelectMenu`,
    description: `Select menu pour ajouter des membres à un ticket`,
    userSelectMenuId: `ticketuserselectmenu`,
    execute: async (bot, interaction) => {
        const members = interaction.values
        for (let i = 0; i < members.length; i++) {
            const user = members[i]
            if (!user) {
                return
            } else {
                interaction.channel.permissionOverwrites.edit(user, {
                    ViewChannel: true,
                    SendMessages: true,
                    AttachFiles: true,
                    ReadMessageHistory: true
                });
            }
        }
        interaction.reply({ content: `Les membres sélectionnés ont bien été ajouté au ticket`, ephemeral: true });
    }
};
