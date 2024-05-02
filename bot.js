const { Discord, config } = require(`./utils/config`);
const eventsHandler = require(`./handlers/eventsHandler`);
const bot = new Discord.Client({ intents: config.intents, partials: [Discord.Partials.User, Discord.Partials.Channel, Discord.Partials.GuildMember, Discord.Partials.Message, Discord.Partials.Reaction, Discord.Partials.GuildScheduledEvent, Discord.Partials.ThreadMember] });
const moment = require(`moment`)
bot.login(config.token);
eventsHandler(bot);
const tmi = require(`tmi.js`);
const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster: `aws`,
    reconnect: true,
  },
  identity: {
    username: `MaxtAdmin`,
    password: config.twitch_oauth,
  },
  channels: [`maxtar`],
};
const twitchbot = new tmi.client(options);
/**
 * 
 * @param {tmi.Client} twitchbot
 */
const blocked_words = [`⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⢉⢉⠉⠉⠻⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⠟⠠⡰⣕⣗⣷⣧⣀⣅⠘⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⠃⣠⣳⣟⣿⣿⣷⣿⡿⣜⠄⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⡿⠁⠄⣳⢷⣿⣿⣿⣿⡿⣝⠖⠄⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⠃⠄⢢⡹⣿⢷⣯⢿⢷⡫⣗⠍⢰⣿⣿⣿⣿⣿ ⣿⣿⣿⡏⢀⢄⠤⣁⠋⠿⣗⣟⡯⡏⢎⠁⢸⣿⣿⣿⣿⣿ ⣿⣿⣿⠄⢔⢕⣯⣿⣿⡲⡤⡄⡤⠄⡀⢠⣿⣿⣿⣿⣿⣿ ⣿⣿⠇⠠⡳⣯⣿⣿⣾⢵⣫⢎⢎⠆⢀⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⠄⢨⣫⣿⣿⡿⣿⣻⢎⡗⡕⡅⢸⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⠄⢜⢾⣾⣿⣿⣟⣗⢯⡪⡳⡀⢸⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⠄⢸⢽⣿⣷⣿⣻⡮⡧⡳⡱⡁⢸⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⡄⢨⣻⣽⣿⣟⣿⣞⣗⡽⡸⡐⢸⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⡇⢀⢗⣿⣿⣿⣿⡿⣞⡵⡣⣊⢸⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⡀⡣⣗⣿⣿⣿⣿⣯⡯⡺⣼⠎⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣧⠐⡵⣻⣟⣯⣿⣷⣟⣝⢞⡿⢹⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⡆⢘⡺⣽⢿⣻⣿⣗⡷⣹⢩⢃⢿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣷⠄⠪⣯⣟⣿⢯⣿⣻⣜⢎⢆⠜⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⡆⠄⢣⣻⣽⣿⣿⣟⣾⡮⡺⡸⠸⣿⣿⣿⣿ ⣿⣿⡿⠛⠉⠁⠄⢕⡳⣽⡾⣿⢽⣯⡿⣮⢚⣅⠹⣿⣿⣿ ⡿⠋⠄⠄⠄⠄⢀⠒⠝⣞⢿⡿⣿⣽⢿⡽⣧⣳⡅⠌⠻⣿ ⠁⠄⠄⠄⠄⠄⠐⡐⠱⡱⣻⡻⣝⣮⣟⣿⣻⣟⣻⡺⣊`,
  `⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆ ⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿ ⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀ ⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ ⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛`,
  `trexler`,
  `trexlers`];
