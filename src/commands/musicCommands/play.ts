import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, Guild, GuildMember, VoiceBasedChannel } from 'discord.js'
import { Player } from 'discord-music-player';
import MusicPlayer from '../../models/musicPlayer';

export default class PlayCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const player: Player = MusicPlayer.getInstance().getPlayer();

        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;

        if (guild && guildMember) {
            const guildQueue = player.getQueue(guild.id);
            const queue = player.createQueue(guild.id);
            const play = interaction.options.getString('song') as string;
            const channel = interaction.channel;

            try {
                await interaction.reply('I\'m looking for the song, bear with me :point_right::skin-tone-1: :point_left::skin-tone-1:');

                await queue.join(guildMember.voice.channel as VoiceBasedChannel);

                const songInQueue = await queue.play(play).catch(err => {
                    console.log(err);
                    if (!guildQueue) {
                        queue.stop();
                    }
                });

                if (songInQueue) {
                    const author = `**By:** *${songInQueue.author}*`;
                    const songResponse = `**Adding:** *${songInQueue.name}*\n${author}`;

                    if (channel !== null) {
                        await channel.send(songResponse);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}
