import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";

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
    if (!token) {
      navigate("/login");
      return;
    }

    if (uid) {
      fetch(`https://dummyjson.com/users/${uid}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.log(error));
    }
  }, [navigate, uid]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
            <Box
              sx={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={userData?.image || "https://via.placeholder.com/150"}
                alt="Profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", color: "#555", marginBottom: 1 }}
            >
              Username
            </Typography>
            <Typography variant="h6" sx={{ paddingBottom: 2 }}>
              {userData?.username}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", color: "#555", marginBottom: 1 }}
            >
              Email
            </Typography>
            <Typography variant="h6" sx={{ paddingBottom: 2 }}>
              {userData?.email}
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
