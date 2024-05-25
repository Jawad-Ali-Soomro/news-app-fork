import React, { useEffect, useState } from "react";
import BackBar from "../../components/Navbar/BackBar";
import BottomBar from "../../components/Navbar/BottomBar";
import Container from "../../containers/Container";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchArticleById, updateArticleByChannel } from "../../api/articles";
const UpdateArticle = () => {
  const [updatedArticle, setUpdatedArticle] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetchArticleById(id);
      if (!response) return;
      console.log(response.data);
      setUpdatedArticle(response.data.article);
    })();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await updateArticleByChannel(updatedArticle);
    if (!response) return;
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: response?.data?.message,
      showConfirmButton: false,
      timer: 1500,
    });

    setUpdatedArticle({});
    navigate("/articles");
  };

  const handleInputs = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUpdatedArticle({ ...updatedArticle, [key]: value });
  };

  return (
    <React.Fragment>
      <BackBar />
      <Container className={"flex flex-col justify-center items-center"}>
        <h3>Update your Article for users of App </h3>
        <form onSubmit={submitHandler} className="flex flex-col min-w-[55%]">
          <FormInput
            type={"text"}
            label={"Title of Article"}
            placeholder={"Enter title..."}
            value={updatedArticle?.title}
            name={"title"}
            onChange={handleInputs}
          />
          <FormInput
            type={"text"}
            label={"Content of Article "}
            placeholder={"Enter content..."}
            value={updatedArticle?.content}
            name={"content"}
            onChange={handleInputs}
          />
          <FormInput
            type={"text"}
            label={"Description of Article "}
            placeholder={"Enter description..."}
            name={"description"}
            value={updatedArticle?.description}
            onChange={handleInputs}
          />
          <Button
            type="submit"
            className="w-fit px-2 py-2"
            variant={"primary"}
            isLoading={false}
          >
            Update Article
          </Button>
        </form>
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default UpdateArticle;
