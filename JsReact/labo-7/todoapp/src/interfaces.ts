export type TodoItemProps = {
    message: string;
    completed: boolean;
    onToggle: (checked: boolean) => void;
};

export type Todo = {
    name: string;
    completed: boolean;
};