import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { getMyPosts } from "../../redux/PostReducer/PostActions";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";
import Navbar from "../Navbar/Navbar";
import CreatePost from "../CreatePost/CreatePost";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import { setImageProfile } from "../../redux/UserReducer/Actions";
import { useStyles } from './styles';

function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const myPosts = useSelector((store) => store.postReducer.myPosts);
  const user = useSelector((store) => store.userReducer.user);

  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState("");

  useEffect(() => {
    dispatch(getMyPosts());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (image) {
      return getUrlImage();
    }
  }, [image]);

  useEffect(() => {
    if (urlImage) {
      return dispatch(setImageProfile(urlImage));
    }
  }, [urlImage]);

  const getUrlImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "social media");
    data.append("cloud_name", "drolngocz");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/drolngocz/image/upload",
      data
    );
    setUrlImage(res.data.url);
  };

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
        <Container className={classes.containerStyle}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={user.image}
              alt="profile"
              className={classes.imageProfile}
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "130px",
            }}
          >
            <div>
              <label
                htmlFor="select-photo"
                width="20px"
                style={{ marginTop: "20px" }}
              >
                <input
                  style={{ display: "none" }}
                  id="select-photo"
                  name="select-photo"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.buttonUpload}
                >
                  Upload
                  <PhotoCamera style={{ marginLeft: "10px" }} />
                </Button>
              </label>
            </div>
          </div>
          <h3 className={classes.username}>{user.username}</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "35px",
            }}
          >
            <h5 className={classes.info}>{`${myPosts.length} posts`}</h5>
            <h5
              className={classes.info}
            >{`${user.followers.length} Followers`}</h5>
            <h5
              className={classes.info}
            >{`${user.following.length} Following`}</h5>
          </div>
        </Container>
        <Navbar />
        <CreatePost />
        <div>
          {myPosts &&
            myPosts.map((ele, id) => (
              <PostCard
                key={id}
                idPost={ele._id}
                author={ele.author.username}
                authorId={ele.author._id}
                imageProfile={user && user.image}
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
