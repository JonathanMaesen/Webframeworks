import {createContext, useContext, useState} from 'react'

interface TextContent{
    text: string
}

const TextContent = createContext<TextContent>({text: "Knock, Knock, Neo"})

const FourthLine = () => {
    const context = useContext(TextContent);
    let text = context.text;

    // same thing as: const {text} = useContext(TextContent); ^
    return (
        <><p>{text}</p></>
    );
};
const ThirdLine = () => <><p>Follow the white rabbit.</p><FourthLine/></>;
const SecondLine = () => <><p>The matrix has you...</p><ThirdLine/></>;
const FirstLine = () => <><p>Wake Up, Neo...</p><SecondLine/></>

const App = () => {
    const [text, setText] = useState("Knock, Knock, Neo");
    return (
        <TextContent.Provider value={{text: text}}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <div style={{backgroundColor: "black", color: "#4AF626", display: "flex", flexDirection: "column", padding: 20}}>
                <FirstLine/>
            </div>
        </TextContent.Provider>
    )
}

export default App