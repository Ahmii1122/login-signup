import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dosigninwithemailandpassword,
  dosigninwithgoogle,
} from "../firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dosigninwithemailandpassword({
      email: email,
      password: password,
      name: "",
    });
    console.log(result);
    navigate("/home");
  };

  const handleGoogleLogin = async () => {
    await dosigninwithgoogle().catch((error) => {
      console.log(error);
    });
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
        <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <p>
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
