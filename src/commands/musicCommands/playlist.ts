import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, Guild, GuildMember, VoiceBasedChannel } from 'discord.js'
import { Player } from 'discord-music-player';
import MusicPlayer from '../../models/musicPlayer';

export default class PlaylistCommand extends BaseCommand {
    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const player: Player = MusicPlayer.getInstance().getPlayer();

        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;

        if (guild && guildMember) {
            const guildQueue = player.getQueue(guild.id);
            const queue = player.createQueue(guild.id);
            const playlist = interaction.options.getString('playlist') as string;
            const channel = interaction.channel;

            try {
                await interaction.reply('Adding... Please, wait Senpai :(');
                await queue.join(guildMember.voice.channel as VoiceBasedChannel);

                // const playlistInQueue =
                await queue.playlist(playlist)
                    .catch(err => {
                        console.log(err);
                        if (!guildQueue) {
                            queue.stop();
                        }
                    });

                const username = interaction.user.username;
                const cantSongs = queue.songs.length;
                await channel?.send(`${username} added ${cantSongs} songs`);
            } catch (err) {
                console.log(err);
            }
        }
    }
}
