import './App.css'


function App() {

    const colors = Array.from({length: 100}, (_, i) => `hsl(${i * 360 / 100}, 100%, 50%)`);

    return (
    <>
        <div style={{height: "100vh", width: "100%"}}>
            {colors.map((color, i) => (
                <div
                    key={i}
                    style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: color,
                        display: 'block'
                }}
                ></div>
            ))}
        </div>
    </>
  );
}

export default App
