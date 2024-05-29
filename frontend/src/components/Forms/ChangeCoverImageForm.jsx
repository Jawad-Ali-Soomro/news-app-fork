import React, { useState } from "react";
import { Button } from "../UI/button";
import { FaEdit } from "react-icons/fa";
import { patchRequest } from "../../api/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../store/slices/auth.slice";

const ChangeCoverImageForm = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.set("coverImage", coverImage);
    console.log(data.get("avatar"));
    const response = await patchRequest("/api/v1/users/change-coverImage", data);
    setLoading(false);
    if (!response.success) return setErrorMessage(response.message);
    dispatch(updateUserDetails({ coverImage: response.data.coverImage }));
  };

  return (
    <form onSubmit={submitHandler}>
      <p className="text-xl">Make sure you change the cover Image</p>
      <div className="py-5 relative">
        <input type="file" id="cover-image" onChange={handleFileChange} hidden capture="user" />
        <label htmlFor="cover-image">
          <img
            className="w-24 h-24 rounded-full"
            // src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
            src={coverImage ? URL.createObjectURL(coverImage) : user.coverImage}
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

export default ChangeCoverImageForm;
