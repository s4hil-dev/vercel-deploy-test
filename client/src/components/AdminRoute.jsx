// components/AdminRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);

  if (user?.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;