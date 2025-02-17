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

const AboutView = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
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
        zIndex: -1,
      }}
    />
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1" component="h1" sx={{ marginBottom: "1rem" }}>
        About Todos
      </Typography>
      <Typography variant="h6" component="p" sx={{ marginBottom: "2rem" }}>
        Todos is a simple and intuitive task management app designed to help you
        stay organized and productive. Add, track, and complete tasks with ease.
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
    </Container>
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        padding: "1rem",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgb(232, 231, 231)",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Link to="/contact">
          <Button>Contact Us</Button>
        </Link>
        <Typography component="p" sx={{ margin: "5px" }}>
          Email: todos@todos.com
        </Typography>
        <Typography component="p" sx={{ margin: "5px" }}>
          Phone: +358123456789
        </Typography>
      </Box>
    </Box>
    <Box
      component="img"
      src="/assets/image2.png"
      alt="Background"
      sx={{
        width: "100%",
        height: "auto",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    />
  </Box>
);

export default AboutView;
