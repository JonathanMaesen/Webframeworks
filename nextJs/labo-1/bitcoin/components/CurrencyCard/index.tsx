import { CurrencyInfo } from "@/utils/interfaces/interfaces";

interface CurrencyCardProps {
    currency: CurrencyInfo;
}

export default function CurrencyCard({ currency }: CurrencyCardProps) {
    return (
        <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 truncate pr-2">
                    {currency.description}
                </h2>
                <span className="shrink-0 px-2.5 py-1 text-xs font-bold tracking-wide text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                    {currency.code}
                </span>
            </div>
            <div className="flex items-baseline mt-auto">
                <span
                    className="text-xl font-semibold text-gray-500 dark:text-gray-400 mr-1"
                    dangerouslySetInnerHTML={{ __html: currency.symbol }}
                />
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight tabular-nums">
                    {currency.rate}
                </span>
            </div>
        </div>
    );
}