
function AlertBox(event: string, {position} : {position: number}) {
    alert(`${event} position ${position}`)
}
function TextInput(position: {position: number}) {
    return(
        <input type="text" onInput={(event) => AlertBox(event.currentTarget.value, position)}/>
    )
}

export default TextInput