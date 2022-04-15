const Filter = require('bad-words');
const { Client, Intents } = require('discord.js');
const CreateEmbed = require('./utils/embed');
const { GetFoodData, GetFoodByName } = require('./utils/get-food-api');

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

  if (filter.isProfane(message.content) === true) {
    message.delete();
    message.channel.send(
      `${message.author.username} you are not allowed to use that word`
    );
  }

  if (message.content.startsWith('#list-users')) {
    //get all users in discord server
    const users = message.guild.members.cache.map((member) => member.user);
    message.channel.send(`
      users in this server:

      ${users
        .map((user) => `${user.bot ? '🤖' : '👳'}-${user.username}`)
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
        const embed = CreateEmbed({
          title: food.title,
          image: food.image,
          summary: `showing results of ${food_name}`,
          sourceUrl: food.image,
        });

        message.channel.send({ embeds: [embed] });
      });
    } catch (error) {
      console.log(error);
    }
  }
});

//login using the DISCORD TOKEN
client.login(process.env.DISCORD_TOKEN);
