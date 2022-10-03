import { Client, ClientOptions, GatewayIntentBits, Partials } from 'discord.js';

export default class ClientsManager {
    private static instance: ClientsManager;
    private readonly mainClient: Client;
    private readonly audioClient: Client;
    private mainClientReady: boolean;
    private audioClientReady: boolean;

    private constructor() {
        this.mainClient = new Client(this.getClientOptions());
        this.audioClient = new Client(this.getClientOptions());

        this.mainClientReady = false;
        this.audioClientReady = false;
    }

    public static getInstance(): ClientsManager {
        if (!ClientsManager.instance) {
            ClientsManager.instance = new ClientsManager();
        }

        return ClientsManager.instance;
    }

    public setMainClientAsReady(): void {
        this.mainClientReady = true;
    }

    public setAudioClientAsReady(): void {
        this.audioClientReady = true;
    }

    public isMainClientReady(): boolean {
        return this.mainClientReady;
    }

    public isAudioClientReady(): boolean {
        return this.audioClientReady;
    }

    public getMainClient(): Client {
        return this.mainClient;
    }

    public getAudioClient(): Client {
        return this.audioClient;
    }

    private getClientOptions(): ClientOptions {
        return {
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ],
            partials: [Partials.Channel]
        };
    }
}
