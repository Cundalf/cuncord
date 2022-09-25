import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, Guild, GuildMember } from 'discord.js'
import { Player } from 'discord-music-player';
import MusicPlayer from '../../models/musicPlayer';

export default class ShuffleCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const player: Player = MusicPlayer.getInstance().getPlayer();

        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;

        if (guild) {
            const guildQueue = player.getQueue(guild.id);

            if (guildQueue) {
                guildQueue.shuffle();
                await interaction.reply('I\'ll shuffle as good as ice cream in a car, pico-chan UwU');
            } else {
                await interaction.reply('mmm...');
            }
        }
    }
}
