import PropTypes from "prop-types";
import Button from "../../components/UI/Button";
import { acceptRequestByAdmin, rejectRequestByAdmin } from "../../api/channels";
import { toast } from "react-toastify";
import { useState } from "react";
const RequestCard = ({
  email,
  username,
  name,
  profileImage,
  headline,
  channelApprovalStatus,
  _id,
  setUpdate,
}) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    const response = await acceptRequestByAdmin(_id);
    if (!response) return;
    toast.success(response?.data?.message);
    setIsAccepting(false);
    setUpdate((prev) => prev + 1);
  };

  const handleReject = async () => {
    setIsRejecting(true);
    const response = await rejectRequestByAdmin(_id);
    if (!response) return;
    toast.success(response?.data?.message);
    setIsRejecting(false);
    setUpdate((prev) => prev + 1);
  };
  return (
    <tr className="border-b">
      <th
        scope="row"
        className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left"
      >
        <div className="flex flex-row items-center">
          <img className="rounded-full w-12" src={profileImage} alt="Avatar" />
          <div className="ml-4">
            <p className="mb-0.5 font-medium">{username} </p>
            <p className="mb-0.5 text-gray-500">{email} </p>
          </div>
        </div>
      </th>
      <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
        <div className="flex flex-col">
          <p className="mb-0.5"> {headline} </p>
          <p className="mb-0.5 text-gray-500">{name}</p>
        </div>
      </td>
      <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
        {channelApprovalStatus === "ACCEPTED" && (
          <span className="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium bg-green-200 text-green-600 rounded-full">
            Accepted
          </span>
        )}
        {channelApprovalStatus === "REJECTED" && (
          <span className="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium bg-red-200 text-red-600 rounded-full">
            Rejected
          </span>
        )}
        {channelApprovalStatus === "PENDING" && (
          <span className="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium bg-yellow-200 text-yellow-600 rounded-full">
            Pending
          </span>
        )}
      </td>
      {/* <td className="align-middle text-gray-500 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">Owner</td> */}
      <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap flex gap-2 text-left">
        {channelApprovalStatus === "PENDING" && (
          <>
            <Button
              variant={"success"}
              isLoading={isAccepting}
              className="px-2 py-2"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              variant={"danger"}
              isLoading={isRejecting}
              className="px-2 py-2"
              onClick={handleReject}
            >
              Decline
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};
RequestCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  channelApprovalStatus: PropTypes.string,
  profileImage: PropTypes.string,
  headline: PropTypes.string,
  _id: PropTypes.string,
  setUpdate: PropTypes.func,
};
export default RequestCard;
