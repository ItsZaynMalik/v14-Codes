const { Client, CommandInteraction, ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    description: "Leave's the selected server",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "guildid",
            description: "The guild id to leave",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.user.id === "YourID") return interaction.followUp('You are not allowed.')
        const guildid = interaction.options.getString('guildid')

        try {

            let guild = client.guilds.cache.get(guildid)

            await guild.leave().then((g) => {
                interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Left ${g.name}`)
                            .setColor("Red")
                            .addFields([
                                {
                                    name: `--> Guild ID :`,
                                    value: `-> ${g.id}`
                                },
                                {
                                    name: `--> Guild Members :`,
                                    value: `-> ${g.memberCount}`
                                },
                                {
                                    name: `--> Guild Owner ID :`,
                                    value: `-> ${g.ownerId}`
                                }
                            ])
                            .setThumbnail(g.iconURL())
                    ]
                })
            })

        } catch (err) {
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`:x: Error occured!`)
                        .setDescription(`Bot does not exists in that guild `)
                ]
            })
        }

    },
};