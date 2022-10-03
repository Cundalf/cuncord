import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction, GuildMember, Guild, VoiceBasedChannel } from 'discord.js';
import { createAudioPlayer, AudioPlayer, NoSubscriberBehavior, createAudioResource, AudioResource, joinVoiceChannel, VoiceConnection } from '@discordjs/voice';
import path from 'path';
export default class PlayAudioCommand extends BaseCommand {
    private readonly commands = new Map<string, string>();
    private readonly audioPlayer: AudioPlayer;
    private readonly AUDIO_BOT_GROUP = 'AudioBotCoco';
    private timeout: NodeJS.Timeout | null;

    constructor() {
        super();

        this.audioPlayer = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
        });

        this.createAudioResourceMap();
        this.timeout = null;
    }

    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            if (!interaction) {
                return;
            }

            const audioRequest: string = interaction.options.getString('audio') as string;
            let audioResource: AudioResource;

            if (this.commands.has(audioRequest)) {
                audioResource = createAudioResource(this.commands.get(audioRequest) as string);
            } else {
                return;
            }

            const voiceChannelConnection = this.connectToAudioVoice(interaction);

            if (voiceChannelConnection === null) {
                return;
            }

            const subscription = voiceChannelConnection.subscribe(this.audioPlayer);

            if (subscription) {
                if (this.timeout !== null) {
                    clearTimeout(this.timeout);
                }

                this.audioPlayer.play(audioResource);
                await interaction.reply('( ͡° ͜ʖ ͡°)');

                this.timeout = setTimeout(() => {
                    subscription.unsubscribe();
                    voiceChannelConnection.destroy();
                }, 10_000);
            }
        } catch (err) {
            console.log(err);
        }
    }

    private createAudioResourceMap(): void {
        this.commands.set('lpm', path.resolve(__dirname, '../../../audio', 'laputamadre.mp3'));
        this.commands.set('lcdtm', path.resolve(__dirname, '../../../audio', 'laconchadetumadre.mp3'));
        this.commands.set('dbd', path.resolve(__dirname, '../../../audio', 'dbd.mp3'));
        this.commands.set('orto', path.resolve(__dirname, '../../../audio', 'cerraelorto.mp3'));
    }

    private connectToAudioVoice(interaction: ChatInputCommandInteraction): VoiceConnection | null {
        const guildMember: GuildMember = interaction.member as GuildMember;
        const guild: Guild = guildMember.guild;
        const channel: VoiceBasedChannel = guildMember.voice.channel as VoiceBasedChannel;

        if (!guild || !channel) {
            return null;
        }

        return joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            group: this.AUDIO_BOT_GROUP
        });
    }
}
