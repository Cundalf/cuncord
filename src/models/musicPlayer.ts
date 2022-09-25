import { Player } from 'discord-music-player';
import { Client } from 'discord.js';
import DiscordClient from './discordClient';

export default class MusicPlayer {
    private static instance: MusicPlayer;
    private readonly player: Player;
    private readonly discordClient: Client;

    private constructor() {
        this.discordClient = DiscordClient.getInstance().getDiscordClient();

        this.player = new Player(this.discordClient, {
            leaveOnEmpty: false
        });
    }

    public static getInstance(): MusicPlayer {
        if (!MusicPlayer.instance) {
            MusicPlayer.instance = new MusicPlayer();
        }

        return MusicPlayer.instance;
    }

    public getPlayer(): Player {
        return this.player;
    }
}
