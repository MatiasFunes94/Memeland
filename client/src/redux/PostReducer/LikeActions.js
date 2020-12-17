import { LIKE_POST, UNLIKE_POST, LIKE_COMMENT, UNLIKE_COMMENT } from "./Constants";
import axios from "axios";

export const likePost = (postId, username) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const post = await axios.put(
    `/api/posts/like/${postId}/${username}`,
    config
  );
  dispatch({ type: LIKE_POST, payload: post.data });
};

export const unlikePost = (postId, username) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const post = await axios.put(
    `/api/posts/unlike/${postId}/${username}`,
    config
  );
  dispatch({ type: UNLIKE_POST, payload: post.data });
};

export const likeComment = (postId, commentId) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const post = await axios.put(
    `/api/posts/${postId}/comment/${commentId}/like`,
    config
  );
  dispatch({ type: LIKE_COMMENT, payload: post.data });
};

export const unlikeComment = (postId, commentId) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const post = await axios.put(
    `/api/posts/${postId}/comment/${commentId}/unlike`,
    config
  );
  dispatch({ type: UNLIKE_COMMENT, payload: post.data });
};