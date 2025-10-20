import './App.css';
import {Question} from "./components/Question/Question.tsx";
import {useState} from "react";

function App() {
    const [finished, setFinished] = useState(false);

    return (
        <>
            <Question
                question="What is the answer to life, the universe and everything?" correctAnswer={"42"} options={["42", "The Answer", "God"]} finished={finished}
            />
            <Question question={"Which planet is known as the Red Planet?"} options={["Mars", "Venus", "Jupiter"]} correctAnswer={"Mars"} finished={finished}/>
            <button onClick={() => setFinished(true)}>Submit</button>
        </>
    );
}

export default App;
