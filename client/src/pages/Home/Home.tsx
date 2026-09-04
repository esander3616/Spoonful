import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

function Home() {
  const { user } = useUser();

  return (
    <div className="home-hero">
      <h1>🥄 Spoonful</h1>
      <p className="home-tagline">
        Find your next favorite recipe, or share one of your own.
      </p>
      <div className="home-cta">
        <Link to="/recipes" className="btn btn-primary">
          Explore Recipes
        </Link>
        {user ? (
          <Link to="/dashboard" className="btn btn-secondary">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;