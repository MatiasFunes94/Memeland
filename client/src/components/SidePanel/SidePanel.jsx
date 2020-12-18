import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Redirect } from "react-router-dom";
import { getAllPosts, getAllRecentsPosts, getAllFollowingPosts, getAllMyFavoritePosts, setFilterPosts } from '../../redux/PostReducer/PostActions';
import { Container } from "@material-ui/core";
import { useStyles } from './styles';

function SidePanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(null);

  const user = useSelector((store) => store.userReducer.user);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleGetAllPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllPosts()).then(dispatch(setFilterPosts("Most liked posts")))
  }

  const handleGetAllRecentsPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllRecentsPosts()).then(dispatch(setFilterPosts("Recents posts")))
  }

  const handleGetAllFollowingPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllFollowingPosts(user.following)).then(dispatch(setFilterPosts("Following posts")))
  }

  const handleGetAllMyFavoritePosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getAllMyFavoritePosts()).then(dispatch(setFilterPosts("My favorite posts")))
  }

  const handleGetAllMyPosts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setRedirect("/profile")
  }

  return (
    <Container className={classes.containerStyle}>
      <Button
        className={classes.button}
        onClick={handleGetAllPosts}
      >
        Most Liked Posts <ArrowForwardIosIcon style={{marginLeft: '10px'}}/>
      </Button>

      <Button
        className={classes.button}
        onClick={handleGetAllRecentsPosts}
      >
        Recents Posts <ArrowForwardIosIcon style={{marginLeft: '10px'}} />
      </Button>

      <Button
        className={classes.button}
        onClick={handleGetAllFollowingPosts}
      >
        Following Posts <ArrowForwardIosIcon style={{marginLeft: '10px'}} />
      </Button>

      <Button
        className={classes.button}
        onClick={handleGetAllMyFavoritePosts}
      >
        My Favorite Posts <ArrowForwardIosIcon style={{marginLeft: '10px'}} />
      </Button>

      <Button
        className={classes.button}
        style={{ paddingBottom: "30px" }}
        onClick={handleGetAllMyPosts}
      >
        My Posts <ArrowForwardIosIcon style={{marginLeft: '10px'}} />
      </Button>
    </Container>
  );
}

export default SidePanel;
