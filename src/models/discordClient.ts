import { Client, GatewayIntentBits, Partials } from 'discord.js';

export default class DiscordClient {
    private static instance: DiscordClient;
    private readonly client: Client;

    private constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ],
            partials: [Partials.Channel]
        });
    }

    public static getInstance(): DiscordClient {
        if (!DiscordClient.instance) {
            DiscordClient.instance = new DiscordClient();
        }

        return DiscordClient.instance;
    }

    public getDiscordClient(): Client {
        return this.client;
    }
}
