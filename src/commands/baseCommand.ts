import { ChatInputCommandInteraction } from 'discord.js'

export default abstract class BaseCommand {
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        throw new Error('Command without implementation');
    }
}
