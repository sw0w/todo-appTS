import Header from "../../components/header";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../../assets/image.png";

const HomeView = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Header />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            maxWidth: "730px",
            padding: "40px 20px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#222" }}>
            Todos, a simple Todo app
          </Typography>

          <Typography variant="h6" sx={{ color: "#555" }}>
            Organize your tasks.
          </Typography>

          <Box
            component="img"
            src={image}
            alt="Background"
            sx={{
              width: "100%",
              maxWidth: "400px",
              objectFit: "contain",
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <Link to="/list">
              <Button variant="contained">Get Started</Button>
            </Link>
            <Link to="/about">
              <Button variant="outlined">Learn More</Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeView;
