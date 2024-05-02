const Discord = require(`discord.js`);
const randomDice = () => Math.floor(Math.random() * 6) + 1;
const diceImg = new Discord.AttachmentBuilder(`./assets/img/dice.png`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const dice_embed = new Discord.EmbedBuilder()
            .setColor(`Random`)
            .setTitle(`Lancé de dés`)
            .setThumbnail(`attachment://dice.png`)
            .addFields(
                { name: `D#1`, value: `${randomDice()}`, inline: true },
                { name: `D#2`, value: `${randomDice()}`, inline: true },
                { name: `D#3`, value: `${randomDice()}`, inline: true }
            )
            .addFields(
                { name: `D#4`, value: `${randomDice()}`, inline: true },
                { name: `D#5`, value: `${randomDice()}`, inline: true },
                { name: `D#6`, value: `${randomDice()}`, inline: true }
            )
        dice_embed.addFields(
            { name: `Total`, value: `${dice_embed.data.fields.reduce((total, obj) => parseInt(obj.value) + total, 0)}` }
        )
        interaction.reply({ embeds: [dice_embed], files: [diceImg] });
    },
    name: `dice`,
    description: `Lance 6 dés et affiche les 6 chiffres obtenus`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [],
    botPermissions: []
};
