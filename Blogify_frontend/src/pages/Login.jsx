import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({});
  const nav = useNavigate();

  const login = () => {
    axios.post("http://localhost:8080/api/login", form)
      .then(res => {
        localStorage.setItem("userId", res.data.id);
        nav("/home");
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          style={styles.input}
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <p style={styles.text}>
          New user? <Link to="/register">Register</Link>
        </p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000"
  },
  card: {
    background: "#1e1e1e",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px",
    color: "white",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#2c2c2c",
    color: "white"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  text: {
    marginTop: "15px",
    color: "#ccc"
  }
};

export default Login;