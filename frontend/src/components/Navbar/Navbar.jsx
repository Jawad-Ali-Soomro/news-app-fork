import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import { toast } from "react-toastify";
import { logout } from "../../store/slices/auth.slice";
import { Button } from "../UI/button";
import { postRequest } from "../../api/apiServices";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <React.Fragment>
      <div className="w-full bg-background/30 backdrop-blur-md  border-b h-14 shadow-md flex justify-between px-4 py-2 items-center text-foreground sticky z-50 top-0 mt-0">
        <div className="flex items-center">
          <img
            className="h-[100%] w-[50px]"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
          <h5 className="">ArticleHub</h5>
        </div>
        <div className="flex gap-3">
          {!authStatus ? (
            <div className="flex gap-1">
              <Button
                className="w-fit px-2 py-2"
                variant={"outline"}
                isLoading={false}
                onClick={() => navigate("/auth/signUp")}
              >
                Sign Up
              </Button>
              <Button
                className="w-fit px-2 py-2"
                variant={"default"}
                isLoading={false}
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </Button>
            </div>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
