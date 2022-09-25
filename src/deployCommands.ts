import { REST, Routes, SlashCommandBuilder } from 'discord.js';

if (process.env.DISCORD_TOKEN == null || process.env.DISCORD_CLIENT_ID == null || process.env.DISCORD_GUILD_ID == null) {
    throw new Error('Discord configuration not set');
}

const commands = [
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('play').setDescription('Play ONE SONG from Spotify or Youtube')
        .addStringOption(option => option.setName('song').setDescription('Song URL').setRequired(true)),
    new SlashCommandBuilder().setName('playlist').setDescription('Play playlist from Spotify or Youtube')
        .addStringOption(option => option.setName('playlist').setDescription('Playlist URL').setRequired(true)),
    new SlashCommandBuilder().setName('playaudio').setDescription('Play predefined audio')
        .addStringOption(option => option.setName('audio').setDescription('Audio request').setRequired(true).addChoices(
            { name: 'AltiriamLaPutaMadre', value: 'lpm' },
            { name: 'BekerLaConchaDeTuMadre', value: 'lcdtm' },
            { name: 'MaxiDBD', value: 'dbd' },
            { name: 'CundaCerraElOrto', value: 'orto' }
        )),
    new SlashCommandBuilder().setName('stop').setDescription('Stop music'),
    new SlashCommandBuilder().setName('skip').setDescription('Skip current song'),
    new SlashCommandBuilder().setName('resume').setDescription('Resume music'),
    new SlashCommandBuilder().setName('pause').setDescription('Pause music'),
    new SlashCommandBuilder().setName('nowplaying').setDescription('Send current song info in chat'),
    new SlashCommandBuilder().setName('getqueue').setDescription('WIP'),
    new SlashCommandBuilder().setName('clearqueue').setDescription('Clear current queue'),
    new SlashCommandBuilder().setName('recommendation').setDescription('Playlist recommendations')
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
    .then((data) => console.log('Successfully registered application commands.'))
    .catch(console.error)
