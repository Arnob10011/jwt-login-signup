import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const router = useNavigate();

  async function handleSignUP(e) {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      console.log(email, password);

      const { data } = await axios.post(
        "http://localhost:5000/api/signup",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status) {
        router("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUP}>
        <input
          autoComplete="off"
          name="email"
          type="text"
          placeholder="sign up"
        />
        <input
          autoComplete="off"
          name="password"
          type="text"
          placeholder="password"
        />
        <button type="submit">sign up </button>
      </form>
    </div>
  );
}
