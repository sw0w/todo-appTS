import Header from "../../components/header";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../../assets/image.png";
import { useEffect, useState } from "react";

const HomeView = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error fetching data:", err));

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <>
      <Header />

      <Box
        component="img"
        src={image}
        alt="Background"
        sx={{
          width: "100%",
          height: "auto",
          maxWidth: "80%",
          maxHeight: "80%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "blur(1.5px) drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.15))",
          position: "absolute",
          zIndex: -1,
          left: "5%",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "left",
          maxWidth: "40%",
          width: "80%",
          padding: { xs: "20px", md: "30px" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#222",
          }}
        >
          Todos, a simple Todo app
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#555",
            marginBottom: "20px",
          }}
        >
          {message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "12px",
          }}
        >
          <Link to="/list">
            <Button
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Get Started
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant="outlined"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Learn More
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default HomeView;
