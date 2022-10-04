import BaseCommand from '../baseCommand';
import { ChatInputCommandInteraction } from 'discord.js';
import axios from 'axios';
import Crypto, { Currency } from '../../models/crypto';

interface DolarSiCasa {
    compra: string
    venta: string
    agencia: string
    nombre: string
    variacion: string
    ventaCero: string
    decimales: string
}

interface DolarSiMoneda {
    casa: DolarSiCasa
}

export default class CryptoCommand extends BaseCommand {
    private readonly DOLLAR_API = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
    private readonly DOLAR_SI_DOLAR_BLUE_NAME = 'Dolar Blue';

    override async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            if (!interaction) {
                return;
            }

            const { data } = await axios.get<DolarSiMoneda[]>(this.DOLLAR_API);
            const dolarBlue = data.find(moneda => moneda.casa?.nombre === this.DOLAR_SI_DOLAR_BLUE_NAME)?.casa

            if (!dolarBlue) {
                await interaction.reply('There is a problem in the dollar information.');
                throw new Error('There is a problem in the dollar information.');
            }

            const valorDolar: number = parseFloat(dolarBlue.venta.replace(',', '.'));
            const culoCoinCurrentArs = Crypto.culoCoin.getCurrentValue(valorDolar, Currency.ARG_PESO);
            const culoCoinCurrentDollar = Crypto.culoCoin.getCurrentValue(valorDolar, Currency.DOLLAR);
            const culoCoinOriginalArs = Crypto.culoCoin.getArsOriginalValue();
            const culoCoinOriginalDollar = Crypto.culoCoin.getOriginalDollarValue();
            const culoCoinDollarRef = Crypto.culoCoin.getDollarReferenceValue();

            const osCurrentArs = Crypto.osCoin.getCurrentValue(valorDolar, Currency.ARG_PESO);
            const osCurrentDollar = Crypto.osCoin.getCurrentValue(valorDolar, Currency.DOLLAR);
            const osOriginalArs = Crypto.osCoin.getArsOriginalValue();
            const osOriginalDollar = Crypto.osCoin.getOriginalDollarValue();
            const osDollarRef = Crypto.osCoin.getDollarReferenceValue();

            let reply: string = ':coin: **CuloCoin**\n';
            reply += '----------\n';
            reply += `**Current:** ${culoCoinCurrentArs} ((USD) ${culoCoinCurrentDollar})\n`;
            reply += `**Original:** ${culoCoinOriginalArs} ((USD) ${culoCoinOriginalDollar} // Ref: (USD) ${culoCoinDollarRef})\n`;
            reply += '----------\n';
            reply += ':coin: **CuloCoin**\n';
            reply += `**Current:** ${osCurrentArs} ((USD) ${osCurrentDollar})\n`;
            reply += `**Original:** ${osOriginalArs} ((USD) ${osOriginalDollar} // Ref: (USD) ${osDollarRef})\n`;
            reply += '----------\n';
            reply += ':moneybag: **Dolar Blue**\n';
            reply += '----------\n';
            reply += `**Venta:** $${valorDolar}`;

            await interaction.reply(reply);
        } catch (err) {
            console.log(err);
        }
    }
}
