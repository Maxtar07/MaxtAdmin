const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const responses = [
            `c'est certain.`,
            `Sans aucun doute.`,
            `Oui, absolument.`,
            `Vous pouvez vous y fier.`,
            `Oui, définitivement.`,
            `Comme je le vois, oui.`,
            `Probablement.`,
            `Les perspectives sont bonnes.`,
            `Oui.`,
            `Je ne suis pas sûr, demandez à nouveau plus tard.`,
            `Mieux vaut ne pas vous le dire maintenant.`,
            `Je ne peux pas prédire maintenant.`,
            `Ma réponse est non.`,
            `Mes sources disent non.`,
            `c'est fort possible.`,
            `Les signes pointent vers oui.`,
            `Il est clair que oui.`,
            `Il est fort probable.`,
            `Tout indique que oui.`,
            `Selon les informations disponibles, oui.`,
            `Ne vous y trompez pas, oui.`,
            `La réponse se trouve devant vous.`,
            `Absolument.`,
            `Tout à fait.`,
            `Pour sûr !`,
            `Bien sûr !`,
            `Je ne peux que dire oui.`,
            `À vous de voir.`,
            `Je n'ai pas d'opinion à ce sujet.`,
            `Pas sûr`,
            `Je ne peux pas répondre à ça maintenant.`,
            `Même si je le savais, je ne pourrais pas vous le dire.`,
            `La réponse est incertaine.`,
            `Il est difficile de dire pour le moment.`,
            `Impossible de prédire maintenant.`,
            `Non, ce n'est pas probable.`,
            `Mes sources disent non.`
        ];

        const question = interaction.options.get(`question`).value;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const authorTag = interaction.user.tag;
        const currentTime = new Date().toLocaleString();

        const embed = new Discord.EmbedBuilder()
            .setColor(`#0099ff`)
            .setTitle(`Réponse de la boule magique 8`)
            .addFields({ name: `Question`, value: `'''${question}'''` },
                { name: `Réponse`, value: `'''${randomResponse}'''` })
            .setFooter({ text: `Posée par ${authorTag} | ${currentTime}` });

        interaction.reply({ embeds: [embed] });
    },
    name: `8ball`,
    description: `Posez une question à la boule magique 8.`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `question`,
            description: `La question à poser`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};
