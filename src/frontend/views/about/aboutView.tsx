import Header from "../../components/header";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Button,
} from "@mui/material";

import image from "../../assets/image2.png";

import { useEffect } from "react";

const AboutView = () => {
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    document.body.style.scrollbarWidth = "none";

    const style = document.createElement("style");
    style.innerHTML = "::-webkit-scrollbar { display: none; }";
    document.head.appendChild(style);

    return () => {
      document.body.style.overflowY = "auto";
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          flexGrow: 1,
        }}
      >
        <Typography variant="h1" component="h1" sx={{ marginBottom: "1rem" }}>
          About Todos
        </Typography>
        <Typography variant="h6" component="p" sx={{ marginBottom: "2rem" }}>
          Todos is a simple and intuitive task management app designed to help
          you stay organized and productive. Add, track, and complete tasks with
          ease.
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ paddingTop: "30px" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: "400px" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Easy to Use
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add tasks with a single click and track your progress easily.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: "400px" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Organizing.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Organize your tasks for a much easier workflow.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Card sx={{ maxWidth: "400px" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Productivity.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be more productive by storing everything in Todos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            width: "100%",
          }}
        >
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                backgroundColor: "#6c63ff",
                "&:hover": {
                  backgroundColor: "#5a54e0",
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
        </Box>
      </Container>

      <Box
        component="img"
        src={image}
        alt="Background"
        sx={{
          width: "100%",
          height: "auto",
          position: "absolute",
          top: "80px",
          left: 0,
          zIndex: -1,
          filter: "blur(2px) opacity(0.5)",
        }}
      />
    </Box>
  );
};

export default AboutView;
