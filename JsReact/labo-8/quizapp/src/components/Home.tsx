import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Choose a Difficulty</h1>
            <ul>
                <li>
                    <Link to="/quiz/easy">Easy</Link>
                </li>
                <li>
                    <Link to="/quiz/medium">Medium</Link>
                </li>
                <li>
                    <Link to="/quiz/hard">Hard</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
