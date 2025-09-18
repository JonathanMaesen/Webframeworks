import type {ChatMessage} from "../../interfaces.ts";

interface ChatDump {
    ChatMessages: ChatMessage[]
}

const TextField = (props: ChatDump) => {
    return(
        <div>{props.ChatMessages.map((message) => <p key={message.id}>{message.content}</p>)}</div>
    )
}

export default TextField