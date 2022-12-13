import { Box, Button, TextField, Typography } from "@mui/material";
import { Image } from "phosphor-react";
import { Link } from "react-router-dom";
const Register = () => {
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
      >
        <TextField type="text" placeholder="display name" />
        <TextField type="email" placeholder="email" />
        <TextField type="password" placeholder="password" />
        <TextField sx={{ display: "none" }} type="file" id="file" />
        <label
          htmlFor="file"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Image size={40} />
          <span>Add an avatar</span>
        </label>
        <Button variant="contained">Sign Up</Button>
      </form>
      <Typography>
        You do have an account?
        <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
