const { MessageEmbed } = require('discord.js');

const CreateEmbed = (message) => {
  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(message.title)
    .setURL(message.sourceUrl)
    .setDescription(message.summary.substring(0, 60) + '...')
    .setThumbnail(message.image);
};

module.exports = CreateEmbed;
