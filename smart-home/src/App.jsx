import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/ResetPassword";

import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Devices from "./pages/Devices";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

return (

<BrowserRouter>

<Routes>

{/* Landing */}
<Route path="/" element={<LandingPage />} />

{/* Public */}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/otp" element={<Otp />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />

{/* Protected Layout */}
<Route
path="/dashboard/*"
element={
<ProtectedRoute>
<Home />
</ProtectedRoute>
}
>

<Route index element={<HomePage />} />

<Route path="overview" element={<Dashboard />} />

<Route path="profile" element={<Profile />} />

<Route path="device" element={<Devices />} />

</Route>

{/* Not found */}
<Route path="*" element={<h1>Page Not Found</h1>} />

</Routes>

</BrowserRouter>

);

}

export default App;