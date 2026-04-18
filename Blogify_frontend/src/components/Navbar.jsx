import { useNavigate } from "react-router-dom";

function Navbar({ dark, setDark }) {

  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div style={styles.navbar}>

      {/* LOGO */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>📝</span>
        <span style={styles.logoText}>Blogify</span>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <button style={styles.homeBtn} onClick={() => nav("/home")}>
          Home
        </button>

        <button style={styles.toggleBtn} onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#111",
    color: "white"
  },

  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "bold"
  },

  logoIcon: {
    fontSize: "26px",
    marginRight: "10px"
  },

  logoText: {
    letterSpacing: "1px"
  },

  homeBtn: {
    marginRight: "10px",
    padding: "8px 15px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  toggleBtn: {
    marginRight: "10px",
    padding: "8px 12px",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  logoutBtn: {
    padding: "8px 15px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;