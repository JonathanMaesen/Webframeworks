import {useState} from "react";
import type {TodoItemProps} from "../../interfaces.ts";

export function TodoItem({message, completed, ontoggle} : TodoItemProps) {
    return(
        <>
            <div>
                <input type="checkbox" checked={completed} onChange={(e) => ontoggle(e.target.checked)}/>
                <span style={{textDecoration: completed ? "line-through" : "none"}}>{message}</span>
            </div>
        </>
    )
}