import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { getUserPosts } from "../../redux/PostReducer/PostActions";
import { followUser, unfollowUser } from "../../redux/UserReducer/Actions";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";
import Navbar from "../Navbar/Navbar";
import { useStyles } from './styles';

function Profile(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userPosts = useSelector((store) => store.postReducer.userPosts);
  const user = useSelector(store => store.userReducer.user)

  const usernameProfile = userPosts.length > 0 && userPosts[0].author.username
  const usernameProfileId = userPosts.length > 0 && userPosts[0].author._id
  const followers = userPosts.length > 0 && userPosts[0].author.followers.length
  const following = userPosts.length > 0 && userPosts[0].author.following.length
  const imageProfile = userPosts.length > 0 && userPosts[0].author.image
  console.log(imageProfile)

  useEffect(() => {
    dispatch(getUserPosts(props.match.params.id));
  }, [user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if(!user){
    return <Redirect to="/" />
  }

  return (
    <>
      <Navbar />
      <Container className={classes.containerStyle}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={imageProfile}
            alt="profile"
            style={{ borderRadius: "200%", width: "200px", height: "200px" }}
          ></img>
        </div>
        <h3 className={classes.username}>
          {usernameProfile}{" "}
          {user.following.find(
            (username) => username === usernameProfile
          ) ? (
            <Button onClick={() => dispatch(unfollowUser(usernameProfileId))} className={classes.followButton}>
              Unfollow
            </Button>
          ) : (
            <Button onClick={() => dispatch(followUser(usernameProfileId))} className={classes.followButton}>
              Follow
            </Button>
          )}
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h5 className={classes.info}>{`${userPosts.length} posts`}</h5>
          <h5 className={classes.info}>{`${followers} Followers`}</h5>
          <h5 className={classes.info}>{`${following} Following`}</h5>
        </div>
        </Container>
        <div>
          {userPosts &&
            userPosts.map((ele, id) => (
              <PostCard
                key={id}
                idPost={ele._id}
                author={ele.author.username}
                authorId={ele.author._id}
                imageProfile={ele.author.image}
                date={ele.date}
                description={ele.description}
                photo={ele.photo}
                likes={ele.likes.map((like) => like)}
                comments={ele.comments.map((comment) => comment)}
              />
            ))}
        </div>
      
    </>
  );
}

export default Profile;
