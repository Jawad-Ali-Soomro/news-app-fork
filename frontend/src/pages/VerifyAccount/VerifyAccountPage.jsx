import React, { useState, version } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/UI/button";
import { postRequest } from "../../api/apiServices";

const VerifyAccountPage = () => {
  const [verifyStatus, setVerifyStatus] = useState({ isResendEmail: false, isVerified: false, isLoading: false });
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleVerifyButton = async () => {
    setVerifyStatus({ ...verifyStatus, isLoading: true });
    const token = searchParams.get("token");
    const response = await postRequest("/api/v1/auth/verify-account", { token });
    setVerifyStatus({ ...verifyStatus, isLoading: false }); //stop loading

    // if any error occured then user can resend the email as well
    if (!response.success) return setVerifyStatus({ ...verifyStatus, isResendEmail: true });

    setVerifyStatus({ ...verifyStatus, isVerified: true });
  };

  const handleResendButton = async () => {};

  return (
    <div className="h-screen text-center w-100 flex justify-center items-center ">
      {!verifyStatus.isVerified && !verifyStatus.isResendEmail && (
        <div>
          <h2 className="font-semibold my-3 text-3xl text-green-900">Click to verify your account</h2>
          <h3 className="font-semibold my-4 text-lg  text-green-500">
            please click below verify button to verify your account
          </h3>
          <Button onClick={handleVerifyButton} loading={verifyStatus.isLoading}>
            Verify Account
          </Button>
        </div>
      )}

      {verifyStatus.isVerified && (
        <div className="my-8 text-center sm:w-1/2">
          <h3 className="font-semibold text-lg text-green-500 my-4">
            Your account has been verified successfully. You can now click the login button below to access your
            account.
          </h3>
          <Button onClick={() => navigate("/auth/login")} loading={verifyStatus.isLoading}>
            Login Here !
          </Button>
        </div>
      )}
      {/* render resend email block if any error occured while verifing */}
      {verifyStatus.isResendEmail && !verifyStatus.isVerified && (
        <div className="my-8 m-auto p-auto sm:w-1/2">
          <h2 className="font-semibold text-3xl text-gray-900 my-5">Account Verification </h2>
          <h3 className="font-semibold text-lg  text-red-400 my-5">
            Account verification failed because your verification token has expired or is invalid. If you wish to verify
            your account again, please click the Resend Email button below to receive another verification email.
          </h3>
          <Button onClick={handleResendButton} loading={verifyStatus.isLoading}>
            Resend Email
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyAccountPage;
