const Discord = require(`discord.js`);
const math = require(`mathjs`);
module.exports = {
    callback: async (bot, interaction) => {
        await interaction.deferReply();

        const availableFunctions = [
            { name: `evaluate`, description: `Évalue une expression mathématique`, exemple: `/calculate evaluate 2 + 2` },
            { name: `simplify`, description: `Simplifie une expression mathématique`, exemple: `/calculate simplify (2x + 3x)` },
            { name: `derive-x`, description: `Calcule la dérivée d'une expression mathématique par rapport à x`, exemple: `/calculate derive-x x^2` },
            { name: `derive-y`, description: `Calcule la dérivée d'une expression mathématique par rapport à y`, exemple: `/calculate derive-y y^2` },
            { name: `pgcd`, description: `Calcule le PGCD de deux nombres`, exemple: `/calculate pgcd 12 18` },
            { name: `ppcm`, description: `Calcule le PPCM de deux nombres`, exemple: `/calculate lcm 4 6` },
            { name: `factorial`, description: `Calcule la factorielle d'un nombre`, exemple: `/calculate factorial 5` },
            { name: `sqrt`, description: `Calcule la racine carrée d'un nombre`, exemple: `/calculate sqrt 16` },
            { name: `cbrt`, description: `Calcule la racine cubique d'un nombre`, exemple: `/calculate cbrt 8` },
            { name: `exp`, description: `Calcule l'exponentielle d'un nombre`, exemple: `/calculate exp 2` },
            { name: `log10`, description: `Calcule le logarithme décimal d'un nombre`, exemple: `/calculate log10 100` },
            { name: `log2`, description: `Calcule le logarithme binaire d'un nombre`, exemple: `/calculate log2 8` },
            { name: `abs`, description: `Calcule la valeur absolue d'un nombre`, exemple: `/calculate abs -5` },
            { name: `ceil`, description: `Arrondit un nombre à l'entier supérieur`, exemple: `/calculate ceil 3.5` },
            { name: `floor`, description: `Arrondit un nombre à l'entier inférieur`, exemple: `/calculate floor 3.5` },
            { name: `round`, description: `Arrondit un nombre à l'entier le plus proche`, exemple: `/calculate round 3.5` },
        ];

        const subcommand = interaction.options.getSubcommand();

        if (subcommand) {
            const expression = interaction.options.getString(`expression`);
            const replacePowers = (expr) => {
                expr = expr.toString(); // Convertir expr en une chaîne de caractères
                return expr.replace(/([xy\d]+)\s*\^\s*(\d+)/g, (match, base, power) => {
                    const superscriptDigits = {
                        "0": `⁰`,
                        "1": `¹`,
                        "2": `²`,
                        "3": `³`,
                        "4": `⁴`,
                        "5": `⁵`,
                        "6": `⁶`,
                        "7": `⁷`,
                        "8": `⁸`,
                        "9": `⁹`,
                    };

                    const powerString = power.toString().split(``).map(digit => superscriptDigits[digit]).join(``);
                    return base + powerString;
                });
            };
            let result;
            let calculation;

            switch (subcommand) {
                case `help`:
                    const helpEmbed = new Discord.EmbedBuilder()
                        .setColor(`#FF0000`)
                        .setTitle(`Commande /calculate`)
                        .setDescription(`Utilisez les sous-commandes suivantes pour effectuer des calculs`);

                    availableFunctions.forEach(func => {
                        helpEmbed.addFields({ name: func.name, value: `${func.description}\n--> Exemple : ${func.exemple}` });
                    });

                    await interaction.editReply({ embeds: [helpEmbed] });
                    return;
                case `evaluate`:
                    calculation = `${replacePowers(expression)}`;
                    result = math.evaluate(expression);
                    break;
                case `simplify`:
                    calculation = `Simplification de ${replacePowers(expression)}`;
                    result = math.simplify(expression).toString();
                    break;
                case `derive-x`:
                    calculation = `Dérivée de ${replacePowers(expression)} par rapport à x`;
                    result = math.derivative(expression, `x`).toString();
                    break;
                case `derive-y`:
                    calculation = `Dérivée de ${replacePowers(expression)} par rapport à y`;
                    result = math.derivative(expression, `y`).toString();
                    break;
                case `pgcd`:
                    const numbers = expression.split(` `).map(Number);
                    calculation = `PGCD de ${numbers.join(` et `)}`;
                    result = math.gcd(...numbers);
                    break;
                case `ppcm`:
                    const numbers2 = expression.split(` `).map(Number);
                    calculation = `PPCM de ${numbers2.join(` et `)}`;
                    result = math.lcm(...numbers2);
                    break;
                case `factorial`:
                    const number = Number(expression);
                    calculation = `Factorielle de ${number}`;
                    result = math.factorial(number);
                    break;
                case `sqrt`:
                    calculation = `Racine carrée de ${replacePowers(expression)}`;
                    result = math.sqrt(Number(expression));
                    break;
                case `cbrt`:
                    calculation = `Racine cubique de ${replacePowers(expression)}`;
                    result = math.cbrt(Number(expression));
                    break;
                case `exp`:
                    calculation = `Exponentielle de ${replacePowers(expression)}`;
                    result = math.exp(Number(expression));
                    break;
                case `log10`:
                    calculation = `Logarithme décimal de ${replacePowers(expression)}`;
                    result = math.log10(Number(expression));
                    break;
                case `log2`:
                    calculation = `Logarithme binaire de ${replacePowers(expression)}`;
                    result = math.log2(Number(expression));
                    break;
                case `abs`:
                    calculation = `Valeur absolue de ${replacePowers(expression)}`;
                    result = math.abs(Number(expression));
                    break;
                case `ceil`:
                    calculation = `Arrondi supérieur de ${replacePowers(expression)}`;
                    result = math.ceil(Number(expression));
                    break;
                case `floor`:
                    calculation = `Arrondi inférieur de ${replacePowers(expression)}`;
                    result = math.floor(Number(expression));
                    break;
                case `round`:
                    calculation = `Arrondi de ${replacePowers(expression)}`;
                    result = math.round(Number(expression));
                    break;
                default:
                    await interaction.editReply(`Sous-commande invalide.`);
                    return;
            }
            const resultEmbed = new Discord.EmbedBuilder()
                .setColor(0xffffff)
                .setTitle(`Calcul Mathématique`)
                .addFields(
                    { name: `Calcul`, value: `'''js\n${calculation}'''` },
                    { name: `Résultat`, value: `'''js\n${replacePowers(result)}'''` }
                )
                .setFooter({ text: `calcul demandé par ${interaction.user.tag}` })

            interaction.editReply({ embeds: [resultEmbed] });
        }
    },
    name: `calculate`,
    description: `Effectue des calculs mathématiques`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `help`,
            description: `Pour avoir l'aide sur les différentes commande de calculate`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: `evaluate`,
            description: `Évalue une expression mathématique`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `simplify`,
            description: `Simplifie une expression mathématique`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `derive-x`,
            description: `Calcule la dérivée d'une expression mathématique par rapport à x`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `derive-y`,
            description: `Calcule la dérivée d'une expression mathématique par rapport à y`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `pgcd`,
            description: `Calcule le PGCD de deux nombres`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `ppcm`,
            description: `Calcule le PPCM de deux nombres`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `factorial`,
            description: `Calcule la factorielle d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `sqrt`,
            description: `Calcule la racine carrée d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `cbrt`,
            description: `Calcule la racine cubique d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `exp`,
            description: `Calcule l'exponentielle d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `log10`,
            description: `Calcule le logarithme décimal d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `log2`,
            description: `Calcule le logarithme binaire d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `abs`,
            description: `Calcule la valeur absolue d'un nombre`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `ceil`,
            description: `Arrondit un nombre à l'entier supérieur`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `floor`,
            description: `Arrondit un nombre à l'entier inférieur`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: `round`,
            description: `Arrondit un nombre à l'entier le plus proche`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `expression`,
                    description: `L'expression mathématique à calculer`,
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
    ],
    permissionsRequired: [],
    botPermissions: []
};
