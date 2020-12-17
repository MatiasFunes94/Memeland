import {
  GET_ALL_POSTS,
  GET_ALL_RECENTS_POSTS,
  GET_ALL_FOLLOWING_POSTS,
  GET_ALL_MY_FAVORITE_POSTS,
  GET_MY_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LOADING,
  SET_FILTER_POSTS
} from "./Constants";
import axios from "axios";

export const getAllPosts = () => async (dispatch) => {
  const posts = await axios.get(`/api/posts/`);
  dispatch({ type: GET_ALL_POSTS, payload: posts.data });
};

export const getAllRecentsPosts = () => async (dispatch) => {
  const posts = await axios.get(`/api/posts/recents`);
  dispatch({ type: GET_ALL_RECENTS_POSTS, payload: posts.data });
};

export const getAllMyFavoritePosts = () => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const posts = await axios.get(`/api/posts/favorites`, config);
  dispatch({ type: GET_ALL_MY_FAVORITE_POSTS, payload: posts.data });
};

export const getAllFollowingPosts = (arrayUsernames) => async (dispatch) => {
  const body = {
    following: arrayUsernames,
  };
  const posts = await axios.put(`/api/posts/following`, body);
  dispatch({ type: GET_ALL_FOLLOWING_POSTS, payload: posts.data });
};

export const getMyPosts = () => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const posts = await axios.get(`/api/posts/myPosts`, config);
  dispatch({ type: GET_MY_POSTS, payload: posts.data });
};

export const getUserPosts = (userId) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const posts = await axios.get(`/api/posts/${userId}`, config);
  dispatch({ type: GET_USER_POSTS, payload: posts.data });
};

export const createPost = (description, urlImage) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const body = JSON.stringify({
    description,
    photo: urlImage,
  });
  const post = await axios.post(`/api/posts/`, body, config)
  dispatch({ type: CREATE_POST, payload: post.data });
};

export const updatePost = (postId, description) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const editedDescription = JSON.stringify({ description })
  console.log(description)
  const post = await axios.put(`/api/posts/${postId}`, editedDescription, config);
  dispatch({ type: UPDATE_POST, payload: post.data });
};

export const deletePost = (postId) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  await axios.delete(`/api/posts/${postId}`, config);
  dispatch({ type: DELETE_POST, payload: postId });
};

export const setFilterPosts = (statusFilter) => (dispatch) => {
  dispatch({ type: SET_FILTER_POSTS, payload: statusFilter })
}