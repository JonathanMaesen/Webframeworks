import './App.css';

const alphabet: string[] = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
);

function App() {
    const alienAlphabet: string[] = alphabet.map(
        (letter) =>
            `https://raw.githubusercontent.com/slimmii/alien-alphabet/master/${letter}.png`
    );

    return (
        <>
            {alienAlphabet.map((url, index) => (
                <button key={index}>
                    <img src={url} alt={`letter-${alphabet[index]}`} />
                </button>
            ))}
        </>
    );
}

export default App;
