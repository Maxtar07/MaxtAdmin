const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const stringSelectMenuId = `teststringselectmenu`;
        const stringSelectMenuLabel = `Sélectionnez une option`;

        const stringSelectMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId(stringSelectMenuId)
            .setPlaceholder(stringSelectMenuLabel)
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions([
                {
                    label: `Option 1`,
                    description: `Option 1 description`,
                    value: `option1`,
                    emoji: `🟥`
                },
                {
                    label: `Option 2`,
                    description: `Option 2 description`,
                    value: `option2`,
                    emoji: `🟩`
                },
                {
                    label: `Option 3`,
                    description: `Applique un effet 3d à la musique`,
                    value: `option3`,
                    //emoji: `🟦`
                },
            ])

        const row = new Discord.ActionRowBuilder().addComponents(stringSelectMenu);

        interaction.reply({
            content: `Ceci est un message avec un String Select Menu !`,
            components: [row], ephemeral: false,
        });
    },
    name: `stringselectmenu`,
    description: `Commande pour envoyer un String Select Menu`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
