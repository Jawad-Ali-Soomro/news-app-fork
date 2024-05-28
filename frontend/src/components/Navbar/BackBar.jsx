import { FaArrowLeft } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/UI/button";
import { logoutUser } from "../../api/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth.slice";
import { postRequest } from "../../api/apiServices";
const BackBar = ({ pageLabel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle page navigation to navigate previous page
  const handleNavigate = () => {
    navigate(-1);
  };

  const handleLogoutButton = async () => {
    const response = await postRequest("/api/v1/auth/logout", {});
    dispatch(logout());
    navigate("/auth/login");
  };
  return (
    <div className="w-full bg-gray-900 flex justify-between px-5 items-center h-12 z-50">
      <div className="flex gap-3 items-center">
        <button className="text-gray-100 h-[100%]" onClick={handleNavigate}>
          <FaArrowLeft />
        </button>
        <h3 className="text-lg text-gray-100 font-bold">{pageLabel}</h3>
      </div>
      <Button type="button" variant={"secondary"} className="px-2 py-2" loading={false} onClick={handleLogoutButton}>
        Logout
      </Button>
    </div>
  );
};
BackBar.propTypes = {
  pageLabel: PropTypes.string,
};
export default BackBar;
