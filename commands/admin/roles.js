const Discord = require(`discord.js`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        var detenteclean = interaction.guild.roles.cache.find(x => x.id === `867519988520976385`);
        var musicclean = interaction.guild.roles.cache.find(x => x.id === `867520012582518814`);
        var adultclean = interaction.guild.roles.cache.find(x => x.id === `867520038768345088`);
        var pubroleclean = interaction.guild.roles.cache.find(x => x.id === `867520064495288340`);
        var gameurclean = interaction.guild.roles.cache.find(x => x.id === `867519905947320351`);
        var gameuseclean = interaction.guild.roles.cache.find(x => x.id === `867519870324310036`);

        var playstation = interaction.guild.roles.cache.find(x => x.id === `726428190012211211`);
        var pc = interaction.guild.roles.cache.find(x => x.id === `726428190012211212`);
        var switchrole = interaction.guild.roles.cache.find(x => x.id === `726428189991108677`);
        var xbox = interaction.guild.roles.cache.find(x => x.id === `726428190012211210`);
        var smartphone = interaction.guild.roles.cache.find(x => x.id === `726428189991108676`);

        var minecraft = interaction.guild.roles.cache.find(x => x.id === `726428189991108674`);
        var maxcraft = interaction.guild.roles.cache.find(x => x.id === `738476660235698279`)
        var rocket = interaction.guild.roles.cache.find(x => x.id === `726428189991108671`);
        var gtav = interaction.guild.roles.cache.find(x => x.id === `726428189991108669`);

        var nintendo = interaction.guild.roles.cache.find(x => x.id === `726428189978787881`);

        var animal = interaction.guild.roles.cache.find(x => x.id === `726428189978787880`);

        const pubemoji = bot.emojis.cache.find(emoji => emoji.name === `pub`)
        const minecraftemoji = bot.emojis.cache.find(emoji => emoji.name === `minecraft`)
        const maxcraftemoji = bot.emojis.cache.find(emoji => emoji.name === `maxcraft`)
        const rocketemoji = bot.emojis.cache.find(emoji => emoji.name === `rocketleague`)
        const gtavemoji = bot.emojis.cache.find(emoji => emoji.name === `gtav`)
        const nintendoemoji = bot.emojis.cache.find(emoji => emoji.name === `nintendo`)
        const animalemoji = bot.emojis.cache.find(emoji => emoji.name === `animalcrossing`)
        const playstationemoji = bot.emojis.cache.find(emoji => emoji.name === `playstation`)
        const pcemoji = bot.emojis.cache.find(emoji => emoji.name === `pc`)
        const switchemoji = bot.emojis.cache.find(emoji => emoji.name === `switch`)
        const xboxemoji = bot.emojis.cache.find(emoji => emoji.name === `xbox`)
        const smartphoneemoji = bot.emojis.cache.find(emoji => emoji.name === `smartphone`)
        const twitchemoji = bot.emojis.cache.find(emoji => emoji.name === `twitch`)

        const detenteButtonId = `detenterole`;
        const musicButtonId = `musicrole`;
        const adultButtonId = `adultrole`;
        const pubButtonId = `pubrole`;
        const gamingButtonId = `gamingrole`;
        const twitchButtonId = `twitchrole`;
        const notifButtonId = `notifrole`;
        const playstationButtonId = `playstationrole`;
        const pcButtonId = `pcrole`;
        const switchButtonId = `switchrole`;
        const xboxButtonId = `xboxrole`;
        const smartphoneButtonId = `smartphonerole`;
        const minecraftButtonId = `minecraftrole`;
        const maxcraftButtonId = `maxcraftrole`;
        const rocketButtonId = `rocketrole`;
        const gtavButtonId = `gtavrole`;
        const nintendoButtonId = `nintendorole`;
        const animalcrossingButtonId = `animalcrossingrole`;
        const detenteButtonLabel = `Détente`;
        const musicButtonLabel = `Musique`;
        const adultButtonLabel = `Adulte`;
        const pubButtonLabel = `Pub`;
        const gamingButtonLabel = `Gaming`;
        const twitchButtonLabel = `Twitch`;
        const notifButtonLabel = `Génarales`;
        const playstationButtonLabel = `Playstation`;
        const pcButtonLabel = `PC`;
        const switchButtonLabel = `Switch`;
        const xboxButtonLabel = `Xbox`;
        const smartphoneButtonLabel = `Smartphone`;
        const minecraftButtonLabel = `Minecraft`;
        const maxcraftButtonLabel = `MaxCraft`;
        const rocketButtonLabel = `Rocket League`;
        const gtavButtonLabel = `GTA V`;
        const nintendoButtonLabel = `Nintendo`;
        const animalcrossingButtonLabel = `Animal Crossing`;
        const detenteButtonStyle = `Primary`;
        const musicButtonStyle = `Primary`;
        const adultButtonStyle = `Primary`;
        const pubButtonStyle = `Primary`;
        const gamingButtonStyle = `Primary`;
        const twitchButtonStyle = `Primary`;
        const notifButtonStyle = `Primary`;
        const playstationButtonStyle = `Primary`;
        const pcButtonStyle = `Primary`;
        const switchButtonStyle = `Primary`;
        const xboxButtonStyle = `Primary`;
        const smartphoneButtonStyle = `Primary`;
        const minecraftButtonStyle = `Primary`;
        const maxcraftButtonStyle = `Primary`;
        const rocketButtonStyle = `Primary`;
        const gtavButtonStyle = `Primary`;
        const nintendoButtonStyle = `Primary`;
        const animalcrossingButtonStyle = `Primary`;

        const detentebutton = new Discord.ButtonBuilder()
            .setStyle(detenteButtonStyle)
            .setEmoji(`🛏`)
            .setLabel(detenteButtonLabel)
            .setCustomId(detenteButtonId);
        const musicbutton = new Discord.ButtonBuilder()
            .setStyle(musicButtonStyle)
            .setEmoji(`🎵`)
            .setLabel(musicButtonLabel)
            .setCustomId(musicButtonId);
        const adultbutton = new Discord.ButtonBuilder()
            .setStyle(adultButtonStyle)
            .setEmoji(`🔞`)
            .setLabel(adultButtonLabel)
            .setCustomId(adultButtonId);
        const pubbutton = new Discord.ButtonBuilder()
            .setStyle(pubButtonStyle)
            .setEmoji(pubemoji.id)
            .setLabel(pubButtonLabel)
            .setCustomId(pubButtonId);
        const gamingbutton = new Discord.ButtonBuilder()
            .setStyle(gamingButtonStyle)
            .setEmoji(`🎮`)
            .setLabel(gamingButtonLabel)
            .setCustomId(gamingButtonId);

        const twitchbutton = new Discord.ButtonBuilder()
            .setStyle(twitchButtonStyle)
            .setEmoji(twitchemoji.id)
            .setLabel(twitchButtonLabel)
            .setCustomId(twitchButtonId);
        const notifbutton = new Discord.ButtonBuilder()
            .setStyle(notifButtonStyle)
            .setEmoji(`🔔`)
            .setLabel(notifButtonLabel)
            .setCustomId(notifButtonId);

        const playstationbutton = new Discord.ButtonBuilder()
            .setStyle(playstationButtonStyle)
            .setEmoji(playstationemoji.id)
            .setLabel(playstationButtonLabel)
            .setCustomId(playstationButtonId);
        const pcbutton = new Discord.ButtonBuilder()
            .setStyle(pcButtonStyle)
            .setEmoji(pcemoji.id)
            .setLabel(pcButtonLabel)
            .setCustomId(pcButtonId);
        const switchbutton = new Discord.ButtonBuilder()
            .setStyle(switchButtonStyle)
            .setEmoji(switchemoji.id)
            .setLabel(switchButtonLabel)
            .setCustomId(switchButtonId);
        const xboxbutton = new Discord.ButtonBuilder()
            .setStyle(xboxButtonStyle)
            .setEmoji(xboxemoji.id)
            .setLabel(xboxButtonLabel)
            .setCustomId(xboxButtonId);
        const smartphonebutton = new Discord.ButtonBuilder()
            .setStyle(smartphoneButtonStyle)
            .setEmoji(smartphoneemoji.id)
            .setLabel(smartphoneButtonLabel)
            .setCustomId(smartphoneButtonId);
        const minecraftbutton = new Discord.ButtonBuilder()
            .setStyle(minecraftButtonStyle)
            .setEmoji(minecraftemoji.id)
            .setLabel(minecraftButtonLabel)
            .setCustomId(minecraftButtonId);
        const maxcraftbutton = new Discord.ButtonBuilder()
            .setStyle(maxcraftButtonStyle)
            .setEmoji(maxcraftemoji.id)
            .setLabel(maxcraftButtonLabel)
            .setCustomId(maxcraftButtonId);
        const rocketbutton = new Discord.ButtonBuilder()
            .setStyle(rocketButtonStyle)
            .setEmoji(rocketemoji.id)
            .setLabel(rocketButtonLabel)
            .setCustomId(rocketButtonId);
        const gtavbutton = new Discord.ButtonBuilder()
            .setStyle(gtavButtonStyle)
            .setEmoji(gtavemoji.id)
            .setLabel(gtavButtonLabel)
            .setCustomId(gtavButtonId);
        const nintendobutton = new Discord.ButtonBuilder()
            .setStyle(nintendoButtonStyle)
            .setEmoji(nintendoemoji.id)
            .setLabel(nintendoButtonLabel)
            .setCustomId(nintendoButtonId);
        const animalcrossingbutton = new Discord.ButtonBuilder()
            .setStyle(animalcrossingButtonStyle)
            .setEmoji(animalemoji.id)
            .setLabel(animalcrossingButtonLabel)
            .setCustomId(animalcrossingButtonId);

        var roles_embed = new Discord.EmbedBuilder()
            .setColor(`#FF0000`)
            .setTitle(`Voici la liste des rôles disponibles sur le serveur.`)
            .setDescription(`Grâce à ces rôles tu va pouvoir accéder à différentes catégories du serveur...fais tes choix et amuse-toi bien !`)
            .addFields(
                {
                    name: `Pour t'ajouter ou t'enlever un rôle, il te suffit de réagir avec le bouton qui correspond...`,
                    value: `
🛏 - Pour obtenir le rôle ${detenteclean} qui te donneras accès à la catégorie Détente où tu pourras raconter des <#726428191186485387>, poser des <#726428191186485386>, jouer à des jeux proposés par les bots et pleins d'autres choses amusantes...\n
🎮 - Pour obtenir le rôle ${gameuseclean} ou ${gameurclean} qui te donneras accès à la catégorie Gaming où tu pourras discuter de jeux vidéos et autres.Tu auras aussi la possibilité de <#726428191568298008> pour avoir accès à des salons spéciaux pour chaque jeu et t'identifier pour savoir sur quelle(s) plateforme(s) tu joue.\nSi tu veux jouer sur mon serveur ${maxcraft}, c'est aussi via cette catégorie.\n
🎵 - Pour obtenir le rôle ${musicclean} qui te donneras accès à la catégorie musique (<#726428192403095624>) où tu pourras discuter de musiques, d'artistes, etc... Il y a aussi un salon vocal pour écouter les musiques que tu veux.
`
                },
                {
                    name: `\u200b`,
                    value: `
🔞 - Pour obtenir le rôle ${adultclean} qui te donneras accès à la catégorie Coin des grands (<#726428194705768490>) où tu pourras discuter de diverses choses plus ou moins réservées aux adultes comme la <#726428194705768491> par exemple.\n
${pubemoji} - Pour obtenir le rôle ${pubroleclean} qui te donneras accès à la catégorie Publicités où tu auras la possibilité de faire de la pub pour tout ce que tu veux (serveurs, chaines YT ou Twitch, etc...) mais cela te permettras de voir les pubs des autres et ainsi tu pourras faire des découvertes intéressantes.
`
                }
            )
        const rolesrow = new Discord.ActionRowBuilder().addComponents(detentebutton, gamingbutton, musicbutton, adultbutton, pubbutton);
        await bot.channels.cache.get(`726428190427447365`).send({
            embeds: [roles_embed], components: [rolesrow], ephemeral: false
        });

        var notifs_embed = new Discord.EmbedBuilder()
            .setColor(`#FF0000`)
            .setTitle(`Voici la liste des rôles de notifs disponibles sur le serveur.`)
            .setDescription(`Grâce à ces rôles tu va pouvoir choisir quelles sortes de notifications tu veux recevoir et si tu ne veux rien, tu ne recevra aucunes notification de mention.\nSi vous n'avez pas ces rôles, vous avez tout de même accès aux salons d'annonces mais ne serez pas notifier lorsqu'un message y sera écrit. Cependant l'équipe de modération se réserve le droit de mentionner here ou everyone en cas d'annonce vraiment importante.`)
            .addFields(
                {
                    name: `Pour t'ajouter ou t'enlever un rôle, il te suffit de réagir avec le bouton qui correspond...`,
                    value: `
${twitchemoji} - Si tu veux être informé des streams ou toute annonce importante concernant Twitch.\n
🔔 - Si tu veux recevoir les notifications de mention pour les annonces générales concernant le discord (équivalent à here ou everyone, mais évite de mentionner les gens qui ne veulent pas l'être.)
`
                }
            );
        const notifrolesrow = new Discord.ActionRowBuilder().addComponents(twitchbutton, notifbutton);
        await bot.channels.cache.get(`726428190427447365`).send({
            embeds: [notifs_embed], components: [notifrolesrow], ephemeral: false
        });

        var games_embed = new Discord.EmbedBuilder()
            .setColor(`#FF0000`)
            .setTitle(`Voici la liste des jeux disponibles sur le serveur.`)
            .setDescription(`Grâce à ces rôles tu va pouvoir accéder à différentes catégories pour parler spécifiquement de chaque jeu...fais tes choix et amuse-toi bien !\nSi tu veux rajouter des jeux, fait ta demande dans le salon <#726428191568298006>.`)
            .addFields(
                {
                    name: `Pour t'ajouter ou t'enlever un rôle, il te suffit de réagir avec le bouton qui correspond...`,
                    value: `
${minecraftemoji} - Si tu es un joueur de ${minecraft}
${maxcraftemoji} - Si tu veux jouer sur mon serveur ${maxcraft} (<#738492340519436349>)
${rocketemoji} - Si tu es un joueur de ${rocket}
${gtavemoji} - Si tu es un joueur de ${gtav}
${nintendoemoji} - Si tu es un joueur de jeux ${nintendo}
`
                }
            );
        const gamesrolesrow = new Discord.ActionRowBuilder().addComponents(minecraftbutton, maxcraftbutton, rocketbutton, gtavbutton, nintendobutton);
        await bot.channels.cache.get(`726428191568298008`).send({
            embeds: [games_embed], components: [gamesrolesrow], ephemeral: false
        });

        var plateform_embed = new Discord.EmbedBuilder()
            .setColor(`#FF0000`)
            .setTitle(`Voici la liste des plateformes de jeux disponibles sur le serveur.`)
            .setDescription(`Grâce à ces rôles tu va pouvoir montrer aux autres membres du serveur sur quelle(s) plateforme(s) tu joue aux jeux vidéos...fais tes choix et amuse-toi bien !\nSi vous pensez à d'autres plateformes de jeux n'hésitez pas à faire vos <#726428191568298006> pour que l'on puisse les rajouter.`)
            .addFields(
                {
                    name: `Pour t'ajouter ou t'enlever un rôle, il te suffit de réagir avec le bouton qui correspond...`,
                    value: `${playstationemoji} - Si tu joues sur ${playstation}
${pcemoji} - Si tu joues sur ${pc}
${switchemoji} - Si tu joues sur ${switchrole}
${xboxemoji} - Si tu joues sur ${xbox}
${smartphoneemoji} - Si tu joues sur ${smartphone}`
                }
            );
        const gamesplateformerolesrow = new Discord.ActionRowBuilder().addComponents(playstationbutton, pcbutton, switchbutton, xboxbutton, smartphonebutton);
        await bot.channels.cache.get(`726428191568298008`).send({
            embeds: [plateform_embed], components: [gamesplateformerolesrow], ephemeral: false
        });




        var nintendo_embed = new Discord.EmbedBuilder()
            .setColor(`#FF0000`)
            .setTitle(`Voici la liste des jeux nintendo disponibles.`)
            .setDescription(`Grâce à ces rôles tu va pouvoir accéder à différents salon spécifiques pour chaque jeu...fais tes choix et amuse-toi bien !\nSi tu veux rajouter des jeux de la gamme nintendo, fait ta demande dans le salon <#726428192146980921>`)
            .addFields(
                {
                    name: `Pour t'ajouter ou t'enlever un rôle, il te suffit de réagir avec le bouton qui correspond...`,
                    value: `${animalemoji} - Si tu es un joueur de ${animal}`
                }
            );
        const nintendorolesrow = new Discord.ActionRowBuilder().addComponents(animalcrossingbutton);
        await bot.channels.cache.get(`726428192146980922`).send({
            embeds: [nintendo_embed], components: [nintendorolesrow], ephemeral: false
        });

        interaction.reply({ content: `Les nouveaux embeds ont bien été envoyés, pense bien à supprimer les anciens dans ces salons :<#726428190427447365>, <#726428191568298008>, <#726428192146980922>`, ephemeral: true });

    },
    name: `roles`,
    description: `Envoyer tous les embeds d'explications des rôles`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
}
