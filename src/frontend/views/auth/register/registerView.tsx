import Header from "../../../components/header";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();
  const [error, setError] = useState("");
  let nav = useNavigate();

  const handleRegister: SubmitHandler<RegisterFormData> = (data) => {
    console.log("Sending registration request...");

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("Token", data.token);
          console.log("User ID:", data.userId);
          nav("/list");
        } else {
          setError(data.message || "Registration failed, please try again.");
        }
      })
      .catch((error) => {
        console.error("Error, please try again later.", error.message);
        setError("Error registering user. Please try again later.");
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
            Register
          </Typography>

          <form onSubmit={handleSubmit(handleRegister)}>
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

            <TextField
              data-testid="confirm-password-input"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                data-testid="register-button"
              >
                Register
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
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="text">Login</Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterView;
