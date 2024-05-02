const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const channelOption = interaction.options.getChannel(`salon`);
        const newNameOption = interaction.options.getString(`nouveau_nom`);

        if (!channelOption) {
            return interaction.reply({ content: `Veuillez spécifier un salon à renommer.`, ephemeral: true });
        }

        if (!newNameOption) {
            return interaction.reply({ content: `Veuillez fournir un nouveau nom pour le salon.`, ephemeral: true });
        }

        const channel = channelOption;

        try {
            // Vérification des permissions avant de renommer
            if (!channel.permissionsFor(interaction.member).has(`MANAGE_CHANNELS`)) {
                return interaction.reply({ content: `Vous n'avez pas la permission de renommer les salons.`, ephemeral: true });
            }

            await channel.setName(newNameOption);
            interaction.reply({ content: `Le salon a été renommé avec succès : ${newNameOption}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: `Une erreur est survenue lors du renommage du salon.`, ephemeral: true });
        }
    },
    name: `renommer-salon`,
    description: `Renomme un salon. Prend en charge les emojis dans le nouveau nom.`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `salon`,
            description: `Le salon à renommer.`,
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: `nouveau_nom`,
            description: `Le nouveau nom du salon (les emojis sont pris en charge).`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
