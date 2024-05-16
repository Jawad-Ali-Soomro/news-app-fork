export const isChannelApprovedByAdmin = (req, res, next) => {
  const channel = req.author;
  console.log(channel.channelApprovalStatus);
  if (channel.channelApprovalStatus === "ACCEPTED") {
    return next();
  } else if (channel.approvalStatus === "REJECTED") {
    console.log("rejected");
    res.status(400).json({ message: "your not authorized !" });
  } else if (channel.approvalStatus === "PENDING") {
    console.log("pending");
    res.status(400).json({ message: "your not authorized  !" });
  } else {
    console.log("another status");
    res.status(400).json({ message: "your not authorized !" });
  }
};
