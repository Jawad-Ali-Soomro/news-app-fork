import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/UI/dropdown-menu";
import React, { useDebugValue } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/button";
import { logout } from "../../store/slices/auth.slice";
import { postRequest } from "../../api/apiServices";
import { useTheme } from "../theme/ThemeProvider";

const ProfileMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutButton = async () => {
    const response = await postRequest("/api/v1/auth/logout", {});
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <DropdownMenu className="m-20">
      <DropdownMenuTrigger>
        <img src={user.avatar} className="rounded-full w-9 h-9" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-2 px-3 py-4">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 ">
            <p className="text-md  leading-none line-clamp-1 mb-2">{user?.username}</p>
            <p className="text-md leading-none text-muted-foreground line-clamp-1">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <PersonIcon /> <span className="ml-3">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          {" "}
          <IoSettingsOutline /> <span className="ml-3">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={`flex gap-2 items-center`}>
            {" "}
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />{" "}
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("rose-light")}>Rose Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("rose-dark")}>Rose Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("green-light")}>Green Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("green-dark")}>Green Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("orange-light")}>Orange Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("orange-dark")}>Orange Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("violet-light")}>Violet Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("violet-dark")}>Violet Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("red-light")}>Red Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("red-dark")}>Red Dark</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>{/* <LuLogOut /> <span className="ml-3">Logout</span> */}</DropdownMenuItem>
        <div className="flex  flex-row mx-auto px-auto border-t pt-3">
          <Button onClick={handleLogoutButton} className="w-[100%] flex  w-webkit-fill-available">
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
