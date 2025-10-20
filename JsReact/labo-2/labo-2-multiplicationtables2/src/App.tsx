import './App.css';
import MultiplicationTable from './components/MultiplicationTable/MultiplicationTable';

function App() {
    return (
        <>
            <MultiplicationTable rows={20} cells={5} />
        </>
    );
}

export default App;
