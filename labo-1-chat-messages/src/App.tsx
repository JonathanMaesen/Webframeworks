import './App.css'

import type { ChatMessage } from './data.ts'
import { messages } from "./data.ts"

const data : ChatMessage[] = messages

function App() {
    console.log(messages)
  return (
    <>
        <div>
            <table border={1}>
                <thead>
                <tr>
                    <th>From</th>
                    <th>Content</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((msg, index) => (
                        <tr key={index}>
                            <td>{msg.from}</td>
                            <td>{msg.content}</td>
                            <td>{msg.date}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default App
