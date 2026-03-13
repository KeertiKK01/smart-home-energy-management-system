import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

let user = null;

try {
user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
user = null;
}

if (!user || !user.id) {
return <Navigate to="/login" replace />;
}

return children;

};

export default ProtectedRoute;