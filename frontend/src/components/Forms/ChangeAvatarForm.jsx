import React, { useState } from "react";
import { Button } from "../UI/button";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { patchRequest } from "../../api/apiServices";
import { updateUserDetails } from "../../store/slices/auth.slice";

const ChangeAvatarForm = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.set("avatar", avatarFile);
    console.log(data.get("avatar"));
    const response = await patchRequest("/api/v1/users/change-avatar", data);
    setLoading(false);
    if (!response.success) return setErrorMessage(response.message);
    dispatch(updateUserDetails({ avatar: response.data.avatar }));
  };

  return (
    <form onSubmit={submitHandler}>
      <p className="text-xl">Make sure you change the Avatar</p>
      <div className="py-5 relative">
        <input type="file" id="avatar-image" hidden onChange={handleFileChange} />
        <label htmlFor="avatar-image">
          <img
            className="w-24 h-24 rounded-full"
            src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
            alt=""
          />
          <Button className="px-2 py-1 text-lg text-slate" variant="outline">
            <FaEdit />
          </Button>
        </label>
      </div>
      <div className="my-5">
        <p className="text-red-500">{errorMessage}</p>
      </div>
      <div className="mt-5">
        <Button type="submit" loading={loading}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ChangeAvatarForm;
