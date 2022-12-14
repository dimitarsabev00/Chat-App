import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Login = () => {
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
      >
        <TextField type="email" placeholder="email" />
        <TextField type="password" placeholder="password" />

        <Button variant="contained">Sign In</Button>
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