twitchbot.on(`chat`, onChatHandler);
twitchbot.on(`connected`, onConnectedHandler);
twitchbot.on('message', (channel, userstate, message, self) => {
  const userId = userstate[`user-id`]
  if (self || userId === `135204446`) return;
  checkChat(channel, userstate, message);
});
twitchbot.connect();
async function checkChat(channel, username, message) {
  let shouldSendMessage = false;
  //check message
  message = message.toLowerCase();
  shouldSendMessage = blocked_words.some(blockedWord => message.includes(blockedWord.toLowerCase()));
  //delete message
  if (shouldSendMessage) {
    twitchbot.deletemessage(channel, username.id)
      .then((data) => {
        //nothing
      }).catch((err) => {
        //nothing
      });
  }
}
async function onChatHandler(target, context, msg, self) { //context = infos user --- target = channel
  const userId = context[`user-id`]
  let badgesEmojis = [];
  if (self || userId === `135204446`) return;
  if (msg.startsWith(`!discord`)) {
    return twitchbot.say(target, `Si tu veux rejoindre le discord officiel de la chaine pour discuter même si le stream est off: https://discord.gg/8epEQyE`);
  }
  if (msg.startsWith(`!zielta`)) {
    return twitchbot.say(target, `Pour me rejoindre sur le serveur, voici le discord: https://discord.gg/ZnHrHzYzUP`)
  }
  if (msg.startsWith(`!serveur`)) {
    return twitchbot.say(target, `Omelette Sombre est un serveur public pour jouer avec le modpack "Prominence II" ( https://modrinth.com/modpack/prominence-2-fabric )
Pour me rejoindre sur le serveur, voici le discord: https://discord.gg/AHAd9sQYqd`)
  }
  if (msg.startsWith(`!evolucraft`)) {
    return twitchbot.say(target, ` Venez jouer avec moi sur EVOLUCRAFT 2 en 1.20.4 via l'ip maxtar.evolucraft.fr - c'est ouvert à tout le monde - Voici le lien du discord : https://discord.gg/56rrvGCpRN`)
  }
  //retranscription chat twitch sur discord
  const twitchChatChannelID = config.twitch_chat_channel_id
  const twitchChatChannel = await bot.channels.cache.get(twitchChatChannelID);
  const displayName = context[`display-name`]
  const userColor = context.color
  const userBadges = context.badges;
  if (!userBadges) {
    const TwitchNoBadgesMessagesEmbed = new Discord.EmbedBuilder()
      .setTitle(`${displayName}`)
      .setColor(userColor)
      .setDescription(msg)
    twitchChatChannel.send({ embeds: [TwitchNoBadgesMessagesEmbed] })
  }
  for (const [badgeCategory, badgeId] of Object.entries(userBadges)) {
    const badgeCounts = {};
    badgeCounts[badgeCategory] = badgeId;
    await axios.get(`https://api.twitch.tv/helix/chat/badges?broadcaster_id=199520992`, {
      headers: {
        "Client-ID": twitchClientID,
        "Authorization": `Bearer ${twitchToken}`
      }
    }).then(async (badges) => {
      const foundCategory = badges.data.data.find(category => category.set_id === badgeCategory)
      if (!foundCategory) return;
      const foundBadgeId = foundCategory.versions.find(id => id.id === badgeId)
      if (!foundBadgeId) return;
      const badgeImage = foundBadgeId.image_url_4x
      const emoji = await bot.guilds.cache.get(config.guild_id).emojis.cache.find(emoji => emoji.name === foundBadgeId.title.replace(/\s/g, `_`).replace(/-/g, `_`).toLowerCase());
      if (emoji) {
        badgesEmojis.push(emoji)
      } else {
        const badgeEmoji = await bot.guilds.cache.get(config.guild_id).emojis.create({
          name: foundBadgeId.title.replace(/\s/g, `_`).replace(/-/g, `_`).toLowerCase(),
          attachment: badgeImage,
        });
        badgesEmojis.push(badgeEmoji)
      }
    })

  }
  for (const [badgeCategory, badgeId] of Object.entries(userBadges)) {
    const badgeCounts = {};
    badgeCounts[badgeCategory] = badgeId;
    await axios.get(`https://api.twitch.tv/helix/chat/badges/global`, {
      headers: {
        "Client-ID": twitchClientID,
        "Authorization": `Bearer ${twitchToken}`
      }
    }).then(async (badges) => {
      const foundCategory = badges.data.data.find(category => category.set_id === badgeCategory)
      if (!foundCategory) return;
      const foundBadgeId = foundCategory.versions.find(id => id.id === badgeId)
      if (!foundBadgeId) return;
      const badgeImage = foundBadgeId.image_url_4x
      const emoji = await bot.guilds.cache.get(config.guild_id).emojis.cache.find(emoji => emoji.name === foundBadgeId.title.replace(/\s/g, `_`).replace(/-/g, `_`).toLowerCase());
      if (emoji) {
        badgesEmojis.push(emoji)
      } else {
        const badgeEmoji = await bot.guilds.cache.get(config.guild_id).emojis.create({
          name: foundBadgeId.title.replace(/\s/g, `_`).replace(/-/g, `_`).toLowerCase(),
          attachment: badgeImage,
        });
        badgesEmojis.push(badgeEmoji)
      }
    })
  }
  const TwitchMessagesEmbed = new Discord.EmbedBuilder()
    .setTitle(`${badgesEmojis.join(` `)} ${displayName}`)
    .setColor(userColor)
    .setDescription(msg)
  twitchChatChannel.send({ embeds: [TwitchMessagesEmbed] })
  badgesEmojis = [];
}
function onConnectedHandler(addr, port) {
  console.log(`Connecté à ${addr}:${port}`);
  //twitchbot.action(`maxtar`, `est connecté !`);
}




