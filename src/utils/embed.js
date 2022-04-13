const { MessageEmbed } = require('discord.js');

const CreateEmbed = (message) => {
  const Embedmessage = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(message.title)
    .setURL(message.image)
    .setDescription(message.summary.substring(0, 60) + '...')
    .setThumbnail(message.image);
};

module.exports = CreateEmbed;
