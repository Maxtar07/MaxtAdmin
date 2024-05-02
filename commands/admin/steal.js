const Discord = require(`discord.js`);
const { default: axios } = require(`axios`);
module.exports = {
    callback: async (bot, interaction) => {
        let emoji = interaction.options.getString(`emoji`)?.trim();
        const name = interaction.options.getString(`name`);
        if (emoji.startsWith(`<`) && emoji.endsWith(`>`)) {
            const id = emoji.match(/\d{15,}/g)[0];
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                .then(image => {
                    if (image) return `gif`;
                    else return `png`;
                }).catch(err => {
                    return `png`;
                });
            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }
        if (!emoji.startsWith(`http`)) {
            return interaction.reply({ content: `Vous ne pouvez pas voler les emojis de base`, ephemeral: true });
        }
        if (!emoji.startsWith(`https`)) {
            return interaction.reply({ content: `Vous ne pouvez pas voler les emojis de base`, ephemeral: true })
        }
        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}` })
            .then(emoji => {
                const embed = new Discord.EmbedBuilder()
                    .setColor(`Blue`)
                    .setDescription(`Émoji ${emoji} ajouté avec succès, avec comme nom: **${name}**`)
                return interaction.reply({ embeds: [embed] })
            }).catch(err => {
                interaction.reply({ content: `Vous ne pouvez pas ajouter plus d'emoji car vous avez atteint la limite maximal sur le serveur`, ephemeral: true })
            });
    },
    name: `steal`,
    description: `Commande pour voler les emojis des autres serveurs et les ajouter au notre`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `emoji`,
            description: `L'emoji que tu veux voler à un autre serveur`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: `name`,
            description: `Le nom que tu veux donner à l'emoji sur le serveur`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.ManageGuildExpressions],
    botPermissions: [Discord.PermissionFlagsBits.ManageGuildExpressions]
};
