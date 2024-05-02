const Discord = require(`discord.js`);
const AutoRole = require(`../../models/AutoRole`);
module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Interaction} interaction
     */
    callback: async (bot, interaction) => {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case `enable`:
                if (!interaction.inGuild()) {
                    interaction.reply({
                        content: `Vous devez être dans un serveur pour exécuter cette commande.`,
                        ephemeral: true,
                    });
                    return;
                }

                const targetRoleEnable = interaction.options.getRole(`role`);
                if (!targetRoleEnable) {
                    interaction.reply({
                        content: `Veuillez sélectionner un rôle valide.`,
                        ephemeral: true,
                    });
                    return;
                }
                await interaction.deferReply({ ephemeral: true });

                let autoRoleEnable = await AutoRole.findOne({ guildId: interaction.guild.id });

                if (autoRoleEnable) {
                    const existingRoleEnable = Array.from(autoRoleEnable.roles.values()).find(role => role.roleId === targetRoleEnable.id);

                    if (existingRoleEnable) {
                        if (existingRoleEnable.roleName !== interaction.guild.roles.cache.get(targetRoleEnable.id).name) {
                            const newRolenameEnable = interaction.guild.roles.cache.get(targetRoleEnable.id).name;
                            const oldRolenameEnable = existingRoleEnable.roleName;

                            // Supprimer l'ancienne entrée de la carte
                            autoRoleEnable.roles.delete(oldRolenameEnable);

                            // Mettre à jour le nom d'utilisateur et réinsérer l'entrée dans la carte
                            existingRoleEnable.roleName = interaction.guild.roles.cache.get(targetRoleEnable.id).name;
                            autoRoleEnable.roles.set(newRolenameEnable, existingRoleEnable);
                        }
                        await autoRoleEnable.save();
                        interaction.editReply({
                            content: `l'auto-role est déjà configuré pour le rôle ${targetRoleEnable}. Pour le désactiver, utilisez '/autorole disable'.`,
                            ephemeral: true,
                        });
                        return;
                    }

                    autoRoleEnable.roles.set(interaction.guild.roles.cache.get(targetRoleEnable.id).name, {
                        roleName: interaction.guild.roles.cache.get(targetRoleEnable.id).name,
                        roleId: targetRoleEnable.id,
                    });
                } else {
                    autoRoleEnable = new AutoRole({
                        guildId: interaction.guild.id,
                        guildName: interaction.guild.name,
                        roles: new Map([
                            [
                                interaction.guild.roles.cache.get(targetRoleEnable.id).name,
                                {
                                    roleName: interaction.guild.roles.cache.get(targetRoleEnable.id).name,
                                    roleId: targetRoleEnable.id,
                                },
                            ],]),
                    });
                }

                autoRoleEnable.markModified(`roles`);
                await autoRoleEnable.save();

                interaction.editReply({
                    content: `l'auto-role est maintenant configuré pour le rôle ${targetRoleEnable}. Pour le désactiver, utilisez '/autorole disable'.`,
                    ephemeral: true,
                });
                return;
            case `disable`:
                await interaction.deferReply({ ephemeral: true });

                let autoRoleDisable = await AutoRole.findOne({ guildId: interaction.guild.id });
                if (!autoRoleDisable) {
                    interaction.editReply({
                        content:
                            `Aucun autorôle n'a été défini pour ce serveur. Utilisez \`/autorole enable\` pour en créer un.`,
                        ephemeral: true
                    });
                    return;
                }

                const roles = autoRoleDisable.roles;

                if (roles.size === 0) {
                    interaction.editReply({
                        content: `Il n'y a aucun rôle configuré pour l'autorole sur ce serveur. Utilisez \`/autorole enable\` pour en configurer un.`,
                        ephemeral: true
                    });
                    return;
                }

                const targetRoleDisable = interaction.options.getRole(`role`);
                const existingRoleDisable = Array.from(autoRoleDisable.roles.values()).find(role => role.roleId === targetRoleDisable.id);

                if (existingRoleDisable) {
                    roles.forEach((value, key) => {
                        if (value.roleId === targetRoleDisable.id) {
                            roles.delete(key);
                        }
                    });

                    await autoRoleDisable.save();
                    interaction.editReply({
                        content: `Le rôle ${targetRoleDisable} a été supprimé de la configuration de l'autorole. Utilisez \`/autorole enable\` pour en configurer un autre.`,
                        ephemeral: true
                    });
                } else {
                    interaction.editReply({
                        content: `Ce rôle n'est pas configuré pour l'autorole sur ce serveur.`,
                        ephemeral: true
                    });
                }
                return;
        }
    },
    name: `autorole`,
    description: `Configurer ou désactiver l'auto-role pour le serveur`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `enable`,
            description: `activer l'autorole pour le rôle sélectionné`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `role`,
                    description: `Le rôle que les membres obtiennent à leur arrivée sur le serveur`,
                    type: Discord.ApplicationCommandOptionType.Role,
                    required: true,
                },
            ]
        },
        {
            name: `disable`,
            description: `désactiver l'autorole pour le rôle sélectionné`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `role`,
                    description: `Le rôle que les membres obtiennent à leur arrivée sur le serveur`,
                    type: Discord.ApplicationCommandOptionType.Role,
                    required: true,
                },
            ]
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
