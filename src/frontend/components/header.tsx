import Box from "@mui/material/Box";
import { Button } from "@mui/material/";
import { Link, useLocation } from "react-router-dom";
import Login from "../views/auth/login/login";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("Token");

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        zIndex: 9999,
        backgroundColor: "#fbfcf7",
        borderRadius: "25px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        className="button-container1"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          className="left"
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Link to="/" data-testid="home-link">
            <Button
              variant="text"
              sx={{
                color: location.pathname === "/" ? "#000" : "#555",
                fontWeight: location.pathname === "/" ? "bold" : "normal",
                textDecoration: "none",
              }}
            >
              Home
            </Button>
          </Link>
          {isLoggedIn && (
            <Link to="/list">
              <Button
                variant="text"
                sx={{
                  color: location.pathname === "/list" ? "#000" : "#555",
                  fontWeight: location.pathname === "/list" ? "bold" : "normal",
                  textDecoration: "none",
                }}
              >
                List
              </Button>
            </Link>
          )}

          <Link to="/about" data-testid="about-link">
            <Button
              variant="text"
              sx={{
                color: location.pathname === "/about" ? "#000" : "#555",
                fontWeight: location.pathname === "/about" ? "bold" : "normal",
                textDecoration: "none",
              }}
            >
              About
            </Button>
          </Link>
        </Box>
        <Login />
      </Box>
    </Box>
  );
};

export default Header;
