require('dotenv').config();

// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials } = require('discord.js');

// Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
	partials: [Partials.Channel],
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

const { Player, RepeatMode } = require('discord-music-player');
const player = new Player(client, {
	leaveOnEmpty: false,
});

client.on('messageCreate', async (message) => {
	const args = message.content.slice('$'.length).trim().split(/ +/g);
	console.log(args);
	const command = args.shift();
	const guildQueue = player.getQueue(message.guild.id);

	if (command === 'play') {
		const queue = player.createQueue(message.guild.id);
		await queue.join(message.member.voice.channel);
		const song = await queue.play(args.join(' ')).catch(err => {
			console.log(err);
			if (!guildQueue) {
				queue.stop();
			}
		});
		console.log(song);
	}

	if (command === 'playlist') {
		const queue = player.createQueue(message.guild.id);
		await queue.join(message.member.voice.channel);
		const song = await queue.playlist(args.join(' ')).catch(err => {
			console.log(err);
			if (!guildQueue) {
				queue.stop();
			}
		});
		console.log(song);
	}

	if (command === 'skip') {
		guildQueue.skip();
	}

	if (command === 'stop') {
		guildQueue.stop();
	}

	if (command === 'removeLoop') {
		guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
	}

	if (command === 'toggleLoop') {
		guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
	}

	if (command === 'toggleQueueLoop') {
		guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
	}

	if (command === 'setVolume') {
		guildQueue.setVolume(parseInt(args[0]));
	}

	if (command === 'seek') {
		guildQueue.seek(parseInt(args[0]) * 1000);
	}

	if (command === 'clearQueue') {
		guildQueue.clearQueue();
	}

	if (command === 'shuffle') {
		guildQueue.shuffle();
	}

	if (command === 'getQueue') {
		console.log(guildQueue);
	}

	if (command === 'getVolume') {
		console.log(guildQueue.volume);
	}

	if (command === 'nowPlaying') {
		console.log(`Now playing: ${guildQueue.nowPlaying}`);
	}

	if (command === 'pause') {
		guildQueue.setPaused(true);
	}

	if (command === 'resume') {
		guildQueue.setPaused(false);
	}

	if (command === 'remove') {
		guildQueue.remove(parseInt(args[0]));
	}

	if (command === 'createProgressBar') {
		const ProgressBar = guildQueue.createProgressBar();

		// [======>              ][00:35/2:20]
		console.log(ProgressBar.prettier);
	}
});