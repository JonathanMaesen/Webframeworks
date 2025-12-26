export default function Loading() {
    return (
        <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-4 bg-gray-200 rounded w-24 dark:bg-gray-700"></div>
                            <div className="h-4 bg-gray-200 rounded w-16 dark:bg-gray-700"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}