const Discord = require(`discord.js`);
module.exports = {
  callback: async (bot, interaction) => {

    let embedBeforeEdit = new Discord.EmbedBuilder()
      .setDescription(`-----`)
    let msgEmbedForEditing = await interaction.channel.send({ embeds: [embedBeforeEdit] })
    const msgwait = await interaction.channel.send({ content: `Veuillez patienter pendant l'ajout de toutes les réactions...` });

    await Promise.all([`✏️`, `💬`, `🕵️`, `🔻`, `🔳`, `🕙`, `🖼️`, `🌐`, `🔵`, `↩️`, `↪️`, `📥`, `✅`, `📑`].map(r => msgwait.react(r)));
    await msgwait.edit(`:pencil2: Modifier le titre\n:speech_balloon: Modifier la description\n:detective: Modifier l'auteur\n:small_red_triangle_down: Modifier le footer\n:white_square_button: Modifier le thumbnail\n:clock10: Ajouter un timestamp\n:frame_photo: Modifier l'image\n:globe_with_meridians: Modifier l'url\n:blue_circle: Modifier la couleur\n:leftwards_arrow_with_hook: Ajouter un field\n:arrow_right_hook: Supprimer un field\n:inbox_tray: Copier un embed existant\n:white_check_mark: Envoyer l'embed\n:bookmark_tabs: Modifier un message du bot avec cet embed`)
    const collectionReaction = await new Discord.ReactionCollector(msgwait);
    collectionReaction.on(`collect`, async (reaction, user) => {
      reaction.users.remove(user);
      if (user.id === interaction.user.id) {
        switch (reaction._emoji.name) {
          case `✏️`:
            const msgQuestionTitle = await interaction.channel.send({ content: `Quel titre souhaitez-vous mettre ?` });
            const filterMessage = (message) => message.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter: filterMessage, time: 60000 });
            collector.on(`collect`, async (message) => {
              const title = message.content
              message.delete();
              msgQuestionTitle.delete();
              collector.stop();
              embedBeforeEdit.setTitle(title);
              msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
            });
            collector.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionTitle.delete();
              }
            });
            break;
          case `💬`:
            const msgQuestionDescription = await interaction.channel.send({ content: `Quelle description souhaitez-vous mettre ?` });
            const filterMessage2 = (message) => message.author.id === interaction.user.id;
            const collector2 = interaction.channel.createMessageCollector({ filter: filterMessage2, time: 60000 });
            collector2.on(`collect`, async (message) => {
              const description = message.content
              message.delete();
              msgQuestionDescription.delete();
              collector2.stop();
              embedBeforeEdit.setDescription(description);
              msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
            })
            collector2.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionDescription.delete();
              }
            });
            break;
          case `🕵️`:
            let author;
            let iconauthor;
            const msgQuestionAuthor = await interaction.channel.send({ content: `Quel nom d'auteur souhaitez-vous mettre ?` });
            const filterMessage3 = (message) => message.author.id === interaction.user.id;
            const collector3 = interaction.channel.createMessageCollector({ filter: filterMessage3, time: 60000 });
            collector3.on(`collect`, async (message) => {
              author = await message.content
              message.delete();
              msgQuestionAuthor.delete();
              await collector3.stop()
              const msgQuestionIconAuthor = await interaction.channel.send({ content: `Quelle Icône souhaitez-vous mettre pour l'auteur ?\nÉcrivez "rien" si vous ne souhaitez pas en mettre.` });
              const filterMessage3bis = (message) => message.author.id === interaction.user.id;
              const collector3bis = interaction.channel.createMessageCollector({ filter: filterMessage3bis, time: 60000 });
              collector3bis.on(`collect`, async (message) => {
                if (message.attachments.size > 0) {
                  iconauthor = await message.attachments.first().url
                } else {
                  iconauthor = await message.content
                }
                message.delete();
                msgQuestionIconAuthor.delete();
                await collector3bis.stop()
                if (iconauthor.toLowerCase().includes("rien")) {
                  embedBeforeEdit.setAuthor({
                    name: author
                  })
                  msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
                } else {
                  if (!iconauthor.includes(`http`)) return interaction.channel.send({ content: `Icône d'auteur Incorrecte !\nVeuillez appuyer de nouveau sur la réaction et mettre une image issue d'un lien http ou https...` }).then((error) => error.delete({ timeout: 5000 }))
                  embedBeforeEdit.setAuthor({
                    name: author,
                    iconURL: iconauthor,
                  })
                  msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
                }
              })
              collector3bis.on(`end`, (collected, reason) => {
                if (reason === `time`) {
                  msgQuestionIconAuthor.delete();
                  embedBeforeEdit.setAuthor({ name: author })
                }
              });
            })
            collector3.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionAuthor.delete();
              }
            });
            break;
          case `🔻`:
            let footer;
            let iconfooter;
            const msgQuestionFooter = await interaction.channel.send({ content: `Que souhaitez-vous mettre dans le footer ?` });
            const filterMessage4 = (message) => message.author.id === interaction.user.id;
            const collector4 = interaction.channel.createMessageCollector({ filter: filterMessage4, time: 60000 });
            collector4.on(`collect`, async (message) => {
              footer = message.content
              message.delete();
              msgQuestionFooter.delete();
              await collector4.stop()
              const msgQuestionIconFooter = await interaction.channel.send({ content: `Quelle Icône souhaitez-vous mettre pour le footer ?\nÉcrivez "rien" si vous ne souhaitez pas en mettre.` });
              const filterMessage4bis = (message) => message.author.id === interaction.user.id;
              const collector4bis = interaction.channel.createMessageCollector({ filter: filterMessage4bis, time: 60000 });
              collector4bis.on(`collect`, async (message) => {
                if (message.attachments.size > 0) {
                  iconfooter = await message.attachments.first().url
                } else {
                  iconfooter = await message.content
                }
                message.delete();
                msgQuestionIconFooter.delete()
                await collector4bis.stop()
                if (iconfooter.toLowerCase().includes("rien")) {
                  embedBeforeEdit.setFooter({ text: footer })
                  msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
                } else {
                  if (!iconfooter.includes(`http`)) return interaction.channel.send({ content: `Icône de footer Incorrecte !\nVeuillez appuyer de nouveau sur la réaction et mettre une image issue d'un lien http ou https...` }).then((error) => error.delete({ timeout: 5000 }))
                  embedBeforeEdit.setFooter({ text: footer, iconURL: iconfooter })
                  msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
                }
              })
              collector4bis.on(`end`, (collected, reason) => {
                if (reason === `time`) {
                  msgQuestionIconFooter.delete();
                  embedBeforeEdit.setFooter({ text: footer })
                }
              });
            })
            collector4.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionFooter.delete();
              }
            });
            break;
          case `🔳`:
            let thumbnail;
            const msgQuestionThumbnail = await interaction.channel.send({ content: `Quelle image souhaitez-vous mettre en thumbnail ?\nÉcrivez "rien" si vous souhaitez supprimer le thumbnail actuel ou ne pas en mettre.` });
            const filterMessage5 = (message) => message.author.id === interaction.user.id;
            const collector5 = interaction.channel.createMessageCollector({ filter: filterMessage5, time: 60000 });
            collector5.on(`collect`, async (message) => {
              if (message.attachments.size > 0) {
                thumbnail = await message.attachments.first().url
              } else {
                thumbnail = await message.content
              }
              message.delete()
              msgQuestionThumbnail.delete();
              await collector5.stop();
              if (thumbnail.toLowerCase().includes("rien")) {
                embedBeforeEdit.setThumbnail(null);
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              } else {
                if (!thumbnail.includes(`http`)) return interaction.channel.send({ content: `Thumbnail Incorrect !\nVeuillez appuyer de nouveau sur la réaction et mettre une image issue d'un lien http ou https...` }).then((error) => error.delete({ timeout: 5000 }))
                embedBeforeEdit.setThumbnail(thumbnail);
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              }
            })
            collector5.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionThumbnail.delete();
              }
            });
            break;
          case `🕙`:
            if (embedBeforeEdit.data.timestamp) {
              embedBeforeEdit.setTimestamp(null);
              msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
            } else {
              embedBeforeEdit.setTimestamp();
              msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
            }
            break;
          case `🖼️`:
            let image;
            const msgQuestionImage = await interaction.channel.send({ content: `Quelle Image souhaitez-vous mettre ?\nÉcrivez "rien" si vous souhaitez supprimer l'image actuelle ou ne pas en mettre.` });
            const filterMessage6 = (message) => message.author.id === interaction.user.id;
            const collector6 = interaction.channel.createMessageCollector({ filter: filterMessage6, time: 60000 });
            collector6.on(`collect`, async (message) => {
              if (message.attachments.size > 0) {
                image = await message.attachments.first().url
              } else {
                image = await message.content
              }
              message.delete();
              msgQuestionImage.delete();
              await collector6.stop()
              if (image.toLowerCase().includes("rien")) {
                embedBeforeEdit.setImage(null);
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              } else {
                if (!image.includes(`http`)) return interaction.channel.send({ content: `Image Incorrecte !\nVeuillez appuyer de nouveau sur la réaction et mettre une image issue d'un lien http ou https...` }).then((error) => error.delete({ timeout: 5000 }))
                embedBeforeEdit.setImage(image);
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              }
            })
            collector6.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionImage.delete();
              }
            });
            break;
          case `🌐`:
            const msgQuestionURL = await interaction.channel.send({ content: `Quelle URL souhaitez-vous mettre ?\nÉcrivez "rien" si vous ne souhaitez supprimer l'url actuelle ou ne pas en mettre.` });
            const filterMessage7 = (message) => message.author.id === interaction.user.id;
            const collector7 = interaction.channel.createMessageCollector({ filter: filterMessage7, time: 60000 });
            collector7.on(`collect`, async (message) => {
              const url = message.content
              message.delete();
              msgQuestionURL.delete();
              await collector7.stop()
              if (url.toLowerCase().includes("rien")) {
                embedBeforeEdit.setURL(null);
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              } else {
                if (!url.includes(`http`)) return interaction.channel.send({ content: `URL Incorrecte !\nVeuillez appuyer de nouveau sur la réaction et mettre une vraie url commençant par http ou https...` }).then((error) => error.delete({ timeout: 5000 }))
                embedBeforeEdit.setURL(url);
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              }
            })
            collector7.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionURL.delete();
              }
            });
            break;
          case `🔵`:
            const msgQuestionColor = await interaction.channel.send({ content: `De quelle couleur souhaitez-vous que votre embed soit ?\n__deux possibilités :__\n-#000000\nou\n-Red / Yellow / etc...` });
            const filterMessage8 = (message) => message.author.id === interaction.user.id;
            const collector8 = interaction.channel.createMessageCollector({ filter: filterMessage8, time: 60000 });
            collector8.on(`collect`, async (message) => {
              const color = message.content
              message.delete();
              msgQuestionColor.delete();
              await collector8.stop();
              embedBeforeEdit.setColor(color);
              msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
            })
            collector8.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionColor.delete();
              }
            });
            break;
          case `↩️`:
            let name;
            let value;
            const msgQuestionTitleField = await interaction.channel.send({ content: `Quel titre souhaitez-vous mettre pour votre field ?` });
            const filterMessage9 = (message) => message.author.id === interaction.user.id;
            const collector9 = interaction.channel.createMessageCollector({ filter: filterMessage9, time: 60000 });
            collector9.on(`collect`, async (message) => {
              name = message.content
              message.delete();
              msgQuestionTitleField.delete();
              await collector9.stop()
              const msgQuestionDescriptionField = await interaction.channel.send({ content: `Quelle description souhaitez-vous mettre pour votre field ?` });
              const filterMessage9bis = (message) => message.author.id === interaction.user.id;
              const collector9bis = interaction.channel.createMessageCollector({ filter: filterMessage9bis, time: 60000 });
              collector9bis.on(`collect`, async (message) => {
                value = message.content
                message.delete();
                msgQuestionDescriptionField.delete();
                await collector9bis.stop()
                embedBeforeEdit.addFields({ name: name, value: value });
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
              })
              collector9bis.on(`end`, (collected, reason) => {
                if (reason === `time`) {
                  msgQuestionDescriptionField.delete();
                }
              });
            })
            collector9.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionTitleField.delete();
              }
            });
            break;
          case `↪️`:
            const msgQuestionField = await interaction.channel.send({ content: `Quel field souhaitez-vous supprimer ?\nMerci d'écrire son numéro (1 étant le plus haut)` });
            const filterMessage10 = (message) => message.author.id === interaction.user.id;
            const collector10 = interaction.channel.createMessageCollector({ filter: filterMessage10, time: 60000 });
            collector10.on(`collect`, async (message) => {
              const Field = message.content
              message.delete();
              msgQuestionField.delete();
              collector10.stop();
              embedBeforeEdit.spliceFields(Field - 1, 1)
              msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] });
            })
            collector10.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionField.delete();
              }
            });
            break;
          case `📥`:
            let channelid;
            let messageid;
            const msgQuestionChannelName = await interaction.channel.send({ content: `Merci de renseigner l'id du salon dans lequel souhaitez copier l'embed.` })
            const filterMessage11 = (message) => message.author.id === interaction.user.id;
            const collector11 = interaction.channel.createMessageCollector({ filter: filterMessage11, time: 60000 });
            collector11.on(`collect`, async (message) => {
              channelid = message.content
              const channel = interaction.guild.channels.cache.get(channelid);
              if (!channel) return interaction.channel.send({ content: `l'id du salon que vous avez saisi n'est pas correct, veuillez réessayer.` }).then((error) => error.delete({ timeout: 5000 }));
              message.delete();
              msgQuestionChannelName.delete();
              await collector11.stop()
              const msgQuestionMessageID = await interaction.channel.send({ content: `Merci de renseigner l'id de l'embed que vous souhaitez copier.` })
              const filterMessage11bis = (message) => message.author.id === interaction.user.id;
              const collector11bis = interaction.channel.createMessageCollector({ filter: filterMessage11bis, time: 60000 });
              collector11bis.on(`collect`, async (message) => {
                messageid = message.content
                message.delete()
                msgQuestionMessageID.delete()
                await collector11bis.stop()
                if (!Number(messageid) || !channel.messages.fetch(messageid)) return interaction.channel.send({ content: `l'embed que vous souhaitez copier n'as pas été trouvé, veuillez réessayer.` }).then((error) => error.delete({ timeout: 5000 }));
                const embedcopied = await channel.messages.fetch(messageid);
                if (embedcopied.embeds.length === 0) return interaction.channel.send({ content: `Ce message n'est pas un embed, veuillez rentrer les informations d'un embed pour pouvoir le copier.` }).then((err) => err.delete({ timeout: 5000 }))
                let embedBeforeEdit2 = new Discord.EmbedBuilder()
                embedBeforeEdit = embedBeforeEdit2
                if (embedcopied.embeds[0].title !== null) embedBeforeEdit.setTitle(embedcopied.embeds[0].title)
                if (embedcopied.embeds[0].description !== null) embedBeforeEdit.setDescription(embedcopied.embeds[0].description)
                if (embedcopied.embeds[0].author !== null) embedBeforeEdit.setAuthor({ name: embedcopied.embeds[0].author.name, iconURL: embedcopied.embeds[0].author.iconURL })
                if (embedcopied.embeds[0].footer !== null) embedBeforeEdit.setFooter({ text: embedcopied.embeds[0].footer.text, iconURL: embedcopied.embeds[0].footer.iconURL })
                if (embedcopied.embeds[0].thumbnail !== null) embedBeforeEdit.setThumbnail(embedcopied.embeds[0].thumbnail.url)
                if (embedcopied.embeds[0].timestamp !== null) embedBeforeEdit.setTimestamp()
                if (embedcopied.embeds[0].image !== null) embedBeforeEdit.setImage(embedcopied.embeds[0].image.url)
                if (embedcopied.embeds[0].url !== null) embedBeforeEdit.setURL(embedcopied.embeds[0].url)
                if (embedcopied.embeds[0].color !== null) embedBeforeEdit.setColor(embedcopied.embeds[0].color)
                if (embedcopied.embeds[0].fields !== null) embedBeforeEdit.addFields(embedcopied.embeds[0].fields)
                msgEmbedForEditing.edit({ embeds: [embedBeforeEdit] })
              })
              collector11bis.on(`end`, (collected, reason) => {
                if (reason === `time`) {
                  msgQuestionMessageID.delete()
                }
              });
            })
            collector11.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionChannelName.delete();
              }
            });
            break;
          case `✅`:
            const msgQuestionChannel = await interaction.channel.send({ content: `Où souhaitez-vous envoyer l'embed ?\nVeuillez indiquer l'id du salon.` });
            const filterMessage12 = (message) => message.author.id === interaction.user.id;
            const collector12 = interaction.channel.createMessageCollector({ filter: filterMessage12, time: 60000 });
            collector12.on(`collect`, async (message) => {
              const messagechannel = message.content
              message.delete()
              collector12.stop();
              const channel2 = interaction.guild.channels.cache.get(messagechannel);
              channel2.send({ embeds: [embedBeforeEdit] })
            })
            collector12.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionChannel.delete();
              }
            });
            break;
          case `📑`:
            let channelid2;
            let messageid2;
            const msgQuestionNameChannel = await interaction.channel.send({ content: `Merci de renseigner l'id du salon dans lequel se trouve le message du bot que vous souhaitez remplacer par l'embed.` })
            const filterMessage13 = (message) => message.author.id === interaction.user.id;
            const collector13 = interaction.channel.createMessageCollector({ filter: filterMessage13, time: 60000 });
            collector13.on(`collect`, async (message) => {
              channelid2 = message.content
              const channel3 = interaction.guild.channels.cache.get(channelid2);
              if (!channel3) return interaction.channel.send({ content: `l'id du salon que vous avez saisi n'est pas correct, veuillez réessayer.` }).then((error) => error.delete({ timeout: 5000 }));
              message.delete();
              msgQuestionNameChannel.delete()
              await collector13.stop();
              const msgQuestionIDMessage = await interaction.channel.send({ content: `Merci de renseigner l'id du message du bot que vous souhaitez modifier.` })
              const filterMessage13bis = (message) => message.author.id === interaction.user.id;
              const collector13bis = interaction.channel.createMessageCollector({ filter: filterMessage13bis, time: 60000 });
              collector13bis.on(`collect`, async (message) => {
                messageid2 = message.content
                message.delete()
                msgQuestionIDMessage.delete()
                await collector13bis.stop()
                if (!Number(messageid2) || !channel3.messages.fetch(messageid2)) return interaction.channel.send({ content: `Le message que vous souhaitez modifier n'as pas été trouvé, veuillez réessayer.` }).then((error) => error.delete({ timeout: 5000 }));
                let modifiedmessage = await channel3.messages.fetch(messageid2);
                let totalEmbeds = modifiedmessage.embeds;
                const confirmmessage = await interaction.channel.send({ content: `:warning: Vous êtes sur le point de modifier un message du bot !\n:one: Juste ajouter l'embed sous le message\n:two: Complètement supprimer le message actuel et le remplacer par l'embed.` })
                await Promise.all([`1️⃣`, `2️⃣`].map(r => confirmmessage.react(r)));
                const collectionReaction2 = await new Discord.ReactionCollector(confirmmessage);
                collectionReaction2.on(`collect`, async (reaction, user) => {
                  if (user.bot) return;
                  reaction.users.remove(user);
                  if (user.id === interaction.user.id) {
                    switch (reaction._emoji.name) {
                      case `1️⃣`:
                        if (modifiedmessage.embeds.length > 0) {
                          totalEmbeds.push(embedBeforeEdit)
                          modifiedmessage.edit({ embeds: totalEmbeds });
                        } else {
                          modifiedmessage.edit({ embeds: [embedBeforeEdit] });
                        }
                        confirmmessage.delete();
                        await collectionReaction2.stop()
                        break;
                      case `2️⃣`:
                        modifiedmessage.edit({ content: ``, embeds: [embedBeforeEdit] })
                        confirmmessage.delete()
                        await collectionReaction2.stop()
                        break;
                    }
                  };
                })
                collectionReaction2.on(`end`, (collected, reason) => {
                  if (reason === `time`) {
                    confirmmessage.delete();
                  }
                })
              })
              collector13bis.on(`end`, (collected, reason) => {
                if (reason === `time`) {
                  msgQuestionIDMessage.delete()
                }
              })
            })
            collector13.on(`end`, (collected, reason) => {
              if (reason === `time`) {
                msgQuestionNameChannel.delete()
              }
            });
            break;
        }
      }
    })
  },
  name: `embedbuilder`,
  description: `Construire un Embed en direct`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [],
  permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
  botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
