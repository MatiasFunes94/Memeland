import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  getAllPosts,
  getAllRecentsPosts,
  getAllFollowingPosts,
  getAllMyFavoritePosts,
  setFilterPosts,
} from "../../redux/PostReducer/PostActions";
import { palette } from "../../ColourPalette";
import { useStyles } from './styles';

export default function FilterSection() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userReducer.user);

  const handleGetAllPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllPosts()).then(dispatch(setFilterPosts("Most liked posts")))
  };

  const handleGetAllRecentsPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllRecentsPosts()).then(dispatch(setFilterPosts("Recents posts")))
  };

  const handleGetAllFollowingPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllFollowingPosts(user.following)).then(dispatch(setFilterPosts("Following posts")))
  };

  const handleGetAllMyFavoritesPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllMyFavoritePosts()).then(dispatch(setFilterPosts("My favorite posts")))
  };

  const handleGetAllMyPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        id="demo-simple-select-autowidth-label"
        style={{ color: palette.white }}
      >
        Filter posts
      </InputLabel>
      <Select
        style={{ borderBottom: "1px white solid", color: "white" }}
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={""}
        autoWidth
        inputProps={{
          classes: {
            root: classes.border,
            icon: classes.icon,
          },
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <MenuItem
            value={"Most liked posts"}
            className={classes.menuItem}
            onClick={handleGetAllPosts}
          >
            Most liked posts
          </MenuItem>
          <MenuItem
            value={"Recents posts"}
            className={classes.menuItem}
            onClick={handleGetAllRecentsPosts}
          >
            Recents Posts
          </MenuItem>
          <MenuItem
            value={"Following posts"}
            className={classes.menuItem}
            onClick={handleGetAllFollowingPosts}
          >
            Following Posts
          </MenuItem>
          <MenuItem
            value={"My favorite posts"}
            className={classes.menuItem}
            onClick={handleGetAllMyFavoritesPosts}
          >
            My Favorite Posts
          </MenuItem>
        </Link>
        <Link
          to="/profile"
          style={{ textDecoration: "none" }}
          onClick={handleGetAllMyPosts}
        >
          <MenuItem value={"My posts"} className={classes.menuItem}>
            My Posts
          </MenuItem>
        </Link>
      </Select>
    </FormControl>
  );
}
