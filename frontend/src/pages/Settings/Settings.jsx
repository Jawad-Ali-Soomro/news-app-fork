import React, { useState, useEffect } from "react";
import BackBar from "../../components/Navbar/BackBar";
import Container from "../../containers/Container";
import BottomBar from "../../components/Navbar/BottomBar";
import { Button } from "../../components/UI/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/UI/tabs";
import FormInput from "../../components/UI/FormInput";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm";
import UpdateAccountForm from "../../components/Forms/UpdateAccountForm";
import ChangeAvatarForm from "../../components/Forms/ChangeAvatarForm";
import Navbar from "../../components/Navbar/Navbar";
import ChangeCoverImageForm from "../../components/Forms/ChangeCoverImageForm";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Navbar />

      <div className="w-100 flex justify-center mt-5 bg-background">
        <Tabs defaultValue="account" className="w-auto">
          <TabsList className="flex bg-transparent gap-4">
            <TabsTrigger value="account">Update Account Details </TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="change-avatar">Change Avatar Image </TabsTrigger>
            <TabsTrigger value="change-coverImage">Change Cover Image </TabsTrigger>
          </TabsList>
          <TabsContent value="password" className="">
            <ChangePasswordForm />
          </TabsContent>
          <TabsContent value="account">
            <UpdateAccountForm />
          </TabsContent>
          <TabsContent value="change-avatar">
            <ChangeAvatarForm />
          </TabsContent>
          <TabsContent value="change-coverImage">
            <ChangeCoverImageForm />
          </TabsContent>
        </Tabs>
      </div>
      <BottomBar />
    </React.Fragment>
  );
};

export default SettingsPage;
