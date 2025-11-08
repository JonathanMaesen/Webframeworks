import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz/:difficulty" element={<Quiz />} />
            </Routes>
        </>
    );
}

export default App;
