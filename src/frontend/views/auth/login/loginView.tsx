import Header from "../../../components/header";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
interface LoginFormData {
  username: string;
  password: string;
}

const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [error, setError] = useState("");
  let nav = useNavigate();

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    console.log("Sending login request with data:", data);

    fetch(`${apiUrl}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data.token) {
          localStorage.setItem("Token", data.token);
          localStorage.setItem("id", data.id);
          console.log(localStorage);
          nav("/list");
        } else {
          setError("Wrong username or password, try again.");
        }
      })
      .catch((error) => {
        console.error("Error, please try again later.", error);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <Header />
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: 400,
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Login
          </Typography>

          <form onSubmit={handleSubmit(handleLogin)}>
            <TextField
              data-testid="username-input"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              data-testid="password-input"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                data-testid="login-button"
              >
                Login
              </Button>
            </Box>
          </form>

          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="text">Register</Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginView;
