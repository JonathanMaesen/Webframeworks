import { useState } from "react";

interface SlotMachineProps {
    slotCount: number;
}

export function SlotMachine(props: SlotMachineProps) {
    const slotImages: string[] = [
        "slot-seven.png",
        "slot-prune.png",
        "slot-melon.png",
        "slot-lemon.png",
        "slot-cherry.png",
    ];

    function getRandomSlots(count: number): number[] {
        const result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(Math.floor(Math.random() * slotImages.length));
        }
        return result;
    }

    const [money, setMoney] = useState<number>(100);
    const [slots, setSlots] = useState<number[]>(() => getRandomSlots(props.slotCount));
    const [message, setMessage] = useState<string>("");

    function isWin(arr: number[]): boolean {
        if (arr.length === 0) return false;
        const first = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== first) return false;
        }
        return true;
    }

    function handleSpin() {
        const newSlots = getRandomSlots(props.slotCount);
        setSlots(newSlots);

        const win = isWin(newSlots);
        setMoney((m) => m + (win ? 20 : -1));
        setMessage(win ? "You win!" : "Try again");
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

            <p>{money}$</p>

            <button onClick={handleSpin} disabled={money <= 0}>
                Spin
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}
