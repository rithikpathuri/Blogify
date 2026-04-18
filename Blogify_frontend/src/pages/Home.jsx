import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [dark, setDark] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    axios.get("http://localhost:8080/api/posts")
      .then(res => setPosts(res.data));
  };

  const addPost = () => {
    axios.post("http://localhost:8080/api/posts", {
      ...form,
      userId
    }).then(() => {
      setForm({});
      loadPosts();
    });
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:8080/api/posts/${id}`)
      .then(() => loadPosts());
  };

  const editPost = (p) => {
    setForm(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleComments = (id) => {
    if (showComments[id]) {
      setShowComments({ ...showComments, [id]: false });
    } else {
      axios.get(`http://localhost:8080/api/comments/${id}`)
        .then(res => {
          setComments({ ...comments, [id]: res.data });
          setShowComments({ ...showComments, [id]: true });
        });
    }
  };

  const addComment = (id, text) => {
    axios.post("http://localhost:8080/api/comments", {
      content: text,
      postId: id,
      userId
    }).then(() => toggleComments(id));
  };

  const likePost = (id) => {
    if (liked[id]) {
      setLikes({ ...likes, [id]: (likes[id] || 1) - 1 });
      setLiked({ ...liked, [id]: false });
    } else {
      setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
      setLiked({ ...liked, [id]: true });
    }
  };

  const card = {
    background: dark ? "#1e1e1e" : "white",
    color: dark ? "white" : "black",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: dark ? "#2c2c2c" : "white",
    color: dark ? "white" : "black"
  };

  const btn = {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={{ background: dark ? "#121212" : "#eef2f7", minHeight: "100vh" }}>

      <Navbar dark={dark} setDark={setDark} />

      <div style={{ padding: "20px" }}>

        {/* CREATE BLOG */}
        <div style={card}>
          <h2 style={{ color: dark ? "white" : "#222" }}>
            Create Blog
          </h2>

          <input style={input} placeholder="Title"
            value={form.title || ""}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <textarea style={input} placeholder="Content"
            value={form.content || ""}
            onChange={e => setForm({ ...form, content: e.target.value })}
          />

          <input style={input} placeholder="Category"
            value={form.category || ""}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />

          <button
            style={{ ...btn, background: "#4facfe", color: "white", marginTop: "10px" }}
            onClick={addPost}>
            Post 🚀
          </button>
        </div>

        {/* POSTS */}
        <h2 style={{ color: dark ? "white" : "#222" }}>All Blogs</h2>

        {posts.map(p => (
          <div key={p.id} style={card}>

            <h3>{p.title}</h3>
            <p>{p.content}</p>
            <small>{p.category}</small>

            <br /><br />

            {/* BUTTON GROUP */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

              {/* LIKE BUTTON */}
              <button style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "transparent",
                cursor: "pointer",
                color: dark ? "white" : "black"
              }}
                onClick={() => likePost(p.id)}>

                <span style={{
                  color: liked[p.id] ? "red" : "gray",
                  fontSize: "18px"
                }}>
                  ❤️
                </span>

                <span style={{ marginLeft: "5px" }}>
                  {likes[p.id] || 0}
                </span>
              </button>

              {/* EDIT */}
              <button style={{ ...btn, background: "#1e90ff", color: "white" }}
                onClick={() => editPost(p)}>
                Edit
              </button>

              {/* DELETE */}
              <button style={{ ...btn, background: "#e74c3c", color: "white" }}
                onClick={() => deletePost(p.id)}>
                Delete
              </button>

              {/* COMMENTS */}
              <button style={{ ...btn, background: "#888", color: "white" }}
                onClick={() => toggleComments(p.id)}>
                {showComments[p.id] ? "Close ❌" : "Comments 💬"}
              </button>

            </div>

            {/* COMMENTS SECTION */}
            {showComments[p.id] && (
              <div style={{ marginTop: "10px" }}>
                {(comments[p.id] || []).map(c => (
                  <p key={c.id} style={{
                    background: dark ? "#2c2c2c" : "#f1f1f1",
                    padding: "8px",
                    borderRadius: "6px"
                  }}>
                    👤 <b>{c.userName}</b>: {c.content}
                  </p>
                ))}

                <input
                  style={input}
                  placeholder="Add comment"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      addComment(p.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;