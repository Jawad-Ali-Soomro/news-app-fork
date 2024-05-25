import React, { useState } from "react";
import BackBar from "../../components/Navbar/BackBar";
import BottomBar from "../../components/Navbar/BottomBar";
import Container from "../../containers/Container";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import { createArticleByChannel } from "../../api/articles";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ARTICLE_VALIDATION } from "../../config/validation";
import { useSelector } from "react-redux";
const CreateArticle = () => {
  const [isUploading, setIsUploading] = useState(false);
  const adminApproval = useSelector(
    (state) => state.auth.user.channelApprovalStatus,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // handle submit to call api for create new article by current channel
  const submitHandler = async (data, event) => {
    event.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("description", data.description);
    formData.append("photo", data.photo[0]);
    const response = await createArticleByChannel(formData);
    if (!response) {
      setIsUploading(false);
      return;
    }
    toast.success(response?.data?.message);
    setIsUploading(false);
  };

  return (
    <React.Fragment>
      <BackBar />
      <Container className="flex flex-col justify-center items-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Create a new Article for users of App
        </h3>
        <div className="text-center mt-5">
          {adminApproval === "REJECTED" && (
            <p className="text-[14px] text-red-700">
              your channel has rejected by admi, you not be able to write
              article
            </p>
          )}
          {adminApproval === "PENDING" && (
            <p className="text-[14px] text-red-700">
              {" "}
              your channel request has pending,please wait for admin approval,
              you not be able to write article
            </p>
          )}
        </div>
        <form
          className="flex flex-col w-full max-w-[55%]"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(submitHandler)}
        >
          <FormInput
            type="text"
            label="Title of Article"
            placeholder="Enter title..."
            {...register("title", ARTICLE_VALIDATION.title)}
            error={errors.title}
          />
          <FormInput
            type="text"
            label="Content of Article"
            placeholder="Enter content..."
            {...register("content", ARTICLE_VALIDATION.content)}
            error={errors.content}
          />
          <FormInput
            type="text"
            label="Description of Article"
            placeholder="Enter description..."
            {...register("description", ARTICLE_VALIDATION.description)}
            error={errors.description}
          />
          <FormInput
            type="file"
            label="Upload Image of article"
            className="file:border-0 file:bg-gray-200 file:text-[12px] file:px-2 file:py-2 file:rounded-lg file:sh"
            {...register("photo", { required: true })}
          />
          <Button
            type="submit"
            variant="primary"
            isLoading={isUploading}
            className="mt-4 w-fit px-2 py-2"
          >
            Publish Article
          </Button>
        </form>
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default CreateArticle;
