import { ADD_COMMENT_TO_POST, EDIT_COMMENT_FROM_POST, REMOVE_COMMENT_FROM_POST } from "./Constants";
import axios from "axios";

export const addCommentToPost = (postId, textOfComment) => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const body = JSON.stringify({ textOfComment })
  const post = await axios.post(
    `/api/posts/${postId}/comment`,
    body,
    config
  );
  dispatch({ type: ADD_COMMENT_TO_POST, payload: post.data });
};

export const removeCommentFromPost = (postId, commentId) => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const post = await axios.delete(
    `/api/posts/${postId}/comment/${commentId}`,
    config
  );
  dispatch({ type: REMOVE_COMMENT_FROM_POST, payload: post.data });
};

export const editCommentFromPost = (postId, commentId, textOfComment) => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const body = JSON.stringify({ textOfComment });
  const post = await axios.put(
    `/api/posts/${postId}/comment/${commentId}`,
    body,
    config
  );
  dispatch({ type: EDIT_COMMENT_FROM_POST, payload: post.data });
};