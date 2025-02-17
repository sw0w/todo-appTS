import Header from "../../components/header";
import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import "../css/contact.css";
import { useFormStatus } from "react-dom";

const ContactView = () => {
  const [errors, setErrors] = useState({});
  const { pending, data, error } = useFormStatus();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleValidation(name, value);
    if (name === "message") {
      setText(e.target.value);
    }
  };
  let validationErrors = { ...errors };
  // Field validation
  const handleValidation = (name, value) => {
    const isEmpty = (v) => v.trim() === "";
    const isTooShort = (v, minLength) => v.length < minLength;
    const isTooLong = (v, maxLength) => v.length > maxLength;
    const isValidEmail = (v) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);

    const containsUnsupportedCharacters = (v) => /[\d\s\W]/.test(v);

    // NAME
    if (name === "name") {
      if (isEmpty(value)) {
        validationErrors.name = "Name cannot be empty";
      } else if (isTooShort(value, 3)) {
        validationErrors.name = "Name cannot be shorter than 3 letters";
      } else if (containsUnsupportedCharacters(value)) {
        validationErrors.name = "Only letters are allowed";
      } else {
        delete validationErrors.name;
      }
    }
    // EMAIL
    if (name === "email") {
      if (isEmpty(value)) {
        validationErrors.email = "Email cannot be empty";
      } else if (!isValidEmail(value)) {
        validationErrors.email = "Email is not valid";
      } else {
        delete validationErrors.email;
      }
    }

    // MESSAGE
    if (name === "message") {
      if (isTooLong(value, 3000)) {
        validationErrors.message = "message cannot be over 3000 characters.";
      } else {
        delete validationErrors.message;
      }
    }

    setErrors(validationErrors);
  };

  const [Cooldown, setCooldown] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    if (Cooldown) {
      console.log("Please wait before submitting again.");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      console.log("Errors:", errors);
      return;
    }
    const form = event.target;
    const data = new FormData(form);
    const formObject = Object.fromEntries(data.entries());
    const hasEmptyForms = Object.values(formObject).some((value) => !value);

    if (hasEmptyForms) {
      if (!formObject.name) {
        validationErrors.name = "Required";
        setErrors(validationErrors);
      }
      if (!formObject.email) {
        validationErrors.email = "Required";
        setErrors(validationErrors);
      }
      if (!formObject.message) {
        validationErrors.message = "Required";
        setErrors(validationErrors);
      }
      return;
    }

    try {
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, 5000);

      const response = await fetch(
        "https://dummyjson.com/c/7237-500e-488f-a50c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formObject),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit. Try again later.");
      }
      console.log("Form submitted with data:", formObject);
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
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
          <form
            className="contact-form"
            onSubmit={(formData) => {
              if (!pending) {
                submitForm(formData);
              }
            }}
          >
            <div className="name-email-container">
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="standard"
                className="contact-field"
                onChange={handleChange}
                error={!!errors?.name}
                helperText={errors?.name || "Type your name"}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="standard"
                className="contact-field"
                onChange={handleChange}
                error={!!errors?.email}
                helperText={errors?.email || "Type your email"}
              />
            </div>

            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="standard"
              className="contact-field"
              onChange={handleChange}
              error={!!errors?.message}
              helperText={errors?.message || `${text.length}/3000`}
            />

            <Button
              variant="contained"
              color="primary"
              className="contact-button"
              type="submit"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactView;
