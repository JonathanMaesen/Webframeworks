import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/quiz/easy">Easy</NavLink>
                </li>
                <li>
                    <NavLink to="/quiz/medium">Medium</NavLink>
                </li>
                <li>
                    <NavLink to="/quiz/hard">Hard</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
