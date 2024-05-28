import React from "react";
import { Button } from "../UI/button";
import { FaEdit } from "react-icons/fa";

const ChangeCoverImageForm = () => {
  return (
    <div>
      <p className="text-xl">Make sure you change the cover Image</p>
      <div className="py-5 relative">
        <input type="file" id="cover-image" hidden capture="user" />
        <label htmlFor="cover-image">
          <img
            className="w-24 h-24 rounded-full"
            src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
            alt=""
          />
          <Button className="px-2 py-1 text-lg text-slate" variant="outline">
            <FaEdit />
          </Button>
        </label>
      </div>
      <div className="mt-5">
        <Button>Save changes</Button>
      </div>
    </div>
  );
};

export default ChangeCoverImageForm;
