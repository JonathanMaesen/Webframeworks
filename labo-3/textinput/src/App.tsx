// @ts-ignore
import "./App.css";
import TextInputRepeater from "./components/TextInputRepeater/TextInputRepeater.tsx";


function App() {

    return (
        <>
            <table>
                <tbody>
                    <TextInputRepeater cellCount={4} />
                </tbody>
            </table>
        </>
    );
}

export default App;
