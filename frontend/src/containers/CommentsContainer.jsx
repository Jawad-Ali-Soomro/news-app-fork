// CommentsContainer.jsx
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCommentOnArticle, fetchCommentsById } from "../api/articles";
import Container from "../containers/Container";
import CommentCard from "../components/Cards/CommentCard";
import { timeAgo } from "../utils/timeStamp";

const CommentsContainer = () => {
  const { id } = useParams();
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCommentsById(id);
        setComments(response?.data?.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [id, currentCommentText]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await addCommentOnArticle(id, currentCommentText);
    setCurrentCommentText("");
    if (!response) return;
  };
  //className="comment-section max-w-screen-md mx-auto"-1
  return (
    <Container className="sm:w-[45%] w-100 bg-slate-100 rounded-lg ml-5 py-5 mb-[6rem] relative overflow-scroll overflow-x-hidden">
      <div className="comment-section max-w-screen-md mx-auto bg-white rounded-lg shadow-lg sm:p-6 p-1">
        <div className="comment-header mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
        </div>
        {comments.length === 0 ? (
          <div className="text-gray-600 p-4">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="comment flex items-start justify-between space-x-4 mb-4 border-b pb-5"
              >
                <div className="flex gap-2">
                  <img
                    src={comment.userId.profileImage}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {comment.userId.name}
                    </p>
                    <p className="text-gray-600">{comment.commentText}</p>
                  </div>
                </div>
                <span className="text-[11px]">{timeAgo(comment.createAt)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="comment-input mt-6">
          <form onSubmit={submitHandler}>
            <input
              required
              value={currentCommentText}
              onChange={(e) => setCurrentCommentText(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CommentsContainer;
