import React, { useEffect, useState } from "react";
import BackBar from "../../components/Navbar/BackBar";
import Container from "../../containers/Container";
import Item from "../../components/Cards/CollectionItem";
import BottomBar from "../../components/Navbar/BottomBar";
import { useSelector } from "react-redux";
import { fetchUserCollection } from "../../api/articles";
import Loader from "../../components/UI/Loader";
import { motion } from "framer-motion";

const Collection = () => {
  const user = useSelector((state) => state.auth.user);

  const borderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const [collectionItems, setCollectionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetchUserCollection(user._id);
      if (!response) return;
      setCollectionItems(response.data.articles);
      setLoading(false);
    })();
  }, [user._id]);

  return (
    <React.Fragment>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={borderVariants}
      >
        <BackBar pageLabel={"saved articles"} />
        <Container className={"flex flex-col justify-start items-center"}>
          {loading && <Loader />}
          {!loading && collectionItems.length === 0 && <Loader />}
          <div className="lg:w-[45%] mt-5">
            {collectionItems?.map((item) => {
              return <Item key={item?._id} {...item} />;
            })}
          </div>
        </Container>
        <BottomBar />
      </motion.div>
    </React.Fragment>
  );
};

export default Collection;
