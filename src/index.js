const { Client, Intents } = require('discord.js');
const CreateEmbed = require('./utils/embed');
const GetFoodData = require('./utils/get-food-api');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', (e) => {
  console.log('bot is ready to login');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content.includes('$sudo-get-food')) {
    const food_data = await GetFoodData();

    food_data.recipes.forEach(({ title, image, summary }) => {
      const embed = CreateEmbed({
        title,
        image,
        summary,
      });

      message.channel.send({ embeds: [embed] });
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
