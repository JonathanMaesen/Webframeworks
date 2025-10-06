// @ts-ignore
import "./App.css";
import { useState } from "react";
import type { ShoppingList, TableItem } from "./interfaces";
import { Table } from "./components/Table/Table";

type FormState = {
    name: string;
    quantity: string;
};

function App() {

    const [shoppingList, setShoppingList] = useState<ShoppingList>({
        shoppingListItem: [],
    });

    const [form, setForm] = useState<FormState>({
        name: "",
        quantity: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget; // use currentTarget
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addToShoppingList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const quantity = Number(form.quantity);
        if (!form.name.trim() || Number.isNaN(quantity) || quantity <= 0) return;

        const newItem: TableItem = { name: form.name.trim(), quantity: quantity };

        setShoppingList((prev) => ({
            shoppingListItem: [...prev.shoppingListItem, newItem],
        }));

        setForm({ name: "", quantity: "" });
    };

    const removeAt = (index: number) => {
        setShoppingList((prev) => ({
            shoppingListItem: prev.shoppingListItem.filter((_, i) => i !== index),
        }));
    };

    return (
        <>
            <form onSubmit={addToShoppingList}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"                 // <-- important
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="quantity">Quantity:</label>
                <input
                    id="quantity"
                    name="quantity"           // <-- important
                    type="number"
                    min={1}
                    step={1}
                    value={form.quantity}
                    onChange={handleChange}
                    required
                />

                <button type="submit">add</button>
            </form>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    </thead>
                    <Table
                        items={shoppingList.shoppingListItem}
                        onRemove={removeAt}
                    />
                </table>
            </div>
        </>
    );
}

export default App;
