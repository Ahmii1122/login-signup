import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Home Page</h1>
      <p>You are successfully logged in!</p>
      <button onClick={handleLogout} className="auth-button">
        Logout
      </button>
    </div>
  );
};

export default Home;
