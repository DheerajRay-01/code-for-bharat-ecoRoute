import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import Direction from "./components/pages/Direction";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import { Navigate } from "react-router";
import PublicRoutes from "./components/Routes/PublicRoutes";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import History from "./components/pages/History";
import { useEffect } from "react";
import axiosInstance from './components/utils/axios.js'
import { addUser } from "./redux/userSlice";
import { useState } from "react";
import Logout from "./components/Logout.jsx";
import CO2_Analytic from "./components/pages/CO2_Analytic.jsx";



function App() {

 const dispatch = useDispatch()

  const userData = useSelector(state => state.user.user) // ✅ top level
  const [user, setUser] = useState(userData)
  const isAuthenticated = user ? true : false

  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/user/get-user')
      const currentUser = res.data.data
      console.log(currentUser)
      dispatch(addUser(currentUser)) // ✅ save in redux
      setUser(currentUser)           // ✅ save in local state
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!userData) {
      getUser()
    } else {
      setUser(userData)
    }
  }, [userData]) // ✅ react to redux changes



  return (
 <Routes>
      <Route path="/" element={<Layout />}>
        {/* ✅ Public Routes */}
        <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          

          //TODO: change in production
          {/* <Route index element={<HomePage />} /> 
          <Route path="/direction" element={<Direction />} /> */}


        </Route>

        {/* ✅ Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route index element={<HomePage />} /> 
          <Route path="/direction" element={<Direction />} />
          <Route path="/history" element={<History/>} />
          <Route path="/analysis" element={<CO2_Analytic />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Route>

      {/* 🌟 Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}

export default App;
