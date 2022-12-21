import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", result.user.uid), { isOnline: true });
      setEmail("");
      setPassword("");

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
        width: "80%",
        minHeight: "1000px",
      }}
    >
      <Typography>Login</Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "1rem",
        }}
        onSubmit={handleLoginUser}
      >
        <TextField
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button variant="contained" type="submit">
          {loading ? "Loading.." : "Sign In"}
        </Button>
      </form>
      <Typography>
        You do have an account?{" "}
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#0162C4" }}
        >
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
