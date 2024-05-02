const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const slots = [`:grapes:`, `:cherries:`, `:lemon:`, `:apple:`];
        const slotOne = slots[Math.floor(Math.random() * slots.length)];
        const slotTwo = slots[Math.floor(Math.random() * slots.length)];
        const slotThree = slots[Math.floor(Math.random() * slots.length)];
        const slotFour = slots[Math.floor(Math.random() * slots.length)];
        const slotFive = slots[Math.floor(Math.random() * slots.length)];
        const slotSix = slots[Math.floor(Math.random() * slots.length)];
        const slotSeven = slots[Math.floor(Math.random() * slots.length)];
        const slotEight = slots[Math.floor(Math.random() * slots.length)];
        const slotNine = slots[Math.floor(Math.random() * slots.length)];

        if ((slotOne === slotTwo && slotOne === slotThree) || (slotFour === slotFive && slotFour === slotSix) || (slotSeven === slotEight && slotSeven === slotNine) || (slotOne === slotFour && slotOne === slotSeven) || (slotTwo === slotFive && slotTwo === slotEight) || (slotThree === slotSix && slotThree === slotNine) || (slotOne === slotFive && slotOne === slotNine) || (slotThree === slotFive && slotThree === slotSeven)) {
            const won = new Discord.EmbedBuilder()
                .setColor(`Green`)
                .addFields(
                    {
                        name: `
|${slotOne}|${slotTwo}|${slotThree}|
|${slotFour}|${slotFive}|${slotSix}|
|${slotSeven}|${slotEight}|${slotNine}|`, value: `Félicitation, tu as réussi à aligner 3 fruits identiques.`
                    },
                )
            interaction.reply({ ephemeral: true, embeds: [won] });
        } else {
            const lost = new Discord.EmbedBuilder()
                .setColor(`Red`)
                .addFields(
                    {
                        name: `
|${slotOne}|${slotTwo}|${slotThree}|
|${slotFour}|${slotFive}|${slotSix}|
|${slotSeven}|${slotEight}|${slotNine}|`, value: `Dommage, tu auras plus de chance la prochaine fois.`
                    },
                )
            interaction.reply({ ephemeral: true, embeds: [lost] });
        };
    },
    name: `slots`,
    description: `Tirage random, obtenir 1 ligne, 1 colonne ou 1 diagonale avec le même fruit pour gagner.`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [],
    botPermissions: []
};
