import MultiplicationRow from "../MultiplicationRow/MultiplicationRow.tsx";
import MultiplicationHeader from "../Header/Header.tsx";

export interface MultiplicationTableProps {
    rows: number;
    cells: number;
}

function MultiplicationTable({ rows, cells }: MultiplicationTableProps) {
    return (
        <div>
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <MultiplicationHeader cells={cells} />
                </thead>
                <tbody>
                {Array.from({ length: rows }, (_, i) => (
                    <MultiplicationRow rowIndex={i + 1} cells={cells} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MultiplicationTable;
