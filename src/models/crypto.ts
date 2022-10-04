export enum Currency {
    DOLLAR,
    ARG_PESO
}

export default class Crypto {
    public static culoCoin = new Crypto('CuloCoin')
        .addReferenceValue(Currency.DOLLAR, 150)
        .addReferenceValue(Currency.ARG_PESO, 500000);

    public static osCoin = new Crypto('ObraSocialCoin')
        .addReferenceValue(Currency.DOLLAR, 290)
        .addReferenceValue(Currency.ARG_PESO, 10000);

    private readonly name: string;
    private readonly referenceValue: Map<Currency, number>;
    private readonly usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    private readonly arsFormatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    constructor(name: string) {
        this.name = name;
        this.referenceValue = new Map();
    }

    static create(name: string): Crypto {
        return new Crypto(name);
    }

    addReferenceValue(currency: Currency, referenceValue: number): Crypto {
        this.referenceValue.set(currency, referenceValue);
        return this;
    }

    getReferenceValue(currency: Currency): number | null {
        if (this.referenceValue.has(currency)) {
            return this.referenceValue.get(currency) as number;
        } else {
            return null;
        }
    }

    getArsOriginalValue(): string {
        const value = this.referenceValue.get(Currency.ARG_PESO) as number;
        return this.arsFormatter.format(value);
    }

    getDollarReferenceValue(): string {
        const value = this.referenceValue.get(Currency.DOLLAR) as number;
        return this.usdFormatter.format(value);
    }

    getOriginalDollarValue(): string {
        const originalValue: number = (this.referenceValue.get(Currency.ARG_PESO) as number) / (this.referenceValue.get(Currency.DOLLAR) as number);

        return this.usdFormatter.format(originalValue);
    }

    getCurrentValue(dollarValue: number, currency: Currency): string {
        let value = 0;
        if (currency === Currency.ARG_PESO) {
            const originalValue: number = (this.referenceValue.get(Currency.ARG_PESO) as number) / (this.referenceValue.get(Currency.DOLLAR) as number);
            value = originalValue * dollarValue;

            return this.arsFormatter.format(value);
        } else {
            value = (this.referenceValue.get(Currency.ARG_PESO) as number) / dollarValue;

            return this.usdFormatter.format(value);
        }
    }

    getName(): string {
        return this.name;
    }
}
