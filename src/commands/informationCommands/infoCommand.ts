import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction } from 'discord.js'

export default class InfoCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            if (interaction != null) {
                await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
