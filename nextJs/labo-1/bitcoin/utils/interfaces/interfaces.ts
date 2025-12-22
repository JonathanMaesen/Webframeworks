export interface BitcoinPriceIndexResponse {
    time: TimeData;
    disclaimer: string;
    chartName: string;
    bpi: BpiData;
}

export interface TimeData {
    updated: string;
    updatedISO: string;
    updateduk: string;
}

export interface BpiData {
    USD: CurrencyInfo;
    GBP: CurrencyInfo;
    EUR: CurrencyInfo;
    [currencyCode: string]: CurrencyInfo;
}

export interface CurrencyInfo {
    code: string;
    symbol: string;
    rate: string;
    description: string;
    rate_float: number;
}