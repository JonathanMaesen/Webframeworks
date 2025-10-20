import type { TableItem } from "../../interfaces";

type TableProps = {
    items: TableItem[];
    onRemove?: (index: number) => void;
};

export function Table({ items, onRemove }: TableProps) {
    if (items.length === 0) {
        return <tbody><tr><td colSpan={3}>No items yet</td></tr></tbody>;
    }

    return (
        <tbody>
        {items.map((item, idx) => (
            <tr key={`${item.name}-${idx}`}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                    {onRemove && (
                        <button type="button" onClick={() => onRemove(idx)}>
                            remove
                        </button>
                    )}
                </td>
            </tr>
        ))}
        </tbody>
    );
}
