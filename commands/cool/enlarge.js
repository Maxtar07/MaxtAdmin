const Discord = require(`discord.js`);
const { default: axios } = require(`axios`)
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        let emoji = interaction.options.getString(`emoji`).trim();
        if (emoji.startsWith(`<`) && emoji.endsWith(`>`)) {
            const id = emoji.match(/\d{15,}/g)[0];
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then(image => {
                if (image) return `gif`
                else return `png`
            }).catch(err => {
                return `png`
            })
            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality-lossless`
        }

        if (!emoji.startsWith(`http`)) {
            return await interaction.reply({ content: `Impossible d'agrandir les emojis par défaut`, ephemeral: true })
        }
        if (!emoji.startsWith(`https`)) {
            return await interaction.reply({ content: `Impossible d'agrandir les emojis par défaut`, ephemeral: true })
        }

        const embed = new Discord.EmbedBuilder()
            .setColor(`#0099ff`)
            .setTitle(`Émoji agrandit !`)
            .setImage(emoji)
            .setTimestamp()
            .setFooter({ text: `Agrandisseur d'emoji` })

        interaction.reply({ embeds: [embed] });
    },
    name: `enlarge`,
    description: `Agrandit l'emoji de ton choix`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `emoji`,
            description: `l'emoji que tu veux agrandir`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};
