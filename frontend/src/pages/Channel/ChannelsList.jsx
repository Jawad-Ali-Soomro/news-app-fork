import React, { useEffect, useState } from "react";
import Container from "../../containers/Container.jsx";
import BottomBar from "../../components/Navbar/BottomBar.jsx";
import Card from "../../components/Cards/ChannelCard";
import BackBar from "../../components/Navbar/BackBar";
import Loader from "../../components/UI/Loader";
import { fetchChannelsList } from "../../api/channels.js";
const ChannelsList = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetchChannelsList();
      if (!response) return;
      setChannels(response.data.channels);
      console.log(response.data.channels);
      setLoading(false);
    })();
  }, []);

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.about.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <React.Fragment>
      <BackBar pageLabel={"Channels"} />
      <div className="filters w-[100%] overflow-x-scroll overflow-y-hidden flex justify-center py-2 px-10 ps-11">
        <input
          type="search"
          value={searchQuery}
          placeholder="Type to search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />{" "}
      </div>
      {loading && <Loader />}
      <Container className="w-full flex flex-wrap px-0 py-2 gap-3 justify-between items-center">
        {filteredChannels.map((channel) => {
          return <Card key={channel._id} {...channel} />;
        })}
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default ChannelsList;
