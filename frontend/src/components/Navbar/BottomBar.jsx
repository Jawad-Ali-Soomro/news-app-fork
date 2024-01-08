import React from "react";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { FaRegBookmark, FaNewspaper, FaUsers } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
const BottomBar = () => {
  const generateNavIcons = (user) => {
    const baseIcons = [
      { path: "/", label: "Home", element: <IoMdHome /> },
      { path: "/articles", label: "Articles", element: <FaNewspaper /> },
      { path: "/channels", label: "Channels", element: <FaUsers /> },
      { path: "/saved", label: "Collections", element: <FaRegBookmark /> },
      { path: "/settings", label: "Settings", element: <IoIosSettings /> },
    ];

    if (user) {
      if (user.role === "ADMIN") {
        baseIcons.push({
          path: "/admin/dashboard",
          label: "Admin",
          element: <GrUserAdmin />,
        });
      }
      if (user.role === "NEWS_CHANNEL") {
        baseIcons.push({
          path: "/articles/create",
          label: "Write",
          element: <FaPencilAlt />,
        });
      }
    }

    return baseIcons;
  };
  const user = useSelector((state) => state.auth.user);
  const navIcons = generateNavIcons(user);

  return (
    <React.Fragment>
      <div className="fixed bottom-0 left-0 w-full h-14 flex justify-between items-end text-gray-100 text-lg px-5 bg-gray-800 z-20">
        {navIcons.map((icon) => {
          return (
            <NavLink
              to={icon.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-orange-500 flex flex-col items-center"
                  : isActive
                  ? "text-green-500 flex flex-col items-center "
                  : " flex flex-col items-center"
              }
              key={icon.path}
            >
              <span className="text-center">{icon.element}</span>
              <span className="text-center text-[11px]">{icon.label}</span>
            </NavLink>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default BottomBar;
