import { Route, Routes } from "react-router-dom";
import ProtectedByUser from "./Protected/ProtectedByUser.jsx";
import ProtectedByChannel from "./Protected/ProtectedByChannel.jsx";
import CreateArticle from "../pages/Article/CreateArticle.jsx";
import UpdateArticle from "../pages/Article/UpdateArticle.jsx";
import NotFoundPage from "../pages/Error/NotFoundPage.jsx";
import DashBoard from "../pages/Admin/DashBoard.jsx";
import ProtectedByAdmin from "./Protected/ProtectedByAdmin.jsx";
import RegisterChannel from "../pages/SignUp/ChannelRegister.jsx";
import ArticleList from "../pages/Article/ArticlesList.jsx"
import Notifications from "../pages/Notification/Notifications.jsx"
import ChannelsList from "../pages/Channel/ChannelsList.jsx"
import Login from "../pages/Login/Login.jsx"
import ChannelProfile from "../pages/Channel/ChannelProfile.jsx"
import ArticleDetailsPage from "../pages/Article/ArticleDetailsPage.jsx"
import Settings from "../pages/Settings/Settings.jsx"
import Collection from "../pages/Collection/Collection.jsx"
import LandingPage from "../pages/Home/LandingPage.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import useAutoLogin from "../hooks/useAutoLogin.js";
//import all pages
const Router = () => {
  useAutoLogin();
  return (
    <Routes>
      {/* common routes of App available of all */}
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/auth/login" element={<Login />} />
      <Route exact path="/auth/signUp" element={<SignUp />} />
      <Route exact path="/auth/channelRegister" element={<RegisterChannel />} />
      {/* protected routes by login user */}
      <Route element={<ProtectedByUser />}>
        <Route exact path="/articles" element={<ArticleList />} />
        <Route exact path="/notifications" element={<Notifications />} />
        <Route exact path="/channels" element={<ChannelsList />} />
        <Route exact path="/channels/:id" element={<ChannelProfile />} />
        <Route exact path="/articles/:id" element={<ArticleDetailsPage />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/saved" element={<Collection />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* protected routes by channels */}
      <Route element={<ProtectedByChannel />}>
        <Route exact path="/articles/create" element={<CreateArticle />} />
        <Route exact path="/articles/update/:id" element={<UpdateArticle />} />
      </Route>
      {/* protected routes by admin or App owner */}
      <Route element={<ProtectedByAdmin />}>
        <Route exact path="/admin/dashboard" element={<DashBoard />} />
        <Route exact path="/admin/say" element={<>say hello from admin</>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
