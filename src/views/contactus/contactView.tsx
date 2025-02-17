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
      <Box className="half-background" />
      <div className="wrapper">
        <div className="contact-title-container">
          <Typography variant="h1" className="contact-title">
            Contact Us
          </Typography>
          <Typography variant="h5" className="contact-subtitle">
            We’d love to hear from you!
          </Typography>
        </div>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit(SubmitForm)}>
            <div className="name-email-container">
              <TextField
                data-testid="name"
                fullWidth
                label="Name"
                variant="standard"
                className="contact-field"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z ]+$/,
                    message: "Invalid name format",
                  },
                })}
                error={!!errors?.name}
                helperText={errors?.name?.message || "Type your name here"}
              />
              <TextField
                data-testid="email"
                fullWidth
                label="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                variant="standard"
                className="contact-field"
                error={!!errors?.email}
                helperText={errors?.email?.message || "Type your email here"}
              />
            </div>

            <TextField
              data-testid="message"
              fullWidth
              label="Message"
              multiline
              rows={4}
              variant="standard"
              className="contact-field"
              {...register("message", {
                required: "Message is required",
              })}
              error={!!errors?.message}
              helperText={errors?.message?.message || "Type your message here"}
            />

            <Button
              data-testid="submit"
              variant="contained"
              color="primary"
              className="contact-button"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactView;
