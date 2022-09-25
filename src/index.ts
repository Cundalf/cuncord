import { Client } from 'discord.js';
import Invoker from './commands/invoker';
import DiscordClient from './models/discordClient';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

(async () => {
    const discordClient: Client = DiscordClient.getInstance().getDiscordClient();

    discordClient.once('ready', () => console.log('Discord Client Ready!'));
    const invoker: Invoker = new Invoker();

    discordClient.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        await invoker.executeCommand(interaction);
    });

    await discordClient.login(process.env.DISCORD_TOKEN);
})().catch(e => {
    console.error('Critical error!!!!', e);
});
