import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { getAllPosts } from "../../redux/PostReducer/PostActions";
import PostCard from "../PostCard/PostCard";
import CreatePost from '../CreatePost/CreatePost';
import SidePanel from "../SidePanel/SidePanel";
import Navbar from "../Navbar/Navbar";

function Landing() {
  const dispatch = useDispatch();

  const posts = useSelector((store) => store.postReducer.allPosts);
  const filterBy = useSelector((store) => store.postReducer.filterBy);

  const isBigScreen = window.matchMedia('(min-width: 1300px)')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!filterBy) {
      dispatch(getAllPosts());
    }
  }, [dispatch]);

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        {isBigScreen.matches && (
          <Container >
            <SidePanel />
          </Container>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "100px",
          }}
        >
          <Navbar />
          <CreatePost />
          {posts &&
            posts.map((ele, id) => (
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
      </div>
    </>
  );
}

export default Landing;
