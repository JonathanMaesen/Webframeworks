import ColorSquare from "./components/ColorSquare/ColorSquare.tsx"
function App() {

    return (
        <>
            <div style={{display: "flex"}}>
                <ColorSquare prop={"green"}/>
                <ColorSquare prop={"blue"}/>
                <ColorSquare prop={"red"}/>
                <ColorSquare prop={"yellow"}/>
            </div>
        </>
    );
}

export default App;
