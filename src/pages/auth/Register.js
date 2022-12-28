import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Image } from "phosphor-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebaseConfig";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imageRef = ref(storage, `avatars/${displayName}`);
      uploadBytes(imageRef, file).then(() => {
        getDownloadURL(imageRef).then(async (photoURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL,
            createdAt: serverTimestamp(),
            isOnline: "true",
          });
          await setDoc(doc(db, "userChats", res.user.uid), {});
        });
        setEmail("");
        setPassword("");
        setDisplayName("");
        setLoading(false);
      });
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
      <Typography>Register</Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          placeholder="display name"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
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
        <TextField
          sx={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <InputLabel
          htmlFor="file"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Image size={40} />
          <Box>Add an avatar</Box>
        </InputLabel>
        <Button variant="contained" type="submit">
          {loading ? "Loading.." : "Sign Up"}
        </Button>
      </form>
      <Typography>
        You do have an account?{" "}
        <Link
          to="/auth/login"
          style={{ textDecoration: "none", color: "#0162C4" }}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
