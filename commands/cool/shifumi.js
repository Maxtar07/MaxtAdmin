const Discord = require(`discord.js`);
const { RockPaperScissors } = require(`discord-gamecord`);
module.exports = {
    callback: async (bot, interaction) => {
        var opponent = interaction.options.getUser(`adversaire`);
        if (!opponent) return;
        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
                title: `Shifumi`,
                color: `#5865f2`,
                description: `Choisi ce que tu veux jouer avec les boutons`,
            },
            buttons: {
                rock: `Pierre`,
                paper: `Feuille`,
                scissors: `Ciseaux`,
            },
            emojis: {
                rock: `🌑`,
                paper: `📰`,
                scissors: `✂`,
            },
            mentionUser: true,
            requestMessage: `{player} t'a invité à faire une partie de shifumi !`,
            rejectMessage: `L'adevsersiare que tu as choisi à refusé ton invitation...`,
            buttonStyle: `PRIMARY`,
            timeoutTime: 60000,
            timeoutMessage: `Le jeu s'est terminé, personne n'a gagné...`,
            pickMessage: `Tu as choisi {emoji}.`,
            winMessage: `{player} as gagné !!`,
            tieMessage: `Égalité ! refaites une partie`,
            playerOnlyMessage: `Seulement {player} and {opponent} peuvent utiliser ces bouttons`
        });

        Game.startGame();
        Game.on(`gameOver`, result => {
            return;
        });
    },
    name: `shifumi`,
    description: `Joue à shifumi avec un autre membre`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `adversaire`,
            description: `Le membre contre qui tu veux jouer`,
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    permissionsRequired: [],
    botPermissions: []
};
