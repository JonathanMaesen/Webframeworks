import './App.css';
import {useCallback, useState} from "react";
import * as React from "react";
import {students} from "./interfaces.ts";
function App() {
    let [searchField, setSearchField] = useState<string>("");

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value)
    }, []);

    function filterBySearch(list: any[], query: string) {
      if (!query.trim()) {
        return list;
      }

      const queryLower = query.toLowerCase();

      return list.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(queryLower)
        )
      );
    }


    return (
        <>
            <label htmlFor="Search">Search</label>
            <input type="text"
                   onChange={onInputChange}
            />
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Year</th>
                </tr>
                </thead>
                {filterBySearch(students, searchField).map((student) => (
                    <tr key={student.name}>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.year}</td>
                    </tr>
                ))}
            </table>
        </>
    );
}

export default App;
