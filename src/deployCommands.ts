import { REST, Routes, SlashCommandBuilder } from 'discord.js';

if (process.env.MAIN_DISCORD_TOKEN == null ||
    process.env.MAIN_DISCORD_CLIENT_ID == null ||
    process.env.AUDIO_DISCORD_TOKEN == null ||
    process.env.AUDIO_DISCORD_CLIENT_ID == null ||
    process.env.DISCORD_GUILD_ID == null) {
    throw new Error('Discord configuration not set');
}

const mainCommands = [
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('play').setDescription('Play ONE SONG from Spotify or Youtube')
        .addStringOption(option => option.setName('song').setDescription('Song URL').setRequired(true)),
    new SlashCommandBuilder().setName('playlist').setDescription('Play playlist from Spotify or Youtube')
        .addStringOption(option => option.setName('playlist').setDescription('Playlist URL').setRequired(true)),
    new SlashCommandBuilder().setName('stop').setDescription('Stop music'),
    new SlashCommandBuilder().setName('skip').setDescription('Skip current song'),
    new SlashCommandBuilder().setName('resume').setDescription('Resume music'),
    new SlashCommandBuilder().setName('pause').setDescription('Pause music'),
    new SlashCommandBuilder().setName('nowplaying').setDescription('Send current song info to chat'),
    new SlashCommandBuilder().setName('getqueue').setDescription('Send current queue to chat'),
    new SlashCommandBuilder().setName('clearqueue').setDescription('Clear current queue'),
    new SlashCommandBuilder().setName('recommendation').setDescription('Playlist recommendations'),
    new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle :$'),
    new SlashCommandBuilder().setName('crypto').setDescription('Send crypto value information')
]
    .map(command => command.toJSON());

const audioCommands = [
    new SlashCommandBuilder().setName('audio').setDescription('Play predefined audio')
        .addStringOption(option => option.setName('audio').setDescription('Audio request').setRequired(true).addChoices(
            { name: 'AltiriamLaPutaMadre', value: 'lpm' },
            { name: 'BekerLaConchaDeTuMadre', value: 'lcdtm' },
            { name: 'MaxiDBD', value: 'dbd' },
            { name: 'CundaCerraElOrto', value: 'orto' },
            { name: 'RandomTrolazo', value: 'trolazo' },
            { name: 'TodosEstaBien', value: 'estabien' },
            { name: 'TodosNo', value: 'no' },
            { name: 'AwitaPelotudito', value: 'pelotudito' },
            { name: 'AwitaCalor', value: 'awitacalor' },
            { name: 'BekerCalor', value: 'bekercalor' },
            { name: 'BekerPurpleRain', value: 'purplerain' },
            { name: 'BekerReLocoFulbo', value: 'fulbo' },
            { name: 'FacuLlanto', value: 'llanto' },
            { name: 'BekerGrito', value: 'bekergrito' }
        ))
]
    .map(command => command.toJSON());

let rest = new REST({ version: '10' }).setToken(process.env.MAIN_DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.MAIN_DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: mainCommands })
    .then((data) => console.log('Successfully registered application commands.'))
    .catch(console.error);

rest = new REST({ version: '10' }).setToken(process.env.AUDIO_DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.AUDIO_DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: audioCommands })
    .then((data) => console.log('Successfully registered application commands.'))
    .catch(console.error);
