// CompleteArticle.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BackBar from "../../components/Navbar/BackBar";
import Container from "../../containers/Container.jsx";
import Loader from "../../components/UI/Loader.jsx";
import CommentsContainer from "../../containers/CommentsContainer.jsx";
import BottomBar from "../../components/Navbar/BottomBar.jsx";
import ArticleHeader from "../../components/Wrappers/ArticleHeader.jsx";
import ArticleContent from "../../components/Wrappers/ArticleContent.jsx";
import ArticleActions from "../../components/Wrappers/ArticleActions.jsx";
import ArticleButtons from "../../components/Wrappers/ArticleButtons.jsx";
import {
  deleteArticleById,
  disLikeArticleById,
  fetchArticleById,
  likeArticleById,
  addToCollection,
} from "../../api/articles.js";

const ArticleDetailsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [article, setArticle] = useState({});
  const [isSavedArticle, setIsSavedArticle] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetchArticleById(id);
        if (!response) return;

        const { article: fetchedArticle } = response.data;
        const isCurrentChannelArticle = fetchedArticle.author._id === user._id;

        setArticle({ ...fetchedArticle, isCurrentChannelArticle });
        setLikeCount(fetchedArticle.likes.length);
        setLiked(fetchedArticle.likes.includes(user._id));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticleData();
  }, [user, id, user._id]);

  const handleLike = async () => {
    setLiked(true);
    setLikeCount((prev) => prev + 1);
    await likeArticleById(id);
  };

  const handleDisLike = async () => {
    setLiked(false);
    setLikeCount((prev) => prev - 1);
    await disLikeArticleById(id);
  };
  //handle save article, If response is not successful mean this article has already in collection
  const handleSave = async () => {
    const response = await addToCollection(id);
    if (!response) {
      setIsSavedArticle(false);
    } else {
      setIsSavedArticle(true);
    }
  };

  const handleDelete = async () => {
    const response = await deleteArticleById(id);
    if (!response) return;
    toast(response?.data?.message);
    console.log(response);
    navigate("/articles");
  };

  if (loading) return <Loader />; // If data is loading, display
  return (
    <React.Fragment>
      <BackBar pageLabel={"Article Details"} />
      <Container className="lg:max-w-[65%] p-3">
        <ArticleHeader
          title={article.title}
          urlToImage={article.urlToImage}
          author={article.author}
          createdAt={article.createdAt}
        />
        <ArticleContent
          content={article.content}
          description={article.description}
        />
        <ArticleActions
          likeCount={likeCount}
          isLiked={isLiked}
          handleLike={handleLike}
          handleDisLike={handleDisLike}
        />
        <ArticleButtons
          isSavedArticle={isSavedArticle}
          handleSave={handleSave}
          isCurrentChannelArticle={article.isCurrentChannelArticle}
          handleDelete={handleDelete}
          navigate={navigate}
          articleId={article._id}
        />
      </Container>
      <CommentsContainer />
      <BottomBar />
    </React.Fragment>
  );
};
export default ArticleDetailsPage;
