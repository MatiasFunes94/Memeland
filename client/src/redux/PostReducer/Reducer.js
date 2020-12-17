import {
  GET_ALL_POSTS,
  GET_ALL_RECENTS_POSTS,
  GET_ALL_FOLLOWING_POSTS,
  GET_ALL_MY_FAVORITE_POSTS,
  GET_MY_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  ADD_COMMENT_TO_POST,
  REMOVE_COMMENT_FROM_POST,
  UPDATE_POST,
  DELETE_POST,
  EDIT_COMMENT_FROM_POST,
  LOADING,
  SET_FILTER_POSTS
} from "./Constants";

const initialState = {
  allPosts: [],
  userPosts: [],
  myPosts: [],
  loading: false,
  filterBy: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
    case GET_ALL_RECENTS_POSTS:
    case GET_ALL_FOLLOWING_POSTS:
    case GET_ALL_MY_FAVORITE_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
        myPosts: [action.payload, ...state.myPosts],
      };
    case LIKE_POST:
    case UNLIKE_POST:
    case LIKE_COMMENT:
    case UNLIKE_COMMENT:
      return {
        ...state,
        myPosts: state.myPosts.map((post, id) =>
          post._id === action.payload._id
            ? post = action.payload
            : post
        ),
        userPosts: state.userPosts.map((post, id) =>
          post._id === action.payload._id
            ? post = action.payload
            : post
        ),
        allPosts: state.allPosts.map((post, id) =>
          post._id === action.payload._id
            ? post = action.payload
            : post
        ),
      };
    case ADD_COMMENT_TO_POST:
    case REMOVE_COMMENT_FROM_POST:
    case EDIT_COMMENT_FROM_POST:
      return {
        ...state,
        myPosts: state.myPosts.map((post, id) =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
        userPosts: state.userPosts.map((post, id) =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
        allPosts: state.allPosts.map((post, id) =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
    case UPDATE_POST:
      return {
        ...state,
        myPosts: state.myPosts.map((post, id) =>
          post._id === action.payload._id
            ? { ...post, description: action.payload.description }
            : post
        ),
        allPosts: state.allPosts.map((post, id) =>
          post._id === action.payload._id
            ? { ...post, description: action.payload.description }
            : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        myPosts: state.myPosts.filter((post) => post._id !== action.payload),
        allPosts: state.allPosts.filter((post) => post._id !== action.payload),
      };
    case SET_FILTER_POSTS:
      return {
        ...state,
        filterBy: action.payload
      }
    default:
      return state;
  }
};

export default postReducer;
