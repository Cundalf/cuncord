import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, Guild, GuildMember, VoiceBasedChannel } from 'discord.js'
import { Player } from 'discord-music-player';
import MusicPlayer from '../../models/musicPlayer';

export default class PlayCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const player: Player = MusicPlayer.getInstance().getPlayer();

        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;

        if (guild !== null && guildMember !== null) {
            const guildQueue = player.getQueue(guild.id);
            const queue = player.createQueue(guild.id);
            const play = interaction.options.getString('play') as string;

            await queue.join(guildMember.voice.channel as VoiceBasedChannel);
            const songInQueue = await queue.play(play).catch(err => {
                console.log(err);
                if (!guildQueue) {
                    queue.stop();
                }
            });
            // console.log(songInQueue);
        }
    }
}
