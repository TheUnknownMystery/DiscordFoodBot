const { GetFoodData, GetFoodByName } = require('./utils/get-food-api');
const ImageSanity = require('./utils/innapropriate-api.js');
const CreateEmbed = require('./utils/embed');
const { Client, Intents } = require('discord.js');
const Filter = require('bad-words');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

//logging when ready
client.on('ready', () => {
  console.log('🤖🤖 Bot is ready to login');
  console.log(`Logged in as ${client.user.tag}!`);
});

//listening to messages and checking for food command
client.on('messageCreate', async (message) => {
  const filter = new Filter();

  if (message.attachments.size > 0) {
    const { weapon, alcohol, gore, nudity } = await ImageSanity(
      message.attachments.first().url
    );

    try {
      if (
        weapon > 0.1 ||
        alcohol > 0.1 ||
        gore.prob > 0.1 ||
        nudity.raw > 0.1 ||
        nudity.safe >= 0.9
      ) {
        message.channel.send(
          `${message.author} Please do not post nudity or gore content.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (filter.isProfane(message.content) === true) {
    message.delete();
    message.channel.send(
      `${message.author.username} you are not allowed to use that word.`
    );
  }

  if (message.content.startsWith('#list-users')) {
    const users = message.guild.members.cache.map((member) => member.user);
    message.channel.send(`
      **users in this server:**

      ${users
        .map(({ bot, username }) => `${bot ? '🤖' : '👳'}-${username}`)
        .join('\n')}
    `);
  }

  if (message.content.includes('$sudo-get-food')) {
    const food_data = await GetFoodData();

    food_data.recipes.forEach((food) => {
      const embed = CreateEmbed(food);
      message.channel.send({ embeds: [embed] });
    });
  }

  if (message.content.includes('$food-name=')) {
    try {
      const food_name = message.content.split('$food-name=')[1];
      const food_data = await GetFoodByName(food_name);

      food_data.results.forEach((food) => {
        message.channel.send({
          embeds: [
            CreateEmbed({
              ...food,
              summary: `showing results of ${food_name}`,
            }),
          ],
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
});

//login using the DISCORD TOKEN
client.login(process.env.DISCORD_TOKEN);
