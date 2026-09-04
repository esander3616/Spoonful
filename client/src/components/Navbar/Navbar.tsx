import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

export function Navbar() {
    const{ user, logout } = useUser();
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/ai">SpoonBot</Link>
            {user ? (<>
                <Link to="/dashboard">Dashboard</Link>
                <span>Welcome to Spoonful!</span>
                <button onClick={logout}>Logout</button>
            </>) : (<>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </>)
            }
        </nav>
    );
}