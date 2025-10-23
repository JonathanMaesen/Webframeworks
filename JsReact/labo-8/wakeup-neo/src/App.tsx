import { LineProvider } from "./context/LineContext";
import FirstLine from "./components/FirstLine";

export default function App() {
    return (
        <LineProvider>
            <div
                style={{
                    backgroundColor: "black",
                    color: "#4AF626",
                    display: "flex",
                    flexDirection: "column",
                    padding: 20,
                }}
            >
                <FirstLine />
            </div>
        </LineProvider>
    );
}
