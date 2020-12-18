import { store } from "./redux/store";

const config = {
  headers: {
    "Content-type": "Application/json",
  },
};

const token = store.getState().userReducer.token;

if (token) {
  config.headers["Authorization"] = token;
}

export default config;
