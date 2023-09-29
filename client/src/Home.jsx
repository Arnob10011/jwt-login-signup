import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Home() {
  const router = useNavigate();
  const [user, setUser] = useState({
    email: "",
    id: "",
  });
  async function handleLogout() {
    const { data } = await axios.get("http://localhost:5000/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (data.status) {
      router("/login");
    }
  }

  useEffect(() => {
    async function verifyToken() {
      const { data } = await axios.get(
        "http://localhost:5000/api/verify-login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.status) {
        setUser({ email: data.info.email, id: data.info.id });
      }
    }

    verifyToken();
  }, []);

  if (user) {
    console.log(user);
  }

  return (
    <>
      <h1>Home page</h1>
      {user.email !== "" ? (
        <div>
          <h2> user Logged in</h2>
          <h2> welcome back {user.email}</h2>

          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <div>
          <div>This is a free page</div>
        </div>
      )}
    </>
  );
}
