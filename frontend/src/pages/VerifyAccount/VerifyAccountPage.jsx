import React from "react";
import { Button } from "../../components/UI/button";

const VerifyAccountPage = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <p className="font-semibold text-3xl mb-8 text-gray-900">Click to verify your account</p>
      <Button>Verify Account</Button>
    </div>
  );
};

export default VerifyAccountPage;
