function App() {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user)
  const [user, setUser] = useState(userData)
  const [loading, setLoading] = useState(true) // 👈 loading flag

  const isAuthenticated = !!user

  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/user/get-user')
      const currentUser = res.data.data
      console.log(currentUser)
      dispatch(addUser(currentUser))
      setUser(currentUser)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false) // 👈 done loading
    }
  }

  useEffect(() => {
    if (!userData) {
      getUser()
    } else {
      setUser(userData)
      setLoading(false) // 👈 already in redux
    }
  }, [userData])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-500 animate-pulse">Checking session...</h1>
      </div>
    )
  }

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
          <Route path="/history" element={<History />} />
          <Route path="/analysis" element={<CO2_Analytic />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Route>

      {/* 🌟 Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
