import {useState} from "react";
import type {Todo} from "../../interfaces.ts";
import {TodoItem} from "./TodoItem.tsx";


export function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    const addTodo = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) => [...prev, { name: trimmed, completed: false }]);
        setNewTodo("");
    };

    const markCompleted = (index: number, completed: boolean) => {
        setTodos((prev) =>
            prev.map((todo, i) => (i === index ? { ...todo, completed } : todo))
        );
    };

    return (
        <>
            <div>
                <div>
                    <input
                        id="todo"
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo(newTodo)}
                        placeholder="Add a todo…"
                    />
                    <button onClick={() => addTodo(newTodo)}>Add</button>
                </div>

                <div>
                    {todos.map((todo, index) => (
                        <TodoItem
                            Key={index}
                            message={todo.name}
                            completed={todo.completed}
                            onToggle={(checked) => markCompleted(index, checked)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
