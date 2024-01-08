import React from "react";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
const HeroContainer = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="flex justify-around items-center bg-center bg-cover px-4 h-[92vh] bg-[url('https://images.unsplash.com/photo-1616731948638-b0d0befef759?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D')]">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-green-200 ml-2">
            Join Us Create News Channel and Uploads daily News
          </h3>
          <h5 className="text-xl font-bold text-orange-300 ml-2">
            Get in touch latest News by Official News Channels
          </h5>
          <p className="mt-5 max-w-[55%] font-semibold text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            rerum nostrum numquam veniam odit eaque eum deleniti suscipit,
            necessitatibus soluta reprehenderit error magnam iste atque sint
            laudantium ipsum impedit dolorum!
          </p>
          <Button
            onClick={() => navigate("/articles")}
            className="w-fit "
            variant={"success"}
            isLoading={false}
          >
            Explore
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeroContainer;
