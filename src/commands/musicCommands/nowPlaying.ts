import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, Guild, GuildMember } from 'discord.js'
import { Player } from 'discord-music-player';
import MusicPlayer from '../../models/musicPlayer';

export default class NowPlayingCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const player: Player = MusicPlayer.getInstance().getPlayer();

        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;
        const channel = interaction.channel;

        if (guild && channel) {
            const guildQueue = player.getQueue(guild.id);

            if (guildQueue) {
                const nowPlaying = guildQueue.nowPlaying;
                if (nowPlaying) {
                    const progressBar = guildQueue.createProgressBar();
                    const author = `**Author:** *${nowPlaying.author}*`;
                    const nowPlayingResponse = `**Now playing:** *${nowPlaying.name}*\n${author}\n${progressBar.prettier}`;
                    await interaction.reply('I will send the information to the channel :)');
                    await channel.send(nowPlayingResponse);
                } else {
                    await channel.send('No song plays :(');
                }
            }
        }
    }
}
