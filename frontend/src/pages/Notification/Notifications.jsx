import React from "react";
import BottomBar from "../../components/Navbar/BottomBar";
import Container from "../../containers/Container";
import NotificationCard from "../../components/cards/NotificationCard";
import { motion } from "framer-motion";
import BackBar from "../../components/Navbar/BackBar";

const borderVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.92 } },
};

const Notifications = () => {
  return (
    <React.Fragment>
      <motion.div initial="hidden" animate="visible" variants={borderVariants}>
        <BackBar pageLabel={"Notifications"} />
        <Container className="flex justify-start flex-col items-center py-3">
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </Container>
        <BottomBar />
      </motion.div>
    </React.Fragment>
  );
};

export default Notifications;
