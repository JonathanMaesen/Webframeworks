import React, { createContext, useState } from "react";

export const LineContext = createContext<any>(null);

export function LineProvider({ children }: { children: React.ReactNode }) {
    const [text, setText] = useState("Knock, Knock, Neo");
    return (
        <LineContext.Provider value={{ text, setText }}>
            {children}
        </LineContext.Provider>
    );
}
