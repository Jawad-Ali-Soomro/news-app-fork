import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NotFoundPage from "../../pages/Error/NotFoundPage";
const ProtectedByAdmin = () => {
  const user = useSelector((state) => state.auth.user);
  return user?.role === "ADMIN" ? <Outlet /> : <NotFoundPage />;
};

export default ProtectedByAdmin;