//notifs twitch
const express = require(`express`);
const axios = require(`axios`);
const app = express();
const port = config.port || 3000;
const dbstream = require(`./models/Stream`);

const twitchClientID = config.twitch_client_id
const twitchSecret = config.twitch_client_secret
const twitchStreamer = config.twitch_streamer_name
const twitchChannelID = config.twitch_channel_id
let streamStatus;
let twitchToken;
let streamTitle;
let imageUrl;
let startedAt;
let userName;
let viewersCount;
let gameName;
let gameLogo;
axios.post(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchSecret}&grant_type=client_credentials`)
  .then(res => {
    twitchToken = res.data.access_token;

  });
async function sendLiveNotification(streamTitle, imageUrl, startedAt, userName, viewersCount, gameName, gameLogo) {
  let channel = bot.channels.cache.get(twitchChannelID);
  let maxtaravatar = bot.guilds.cache.get(config.guild_id).members.cache.get(config.owner_id).displayAvatarURL();
  let rolenotif = bot.guilds.cache.get(config.guild_id).roles.cache.get(`756243894894854294`);
  const actualStartHour = moment(startedAt);
  const newStartHour = actualStartHour.add(3, `minutes`);
  const actualEndHour = moment(Date.now());
  const newEndHour = actualEndHour.add(5, `minutes`);
  const event_manager = new Discord.GuildScheduledEventManager(bot.guilds.cache.get(config.guild_id));
  const StreamEvent = await event_manager.create({
    entityType: Discord.GuildScheduledEventEntityType.External,
    entityMetadata: {
      location: `https://twitch.tv/maxtar`
    },
    privacyLevel: Discord.GuildScheduledEventPrivacyLevel.GuildOnly,
    name: `Maxtar est en live sur ${gameName}`,
    description: streamTitle,
    image: imageUrl,
    reason: `Maxtar est en stream, il faut l'annoncer à pleins de monde !`,
    scheduledStartTime: newStartHour,
    scheduledEndTime: newEndHour
  });
  const twitch_embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: `${userName} est en live sur Twitch avec ${viewersCount} viewers`,
      iconURL: maxtaravatar,
    })
    .setColor(`Purple`)
    //.setTitle(`${streamTitle}`)
    .setDescription(`**${streamTitle}**`)
    .setThumbnail(gameLogo)
    .setImage(imageUrl)
    .addFields(
      {
        name: `Stream`, value: `${gameName}`, inline: true
      },
      {
        name: `\u200b`, value: `\u200b`, inline: true
      },
      {
        name: `Le Lien de la chaine`, value: `[${userName}](https://twitch.tv/${twitchStreamer})`, inline: true
      },
    )
    .setFooter({ text: `Début du stream` })
    .setTimestamp(startedAt)
  if (channel) {
    const notif = await channel.send({ content: `${rolenotif}`, embeds: [twitch_embed] });
    streamStatus = new dbstream({
      statusStream: `stream en cours...`,
      content: [
        {
          notifId: notif.id,
          eventId: StreamEvent.id
        }
      ]
    })
    streamStatus.save()
  }
}
async function editLiveNotification(streamTitle, imageUrl, startedAt, userName, viewersCount, gameName, gameLogo) {
  let channel = bot.channels.cache.get(twitchChannelID);
  let maxtaravatar = bot.guilds.cache.get(config.guild_id).members.cache.get(config.owner_id).displayAvatarURL();
  const actualEndHour = moment(Date.now());
  const newEndHour = actualEndHour.add(5, `minutes`);
  const twitch_embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: `${userName} est en live sur Twitch avec ${viewersCount} viewers`,
      iconURL: maxtaravatar,
    })
    .setColor(`Purple`)
    //.setTitle(`${streamTitle}`)
    .setDescription(`**${streamTitle}**`)
    .setThumbnail(gameLogo)
    .setImage(imageUrl)
    .addFields(
      {
        name: `Stream`, value: `${gameName}`, inline: true
      },
      {
        name: `\u200b`, value: `\u200b`, inline: true
      },
      {
        name: `Le Lien de la chaine`, value: `[${userName}](https://twitch.tv/${twitchStreamer})`, inline: true
      },
    )
    .setFooter({ text: `Début du stream` })
    .setTimestamp(startedAt)
  const notifId = await streamStatus.content[0].notifId
  const notifEdit = await channel.messages.fetch(notifId)
  const eventId = await streamStatus.content[0].eventId
  const eventEdit = await bot.guilds.cache.get(config.guild_id).scheduledEvents.fetch(eventId)
  notifEdit.edit({ embeds: [twitch_embed] });
  eventEdit.edit({
    name: `Maxtar est en live sur ${gameName}`,
    description: streamTitle,
    image: imageUrl,
    //reason: `Maxtar est en stream, il faut l'annoncer à pleins de monde !`,
    //scheduledStartTime: newStartHour,
    scheduledEndTime: newEndHour
  });
}
async function endLiveEmbed(streamTitle, startedAt, userName, gameName, gameLogo, endTime) {
  let channel = bot.channels.cache.get(twitchChannelID);
  let maxtaravatar = bot.guilds.cache.get(config.guild_id).members.cache.get(config.owner_id).displayAvatarURL();
  const changeDate = require(`moment`)(startedAt)
  const newStartedAt = changeDate.format(`MM/DD/YYYY h:mm A`)
  const twitch_embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: `${userName} était en live sur Twitch`,
      iconURL: maxtaravatar,
    })
    .setColor(`Purple`)
    //.setTitle(`${streamTitle}`)
    .setDescription(`**${streamTitle}**`)
    .setThumbnail(gameLogo)
    .addFields(
      {
        name: `Stream`, value: `${gameName}`, inline: true
      },
      {
        name: `\u200b`, value: `\u200b`, inline: true
      },
      {
        name: `Le Lien de la chaine`, value: `[${userName}](https://twitch.tv/${twitchStreamer})`, inline: true
      },
    )
    .setFooter({ text: `Début du stream • ${newStartedAt}\nFin du stream` })
    .setTimestamp(endTime)
  const notifId = await streamStatus.content[0].notifId
  const notifEdit = await channel.messages.fetch(notifId)
  const eventId = await streamStatus.content[0].eventId
  const eventDelete = await bot.guilds.cache.get(config.guild_id).scheduledEvents.fetch(eventId)
  eventDelete.delete()
  notifEdit.edit({ embeds: [twitch_embed] });
}
setInterval(async () => {
  streamStatus = await dbstream.findOne({ statusStream: `stream en cours...` });
  axios.get(`https://api.twitch.tv/helix/streams?user_login=${twitchStreamer}`, {
    headers: {
      "Client-ID": twitchClientID,
      "Authorization": `Bearer ${twitchToken}`
    }
  }).then(async (res) => {
    if (res.data.data.length > 0) {
      if (!streamStatus) {
        console.log(`Nouveau stream`)
        streamTitle = res.data.data[0].title;
        imageUrl = res.data.data[0].thumbnail_url
        imageUrl = imageUrl.replace(`{width}`, `1280`);
        imageUrl = imageUrl.replace(`{height}`, `720`);
        let thumbnailBuster = (Date.now() / 1000).toFixed(0);
        imageUrl += `?t=${thumbnailBuster}`;
        startedAt = res.data.data[0].started_at
        startedAt = new Date(startedAt)
        userName = res.data.data[0].user_name
        viewersCount = res.data.data[0].viewer_count
        gameName = res.data.data[0].game_name
        let gameId = res.data.data[0].game_id
        await axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
          headers: {
            "Client-ID": twitchClientID,
            "Authorization": `Bearer ${twitchToken}`
          }
        }).then(async (game) => {
          gameLogo = game.data.data[0].box_art_url
          gameLogo = gameLogo.replace(`{width}`, `288`);
          gameLogo = gameLogo.replace(`{height}`, `384`);
        })
        sendLiveNotification(streamTitle, imageUrl, startedAt, userName, viewersCount, gameName, gameLogo);
      } else {
        streamTitle = res.data.data[0].title;
        imageUrl = res.data.data[0].thumbnail_url
        imageUrl = imageUrl.replace(`{width}`, `1280`);
        imageUrl = imageUrl.replace(`{height}`, `720`);
        let thumbnailBuster = (Date.now() / 1000).toFixed(0);
        imageUrl += `?t=${thumbnailBuster}`;
        startedAt = res.data.data[0].started_at
        startedAt = new Date(startedAt)
        userName = res.data.data[0].user_name
        viewersCount = res.data.data[0].viewer_count
        gameName = res.data.data[0].game_name
        let gameId = res.data.data[0].game_id
        await axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
          headers: {
            "Client-ID": twitchClientID,
            "Authorization": `Bearer ${twitchToken}`
          }
        }).then(async (game) => {
          gameLogo = game.data.data[0].box_art_url
          gameLogo = gameLogo.replace(`{width}`, `288`);
          gameLogo = gameLogo.replace(`{height}`, `384`);
        })
        editLiveNotification(streamTitle, imageUrl, startedAt, userName, viewersCount, gameName, gameLogo);
      }
    } else {
      if (streamStatus) {
        let endTime = new Date()
        await endLiveEmbed(streamTitle, startedAt, userName, gameName, gameLogo, endTime);
        await dbstream.findOneAndDelete({ statusStream: `stream en cours...` })
        console.log(`Stream terminé !`)
      }
    }
  })

}, 60000);
app.get(`/twitch`, (req, res) => {
  if (twitchToken) {
    res.status(200).json({ connected: true });
  } else {
    res.status(500).json({ connected: false });
  }
});

app.get(`/discord`, (req, res) => {
  if (bot.readyAt) {
    res.status(200).json({ connected: true });
  } else {
    res.status(500).json({ connected: false });
  }
});

app.get(`/status`, (req, res) => {
  res.status(200).json({ isLive });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




//LE CODE CI-DESSSOUS EST A ACTIVER SI JE VEUX SUPPRIMER TOUTES LES SLASH COMMANDES DU BOT
//const rest = new Discord.REST().setToken(config.token);
//rest.put(Discord.Routes.applicationGuildCommands(config.bot_id, config.guild_id), { body: [] })
//    .then(() => console.log(`Successfully deleted all guild commands.`))
//    .catch(console.error);

//rest.put(Discord.Routes.applicationCommands(config.bot_id), { body: [] })
//    .then(() => console.log(`Successfully deleted all application commands.`))
//    .catch(console.error);