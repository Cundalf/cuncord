import BaseCommand from './baseCommand';
import InfoCommand from './informationCommands/infoCommand';
import ServerCommand from './informationCommands/serverCommand';
import PlayCommand from './musicCommands/play';
import { ChatInputCommandInteraction } from 'discord.js'
import PlaylistCommand from './musicCommands/playlist';
import PlayAudioCommand from './audioCommands/playAudio';

export default class Invoker {
    private readonly commands = new Map<string, BaseCommand>();

    constructor() {
        this.commands.set('info', new InfoCommand());
        this.commands.set('server', new ServerCommand());
        this.commands.set('play', new PlayCommand());
        this.commands.set('playlist', new PlaylistCommand());
        this.commands.set('playaudio', new PlayAudioCommand());
    }

    async executeCommand(interaction: ChatInputCommandInteraction): Promise<void> {
        const { commandName } = interaction;

        if (this.commands.has(commandName)) {
            const commandToExecute: BaseCommand = this.commands.get(commandName) as BaseCommand;
            await commandToExecute.execute(interaction);
        }
    }
}
