import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // username:test123
  // email:test@email.com
  // password:123456

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Minimum 6 characters required");
    } else if (password !== cPassword) {
      setError("Passwords do not match ");
      return;
    } else {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
      setSuccess("New account created!");
      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setError("");
    }
  };

  return (
    <div className="register-container">
      <h2>Create New Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            id="cPassword"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <Link to="/Account">
          <button type="submit">Back</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
