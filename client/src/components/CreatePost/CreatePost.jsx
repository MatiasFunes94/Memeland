import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import { createPost } from '../../redux/PostReducer/PostActions';
import { useStyles } from './styles';

export default function CreatePost() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [imageToPost, setImageToPost] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageToPost) {
      return getUrlImage();
    }
  });

  const getUrlImage = async () => {
    const data = new FormData();
    data.append("file", imageToPost);
    data.append("upload_preset", "social media");
    data.append("cloud_name", "drolngocz");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/drolngocz/image/upload",
      data
    );
    setUrlImage(res.data.url);
  };

  const handleSubmitPost = () => {
    dispatch(createPost(description, urlImage)).then(() => {
      setDescription("");
      setImageToPost("");
      setUrlImage("");
    });
  };
  
  return (
    <Container className={classes.containerStyle}>
      <div>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
          style={{borderBottom: '1px white solid'}}
            id="standard-basic"
            label="Description..."
            value={description}
            InputLabelProps={{
              className: classes.label,
            }}
            InputProps={{
              shrink: true,
              classes: {
                notchedOutline: classes.input,
              },
              className: classes.input,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={classes.buttonImages}>
            <label
              htmlFor="post-photo"
              width="20px"
              style={{ marginTop: "20px" }}
            >
              <input
                style={{ display: "none" }}
                id="post-photo"
                name="post-photo"
                type="file"
                onChange={(e) => setImageToPost(e.target.files[0])}
              />
              <Button
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                className={classes.selectImage}
              >
                <AddIcon /> Select image
              </Button>
            </label>
          </div>
        </form>
        <div className={classes.divImage}>
          {imageToPost && <img src={urlImage} alt="imagen" width="400"></img>}
        </div>
      </div>
      {urlImage && (
        <div width="100%">
          <Button onClick={() => handleSubmitPost()} className={classes.post}>
            Post
          </Button>
        </div>
      )}
    </Container>
  );
}
