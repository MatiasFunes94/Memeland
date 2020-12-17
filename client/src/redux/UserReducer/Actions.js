import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_IMAGE_PROFILE
} from "./Constants";
import { returnErrors } from "../ErrorReducer/Actions";
import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const token = getState().userReducer.token;

  if (token) {
    config.headers["Authorization"] = token;
  }
  axios
    .get(`/api/auth/`, config)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: AUTH_ERROR });
    });
};

export const signUp = (user) => (dispatch) => {
  let userEnv;

  userEnv = {
    username: user.username,
    email: user.email,
    password: user.password,
  };
  return axios
    .post(`/api/users/`, userEnv)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({ type: REGISTER_FAIL });
      }
    });
};

export const signIn = (user) => (dispatch) => {
  const userEnv = {
    email: user.email,
    password: user.password,
  };

  return axios
    .post(`/api/auth/`, userEnv)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};

export const followUser = (userToFollow) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const user = await axios.put(`/api/users/follow/${userToFollow}`, config);
  dispatch({ type: FOLLOW_USER, payload: user.data });
};

export const unfollowUser = (userToUnfollow) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const user = await axios.put(`/api/users/unfollow/${userToUnfollow}`, config);
  dispatch({ type: UNFOLLOW_USER, payload: user.data });
};

export const setImageProfile = (image) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const token = getState().userReducer.token;
  if (token) {
    config.headers["Authorization"] = token;
  }
  const body = JSON.stringify({ image })
  const user = await axios.put(`/api/users/profile/`, body, config);
  dispatch({ type: SET_IMAGE_PROFILE, payload: user.data });
};