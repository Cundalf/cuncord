import BaseCommand from './baseCommand';
import InfoCommand from './informationCommands/infoCommand';
import ServerCommand from './informationCommands/serverCommand';
import PlayCommand from './musicCommands/play';
import { ChatInputCommandInteraction } from 'discord.js'
import PlaylistCommand from './musicCommands/playlist';
import PlayAudioCommand from './audioCommands/playAudio';
import StopCommand from './musicCommands/stop';
import SkipCommand from './musicCommands/skip';
import ResumeCommand from './musicCommands/resume';
import PauseCommand from './musicCommands/pause';
import NowPlayingCommand from './musicCommands/nowPlaying';
import GetQueueCommand from './musicCommands/getQueue';
import ClearQueueCommand from './musicCommands/clearQueue';
import RecommendationCommand from './musicCommands/recommendation';
import ShuffleCommand from './musicCommands/shuffle';

export default class Invoker {
    private readonly commands = new Map<string, BaseCommand>();

    constructor() {
        this.commands.set('info', new InfoCommand());
        this.commands.set('server', new ServerCommand());
        this.commands.set('play', new PlayCommand());
        this.commands.set('playlist', new PlaylistCommand());
        this.commands.set('audio', new PlayAudioCommand());
        this.commands.set('stop', new StopCommand());
        this.commands.set('skip', new SkipCommand());
        this.commands.set('resume', new ResumeCommand());
        this.commands.set('pause', new PauseCommand());
        this.commands.set('nowplaying', new NowPlayingCommand());
        this.commands.set('getqueue', new GetQueueCommand());
        this.commands.set('clearqueue', new ClearQueueCommand());
        this.commands.set('recommendation', new RecommendationCommand());
        this.commands.set('shuffle', new ShuffleCommand());
    }

    async executeCommand(interaction: ChatInputCommandInteraction): Promise<void> {
        const { commandName } = interaction;

        if (this.commands.has(commandName)) {
            const commandToExecute: BaseCommand = this.commands.get(commandName) as BaseCommand;
            await commandToExecute.execute(interaction);
        } else {
            await interaction.reply('WTF???');
        }
    }
}
