import { Stack, Typography, Link } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Image } from "phosphor-react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthSocial from "../../components/auth/AuthSocial";
import RegisterForm from "../../components/auth/RegisterForm";
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
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get started with Chat Application.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>
      {/* Form */}
      <RegisterForm />

      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>

      <AuthSocial />
    </>
  );
};

export default Register;
