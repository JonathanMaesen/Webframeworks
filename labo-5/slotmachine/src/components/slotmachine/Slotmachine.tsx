import { useState } from "react";

interface SlotMachineProps {
    slotCount: number;
}

export function Slotmachine(props: SlotMachineProps) {

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

    function getResultMessage(slots: number[]): string {
        if (slots.length === 0) return "Try again";
        const first = slots[0];
        for (let i = 1; i < slots.length; i++) {
            if (slots[i] !== first) return "Try again";
        }
        setMoney(money + 20)
        return "You win!";
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
            <p>{getResultMessage(slots)}</p>
            <p>{money}$</p>
            <button
                onClick={() => {
                    setSlots(getRandomSlots(props.slotCount));
                    setMoney(money - 1);
                }}
            >
                Spin
            </button>

        </div>
    );
}
