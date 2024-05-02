const Discord = require(`discord.js`);
const { Hangman } = require(`discord-gamecord`);
const mots = require(`../../assets/jsons/mots.json`);
module.exports = {
  callback: async (bot, interaction) => {
    const { mot, categorie } = choisirMotAleatoireCategorieAleatoire(mots);
    function choisirMotAleatoire(listeMots) {
      const indiceAleatoire = Math.floor(Math.random() * listeMots.length);
      return listeMots[indiceAleatoire];
    }

    function choisirMotAleatoireCategorieAleatoire(objetMots) {
      // Obtenir une liste aléatoire de clés
      const categoriesAleatoires = Object.keys(objetMots).sort(() => Math.random() - 0.5);

      // Obtenir la première clé de la liste
      const categorieAleatoire = categoriesAleatoires[0];

      // Obtenir un mot aléatoire de la catégorie
      const motAleatoire = choisirMotAleatoire(objetMots[categorieAleatoire]);

      // Retourner le mot aléatoire et la catégorie
      return {
        mot: motAleatoire,
        categorie: categorieAleatoire,
      };
    }
    const Game = new Hangman({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: `Pendu`,
        overTitle: `Game Over`,
        color: `#5865F2`
      },
      hangman: { hat: `🎩`, head: `😟`, shirt: `👕`, pants: `🩳`, boots: `👞👞` },
      customWord: mot,
      theme: categorie,
      timeoutTime: 60000,
      timeWords: `all`,
      winMessage: `Tu as gagné !! Le mot était {word}`,
      loseMessage: `Tu as perdu !! Le mot était {word}`,
      playerOnlyMessage: `Seulement {player} peux utiliser ces bouttons`
    });

    Game.startGame();
    Game.on(`gameOver`, result => {
      return;
    });
  },
  name: `pendu`,
  description: `Joue au jeu Pendu.`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [],
  permissionsRequired: [],
  botPermissions: []
};
