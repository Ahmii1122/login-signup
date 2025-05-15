import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { docreateUserWithEmailAndPassword } from "../firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await docreateUserWithEmailAndPassword({ name, email, password });
      navigate("/home");
    } catch (error: any) {
      alert(error.message || "Failed to sign up. Please try again.");
    }

    // navigate("/home");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
