import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ProtectedByUser = () => {
  const isAuthorized = useSelector((state) => state.auth.status);
  return isAuthorized === true ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

export default ProtectedByUser;
