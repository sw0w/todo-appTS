import Header from "../../components/header";
import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const SubmitForm: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(
        "https://dummyjson.com/c/7237-500e-488f-a50c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit. Try again later.");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />

      <Box
        style={{
          marginTop: "60px",
          textAlign: "center",
          maxWidth: "600px",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem", color: "#333" }}
        >
          Contact us!
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "2rem", color: "#666" }}
        >
          Fill out the form down below, and we will reach out to you as soon as
          possible.
        </Typography>

        <form onSubmit={handleSubmit(SubmitForm)}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: "Invalid name format",
                },
              })}
              error={!!errors?.name}
              helperText={errors?.name?.message || "Type your name here"}
              sx={{
                borderRadius: "8px",
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email?.message || "Type your email here"}
              sx={{
                borderRadius: "8px",
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            {...register("message", {
              required: "Message is required",
            })}
            error={!!errors?.message}
            helperText={errors?.message?.message || "Type your message here"}
            sx={{
              borderRadius: "8px",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            data-testid="submit"
            type="submit"
            sx={{
              marginTop: "20px",
              padding: "10px 30px",
              borderRadius: "30px",
              backgroundColor: "#6c63ff",
              "&:hover": {
                backgroundColor: "#5a54e0",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ContactView;
