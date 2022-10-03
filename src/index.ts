import { Client } from 'discord.js';
import Invoker from './commands/invoker';
import sourceMapSupport from 'source-map-support';
import ClientsManager from './models/clientsManager';

sourceMapSupport.install();

(async () => {
    const clientsManager: ClientsManager = ClientsManager.getInstance();
    const mainClient: Client = clientsManager.getMainClient();
    const audioClient: Client = clientsManager.getAudioClient();
    const invoker: Invoker = new Invoker();

    const executeCommandFromInteraction = async (interaction: any): Promise<void> => {
        if (!ClientsManager.getInstance().isMainClientReady() || !ClientsManager.getInstance().isAudioClientReady()) {
            return;
        }
        if (!interaction.isChatInputCommand()) return;

        await invoker.executeCommand(interaction);
    };

    mainClient.once('ready', () => {
        console.log('Discord Main Client Ready!')
        clientsManager.setMainClientAsReady();
    });

    audioClient.once('ready', () => {
        console.log('Discord Audio Client Ready!')
        clientsManager.setAudioClientAsReady();
    });

    mainClient.on('interactionCreate', async interaction => await executeCommandFromInteraction(interaction));
    audioClient.on('interactionCreate', async interaction => await executeCommandFromInteraction(interaction));

    await mainClient.login(process.env.MAIN_DISCORD_TOKEN);
    await audioClient.login(process.env.AUDIO_DISCORD_TOKEN);
})().catch(e => {
    console.error('Critical error!!!!', e);
});
