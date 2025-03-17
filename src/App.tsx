import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./frontend/components/PrivateRoute";
import HomeView from "./frontend/views/home/homeView";
import AboutView from "./frontend/views/about/aboutView";
import ListView from "./frontend/views/list/listView";
import ContactView from "./frontend/views/contactus/contactView";
import LoginView from "./frontend/views/auth/login/loginView";
import ProfileView from "./frontend/views/profile/profileView";
import RegisterView from "./frontend/views/auth/register/registerView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <ListView />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/users/:uid" element={<ProfileView />} />
      </Routes>
    </Router>
  );
}

export default App;
