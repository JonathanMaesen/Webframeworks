import './App.css'

interface StudentList{
    id: number,
    name: string,
    age: number
}

function App() {
    const numberArray:number[] = [1,2,3,4,5,6,6,7];
    const studentArray:StudentList[] = [
        {
            id: 0,
            name: "John",
            age: 23
        },
        {
            id: 1,
            name: "Sara",
            age: 33
        },
        {
            id: 2,
            name: "Billy",
            age: 55
        },
        {
            id: 3,
            name: "Jessica",
            age: 25
        },
        {
            id: 4,
            name: "Janneke",
            age: 59
        }
    ]
  return (
      <>
          <h1>Labo 1: Lijsten</h1>
          <div id="OL">
              <h2>Getallenlijst</h2>
              <ul>
                  {numberArray.map((value, index) => (
                      <li key={index}>{value}</li>
                  ))}
              </ul>
          </div>

          <div id="Studenten">
              <h2>StudentLijst</h2>
              <ol>
                  {
                      studentArray.map((value) => (<li key={value.id}>{value.name}</li>))
                  }
              </ol>
          </div>

          <div id="studentsWithJ">
              <h2>StudentLijst Met J</h2>
              <ol>
                  {
                      studentArray
                      .filter(student => student.name.startsWith("J"))
                      .map(student => (<li key={student.id}>{student.name}</li>))
                  }
              </ol>
          </div>

          <div id="DropdownList">
              <h2>Select Lijst</h2>
              <label htmlFor="StudentSelector">Select</label>
              <select name="Select" id="">
                  {studentArray.map((student) => (<option value={student.id} key={student.id}>{student.name}</option>))}
              </select>
          </div>

          <div id="Table">
              <h1>Table</h1>
              <table>
                  <thead>
                  <tr>
                      <th>Naam</th>
                      <th>Leeftijd</th>
                  </tr>
                  </thead>
                  <tbody>
                  {studentArray.map((student) => (
                      <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.age}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </>
  )
}

export default App
