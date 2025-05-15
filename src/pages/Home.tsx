import { useNavigate } from "react-router-dom";
import { dologout } from "../firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/authcontext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser: user, userdata, getdata } = useContext(AuthContext);

  const handleLogout = async () => {
    await dologout();
    navigate("/login");
  };

  useEffect(() => {
    getdata();
  }, []);

  console.log("userdata", userdata);

  return (
    <>
      <div className="home-container">
        <h1>Welcome to Home Page</h1>
        <p>You are successfully logged in!</p>
        <p>Welcome {user?.email}</p>
        {/* <p>hello {userdata.name}</p> */}
        <button onClick={handleLogout} className="auth-button">
          Logout
        </button>
        <button onClick={() => navigate("/form")}>Open Form</button>
      </div>
    </>
  );
};
export default Home;
