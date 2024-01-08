import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastWrapper = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={false}
      limit={1}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
    />
  );
};

export default ToastWrapper;
