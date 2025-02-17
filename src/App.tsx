import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomeView from "./views/home/homeView";
import AboutView from "./views/about/aboutView";
import ListView from "./views/list/listView";
import ContactView from "./views/contactus/contactView";
import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/login/loginView";
import FeedbackView from "./views/feedback/feedbackView";
import "./App.css";
import ProfileView from "./views/profile/profileView";

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
        <Route path="/contact" element={<ContactView />} />
        <Route path="/users/:uid" element={<ProfileView />} />
        <Route path="/feedback" element={<FeedbackView />} />
      </Routes>
    </Router>
  );
}

export default App;
