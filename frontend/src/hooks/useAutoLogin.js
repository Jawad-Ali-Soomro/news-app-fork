import { useEffect, useState } from "react";
import { refreshAutoLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth.slice.js";
const useAutoLogin = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await refreshAutoLogin();
      if (!response) {
        setSuccess(false);
        return;
      }
      dispatch(login(response.data.user));
      setSuccess(true);
    })();
  }, [dispatch]);
  return success;
};
export default useAutoLogin;
