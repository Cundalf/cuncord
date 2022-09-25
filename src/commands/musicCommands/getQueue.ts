import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, Guild, GuildMember } from 'discord.js'
import { Player } from 'discord-music-player';
import MusicPlayer from '../../models/musicPlayer';

export default class GetQueueCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const player: Player = MusicPlayer.getInstance().getPlayer();

        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;

        if (guild) {
            const guildQueue = player.getQueue(guild.id);

            if (guildQueue) {
                const songs = guildQueue.songs;
                let msg = 'I haven\'t finished this command yet, onii-chan :(\nThe next 5 songs in the queue are:\n\n';

                for (let i = 0; i < songs.length; i++) {
                    msg += `${i + 1}. *${songs[i].name}* By *${songs[i].author}*\n`

                    if (i >= 4) {
                        break;
                    }
                }

                await interaction.reply(msg);
            } else {
                await interaction.reply('mmm...');
            }
        }
    }
}
