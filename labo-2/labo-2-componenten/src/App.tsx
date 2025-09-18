import './App.css'
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import TextField from "./components/TextField/TextField.tsx";
import { Messages } from "../Data/Data.ts";
import type {ChatMessage} from "./interfaces.ts";

const messages: ChatMessage[] = Messages

function App() {
  return (
    <>
        <Header/>
        <TextField ChatMessages={messages}/>
        <Footer/>
    </>
  )
}

export default App
