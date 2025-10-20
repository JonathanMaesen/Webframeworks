interface MultiplicationRowProps {
    rowIndex: number;
    cells: number;
}



function MultiplicationRow({ rowIndex, cells }: MultiplicationRowProps) {
    return (
        <tr>
            <th style={{ border: '1px solid black', padding: '4px', textAlign: 'right' }}>
                {rowIndex}
            </th>
            {Array.from({ length: cells }, (_, j) => {
                const colIndex = j + 1;
                const value = rowIndex * colIndex;
                return (
                    <td key={colIndex} style={{ border: '1px solid black', padding: '4px', textAlign: 'right' }}>
                        {value}
                    </td>
                );
            })}
        </tr>
    );
}

export default MultiplicationRow;
