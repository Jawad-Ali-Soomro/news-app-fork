import React, { useEffect, useState } from "react";
import BackBar from "../../components/Navbar/BackBar";
import ArticleCard from "../../components/Cards/ArticleCard";
import BottomBar from "../../components/Navbar/BottomBar";
import Container from "../../containers/Container";
import { fetchChannelProfile } from "../../api/channels";
import { useParams } from "react-router-dom";
import Loader from "../../components/UI/Loader";
const ChannelProfile = () => {
  const [articles, setArticles] = useState([]);
  const [channelInfo, setChannelInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await fetchChannelProfile(id);
      console.log(response);
      if (!response) return;
      setArticles(response.data.profile.articles);
      setChannelInfo(response.data.profile.channel);
      setLoading(false);
    })();
  }, [id]);
  if (loading) return <Loader />;
  return (
    <React.Fragment>
      <BackBar pageLabel={"Profile"} />
      <Container className="flex items-center flex-col w-full justify-center mt-5">
        {loading && <Loader />}
        <div className="flex justify-center lg:w-[35%] flex-col">
          <img
            className="lg:w-[100%] lg:h-[22vh] rounded-md"
            src={channelInfo?.coverImage}
            alt=""
          />
          <div className="flex justify-between px-2 mt-2">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <img
                  className="w-[50px] h-[50px] rounded-[25px]"
                  src={channelInfo?.profileImage}
                  alt=""
                />
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[13px] font-bold">
                      {" "}
                      {channelInfo?.followers?.length}{" "}
                    </span>
                    <span className="text-[9px]">Followers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[13px] font-bold">
                      {" "}
                      {channelInfo?.following?.length}{" "}
                    </span>
                    <span className="text-[9px]">Followers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[13px] font-bold">
                      {articles.length}
                    </span>
                    <span className="text-[9px]">Articles</span>
                  </div>
                </div>
              </div>
              <span className="font-bold text-lg"> {channelInfo?.name} </span>
              <span className="font-normal text-md ">
                {" "}
                {channelInfo?.username}{" "}
              </span>
              <p className="font-md text-[14px] max-w-[65%] mt-4">
                {channelInfo?.headline}
              </p>
            </div>
          </div>
          <div className="mt-5 px-3">
            <h3 className="font-bold text-lg">About</h3>
            <p className="text-[14px]">{channelInfo?.about}</p>
          </div>
          <div className="mt-5 px-3">
            <h3 className="font-bold text-lg mb-5">Articles</h3>
            {!loading && articles.length === 0 && <p>not have articles yet!</p>}
            {articles?.map((article) => {
              return <ArticleCard key={article._id} {...article} author={channelInfo} />;
            })}
          </div>
        </div>
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default ChannelProfile;
