const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
module.exports = {
    name: "nitro",
    description: "FREE nitro!!!",
    aliases: ["nitro"],
    run: async (client, message, args) => {
        try {
            const nitro = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("You've been gifted a subscription!")
                .setThumbnail("https://static.roundme.com/upload/user/d30750eda6c30bba9295ad629961420555c05496.png")
                .setDescription(`You've been gifted Nitro for **1 Month!**\nExpires in **48 hours**`)
                .setFooter({ text: "Free Nitro" });
            const row = (state) => [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("clicked").setDisabled(state).setLabel("Claim").setStyle(3)
                ),
            ];
            const msg = await message.reply({
                embeds: [nitro],
                components: row(false),
            });
            const collector = msg.createMessageComponentCollector((button) => button.user.id === message.author.id, { time: 60e3 });
            collector.on('collect', async (b) => {
                if (b.customId === "clicked") {
                    msg.edit({ content: "https://imgur.com/NQinKJB", embeds: [], components: [] });
                }
            })
        } catch (error) {
           console.log(error)
        }
    }
}
