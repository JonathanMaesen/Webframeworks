interface slotmachine{
    slotCount: number,
}

export function Slotmachine(props: slotmachine) {
    const slotImages: string[] = ["slot-seven.png", "slot-prune.png", "slot-melon.png", "slot-lemon.png", "slot-cherry.png"];
    const slots: number[] = getRandomSlots(props.slotCount);
    const symbolsCount: number = slotImages.length;
    const winPercent: number = getWinChancePercent(props.slotCount, symbolsCount);

    function getRandomSlots(count: number): number[] {
        const result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(Math.floor(Math.random() * slotImages.length));
        }
        return result;
    }

    function getWinChancePercent(numSlots: number, numSymbols: number): number {
        const num: number = Math.pow(numSymbols, numSlots - 1) * numSymbols;
        return 100 / num;
    }

    function getResultMessage(slots: number[]): string {
        if (slots.length === 0) {
            return 'Try again';
        }
        const first: number = slots[0];
        for (let i = 1; i < slots.length; i++) {
            if (slots[i] !== first) {
                return 'Try again';
            }
        }
        return 'You win!';
    }

    function formatPercent(value: number): string {
        if (value < 0.01) {
            return `${value.toFixed(9)}%`;
        }
        return `${value.toFixed(2)}%`;
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    {slots.map((_, id) => (
                        <th key={`head-${id}`}>Slot {id + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {slots.map((value, id) => (
                        <td key={`cell-${id}`}>
                            <img
                                src={slotImages[value]}
                                width={100}
                                height={100}
                                alt={`slot-${id + 1}`}
                            />
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            <div style={{ marginTop: '1rem' }}>
                <h2>{getResultMessage(slots)}</h2>
                <p>
                    Chance to win (~{formatPercent(winPercent)})
                </p>
            </div>
        </div>
    );
}