"use client";

import useSWR from "swr";
import { BitcoinPriceIndexResponse, CurrencyInfo } from "@/utils/interfaces/interfaces";
import CurrencyCard from "@/components/CurrencyCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CurrencyCardList() {
    const { data, error, isLoading } = useSWR<BitcoinPriceIndexResponse>(
        "https://sampleapis.assimilate.be/bitcoin/current",
        fetcher,
        { refreshInterval: 50000 }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-5xl mx-auto">
            {data && Object.values(data.bpi).map((currency: CurrencyInfo) => (
                <CurrencyCard key={currency.code} currency={currency} />
            ))}
        </div>
    );
}