interface MultiplicationHeaderProps {
    cells: number;
}
function MultiplicationHeader({ cells }: MultiplicationHeaderProps) {
    return (
        <tr>
            <th style={{ border: '1px solid black', padding: '4px' }}> </th>
            {Array.from({ length: cells }, (_, j) => (
                <th
                    key={j + 1}
                    style={{ border: '1px solid black', padding: '4px' }}
                >
                    {j + 1}
                </th>
            ))}
        </tr>
    );
}

export default MultiplicationHeader;
