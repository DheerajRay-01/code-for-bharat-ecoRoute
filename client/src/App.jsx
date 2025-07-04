import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import Direction from "./components/pages/Direction";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import { Navigate } from "react-router";
import PublicRoutes from "./components/Routes.jsx/PublicRoutes";
import ProtectedRoute from "./components/Routes.jsx/ProtectedRoute";
import { useSelector } from "react-redux";
import History from "./components/pages/History";
import Co2_history from "./components/pages/Co2_history";


function App() {

  const user = useSelector(state => state.user.user)
  console.log(user);
  
  const isAuthenticated = user ? true : false;
  // const isAuthenticated = false;

  return (
 <Routes>
      <Route path="/" element={<Layout />}>
        {/* ✅ Public Routes */}
        <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* ✅ Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route index element={<HomePage />} /> 
          <Route path="/direction" element={<Direction />} />
          <Route path="/history" element={<History/>} />
          <Route path="/co2-history" element={<Co2_history />} />
        </Route>
      </Route>

      {/* 🌟 Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}

export default App;
