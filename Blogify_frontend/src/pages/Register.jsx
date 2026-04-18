import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [form, setForm] = useState({});
  const nav = useNavigate();

  const register = () => {
    axios.post("http://localhost:8080/api/register", form)
      .then(() => {
        alert("Registered successfully!");
        nav("/");
      });
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

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

        <button style={styles.button} onClick={register}>
          Register
        </button>

        <p style={styles.text}>
          Already have an account? <Link to="/">Login</Link>
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
    background: "linear-gradient(to right, #ffecd2, #fcb69f)"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ff7e5f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  text: {
    marginTop: "15px"
  }
};

export default Register;