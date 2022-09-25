import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction } from 'discord.js'

export default class ServerCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            if (interaction.guild != null) {
                await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
