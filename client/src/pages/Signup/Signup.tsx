import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../utils/userService";

type SignupPageProps = {
  handleSignUpOrLogin: () => void;
};

export default function SignupPage({ handleSignUpOrLogin }: SignupPageProps) {
  const [error, setError] = useState("");
  const [state, setState] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await userService.signup(state);
      handleSignUpOrLogin();
      navigate("/profile");
    } catch {
      setError("Could not sign up — that email may already be in use");
    }
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}