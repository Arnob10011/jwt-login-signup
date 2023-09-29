import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Login() {
  const router = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data } = await axios.post(
      "http://localhost:5000/api/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    if (data.status == true) {
      const res = await axios.get("http://localhost:5000/api/verify-login", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.status) {
        router(`/home`);
      }
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <input
          autoComplete="off"
          name="email"
          type="text"
          placeholder="log in"
        />
        <input
          autoComplete="off"
          name="password"
          type="text"
          placeholder="password"
        />
        <button type="submit">log in </button>
      </form>
    </div>
  );
}
