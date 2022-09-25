import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction } from 'discord.js'

interface Playlist {
    name: string
    link: string
}

export default class RecommendationCommand extends BaseCommand {
    private readonly playlists: Playlist[] = [
        {
            name: 'Headbanding... Senpai',
            link: 'https://open.spotify.com/playlist/0xs7e8nSPUlu9ThhSjTa0D?si=c1522eca74074df5'
        },
        {
            name: 'Rock & Metal... Senpai',
            link: 'https://open.spotify.com/playlist/26okFjsWYEa0U7nfNWGFlq?si=1180e1a51b0148a0'
        },
        {
            name: 'Soft Rock... Senpai',
            link: 'https://open.spotify.com/playlist/0OWhhPXWvpmFfmYLB2qDzY?si=dce79d2adb7b4320'
        },
        {
            name: 'This is Symphonic... Senpai!',
            link: 'https://open.spotify.com/playlist/6hH82SdAkARDY2NRKoTEf3?si=10cf6d4835284a21'
        },
        {
            name: 'Rock \'n\' Roll Racing Soundtrack',
            link: 'https://open.spotify.com/playlist/0TdfOU9QLqRUFNgl3FZ31k?si=8746f2915e2c4911'
        }
    ];

    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            if (interaction != null) {
                let msg = '**Music Recommendation**\n\n'

                this.playlists.forEach(playlist => {
                    msg += `**${playlist.name}**\n*${playlist.link}*\n\n`;
                });

                await interaction.reply(msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
