import { Link } from "react-router-dom";
import { IconButton, Button } from "@mui/material/";
import PersonIcon from "@mui/icons-material/Person";

const Login = () => {
  const isLoggedIn = localStorage.getItem("Token");
  const userId = localStorage.getItem("id");
  return isLoggedIn ? (
    <div className="right">
      <Link to={`/users/${userId}`} replace data-testid="profile-link">
        <IconButton className="profile-button">
          <PersonIcon className="profile-icon" />
        </IconButton>
      </Link>
    </div>
  ) : (
    <div className="right">
      <Link to="/login" data-testid="login-link">
        <Button className="profile-button">Login</Button>
      </Link>
    </div>
  );
};

export default Login;
