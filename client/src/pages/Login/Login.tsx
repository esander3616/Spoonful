import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../utils/userService";

type LoginPageProps = {
  handleSignUpOrLogin: () => void;
};

export default function LoginPage({ handleSignUpOrLogin }: LoginPageProps) {
  const [error, setError] = useState("");
  const [state, setState] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await userService.login(state);
      handleSignUpOrLogin();
      navigate("/profile");
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="login-page">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}