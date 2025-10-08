import React from "react";
import { Comment } from "./Video";
import { BiLike } from "react-icons/bi";
import { SlDislike } from "react-icons/sl";
import { HiUserCircle } from "react-icons/hi2";

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="comments-section min-h-[40vh]">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.commentId} className="comment my-4">
            <div className="flex flex-row">
              <HiUserCircle className="text-6xl" />

              <p className="my-auto mx-6">
                <strong>@{comment.username}</strong> (
                {new Date(comment.createdOn).toLocaleDateString()})
              </p>
            </div>
            <p className="my-5 ml-[50px]">{comment.content}</p>

            <div className="flex flex-row ml-[50px]">
              <div className="flex flex-row gap-1 mx-3">
                <BiLike className="text-red-600 text-2xl" />
                <p className="text-xl">{comment.likes}</p>
              </div>
              <div className="flex flex-row gap-1 mx-3">
                <SlDislike className="text-red-600 text-2xl" />
                <p>{comment.disLike}</p>
              </div>
            </div>

            {comment.isUpdated && <p>(Updated)</p>}
            {comment.mention && <p>Mention: {comment.mention}</p>}
            {comment.childrens.length > 0 && (
              <div className="children-comments">
                <h4>Replies</h4>
                {comment.childrens.map((child) => (
                  <div key={child.commentId} className="child-comment">
                    <p>
                      <strong>{child.username}</strong> (
                      {new Date(child.createdOn).toLocaleDateString()})
                    </p>
                    <p>{child.content}</p>
                    <p>
                      Likes: {child.likes} | Dislikes: {child.disLike}
                    </p>

                    <div className="flex flex-row gap-1 mx-3">
                      <BiLike className="text-red-600 text-2xl" />
                      <p className="text-xl">{child.likes}</p>
                    </div>
                    <div className="flex flex-row gap-1 mx-3">
                      <SlDislike className="text-red-600 text-2xl" />
                      <p>{child.disLike}</p>
                    </div>

                    {child.isUpdated && <p>(Updated)</p>}
                    {child.mention && <p>Mention: {child.mention}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;
