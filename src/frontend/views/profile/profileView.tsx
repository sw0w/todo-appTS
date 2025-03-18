import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
const apiUrl = import.meta.env.VITE_API_URL;
const ProfileView = () => {
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

  const { uid } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log("Token retrieved from localStorage:", token);

    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    if (uid) {
      console.log(`Fetching data for user ID: ${uid}`);

      fetch(`${apiUrl}/users/${uid}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User data received:", data);
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [navigate, uid]);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    navigate("/login");
  };

  if (userData === null) {
    console.log("Loading user data...");
    return <div>Loading...</div>;
  }

  console.log("User data in state:", userData);

  if (uid === localStorage.getItem("id")) {
    return (
      <div>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              width: 300,
              padding: "50px",
              borderRadius: 2,
              backgroundColor: "white",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              textAlign: "left",
              position: "relative",
              paddingTop: "60px",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", color: "#555", marginBottom: 1 }}
            >
              Username
            </Typography>
            <Typography variant="h6" sx={{ paddingBottom: 2 }}>
              {userData.username || "No username found"}{" "}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", color: "#555", marginBottom: 1 }}
            >
              Userid
            </Typography>
            <Typography variant="h6" sx={{ paddingBottom: 2 }}>
              {userData._id || "No username found"}{" "}
            </Typography>

            <Button
              data-testid="logout"
              variant="outlined"
              onClick={handleLogout}
              sx={{ marginTop: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </div>
    );
  } else {
    console.log("Permission denied: Accessing someone else's profile.");
    return (
      <div>
        <Header />
        <Box
          sx={{
            opacity: 1,
            position: "absolute",
            top: "-300px",
            left: "-50px",
            width: "2000px",
            height: "100%",
            transform: "rotate(10deg)",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgb(232, 231, 231)",
            zIndex: -2,
          }}
        />
        <Typography variant="body2" sx={{ padding: 2 }}>
          Permission denied
        </Typography>
      </div>
    );
  }
};

export default ProfileView;
