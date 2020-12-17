import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AlertMsj from "../AlertMsj";
import { likePost, unlikePost, likeComment, unlikeComment } from "../../redux/PostReducer/LikeActions";
import {
  addCommentToPost,
  removeCommentFromPost,
  editCommentFromPost,
} from "../../redux/PostReducer/CommentActions";
import { deletePost } from '../../redux/PostReducer/PostActions';
import { palette } from "../../ColourPalette";
import { useStyles } from './styles';

export default function PostCard({
  idPost,
  author,
  authorId,
  imageProfile,
  date,
  description,
  photo,
  likes,
  comments,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [textOfComment, setTextOfComment] = useState("");
  const [editTextOfComment, SetEditTextOfComment] = useState("false");
  const [onChangeTextOfComment, setOnChangeTextOfComment] = useState("");

  const user = useSelector((store) => store.userReducer.user);
  const commentsSlice = comments && comments.slice(0, 2);

  const isSmallScreen = window.matchMedia('(max-width: 1000px)')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikePost = (postId) => {
    dispatch(likePost(postId, user.username));
  };

  const handleUnlikePost = (postId) => {
    dispatch(unlikePost(postId, user.username));
  };

  const handleAddCommentPost = (postId) => {
    dispatch(addCommentToPost(postId, textOfComment));
    setTextOfComment("");
  };

  const handleRemoveCommentPost = (postId, commentId) => {
    dispatch(removeCommentFromPost(postId, commentId));
  };

  const handleEditCommentPost = (postId, commentId) => {
    dispatch(editCommentFromPost(postId, commentId, onChangeTextOfComment))
    SetEditTextOfComment("");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className={classes.root}>
        <div className={classes.divImageUser}>
          <div style={{ display: "flex" }}>
            {user && user.id === authorId ? (
              <Link className={classes.link} to={`/profile`}>
                <img
                  src={imageProfile}
                  alt="user"
                  width="60"
                  height="60"
                  className={classes.avatar}
                ></img>
              </Link>
            ) : (
              <Link className={classes.link} to={`/userProfile/${authorId}`}>
                <img
                  src={imageProfile}
                  alt="user"
                  width="60"
                  height="60"
                  className={classes.avatar}
                ></img>
              </Link>
            )}

            <div
              style={{ marginTop: "15px", marginRight: "20px", lineHeight: 0 }}
            >
              <div className={classes.divAuthor}>
                {user && user.id === authorId ? (
                  <Link className={classes.link} to={`/profile`}>
                    <Typography>{author}</Typography>
                  </Link>
                ) : (
                  <Link
                    className={classes.link}
                    to={`/userProfile/${authorId}`}
                  >
                    <Typography>{author}</Typography>
                  </Link>
                )}
              </div>
              <p className={classes.dateStyle}>{moment(date).fromNow()}</p>
            </div>
          </div>
          {user && author === user.username && (
            <div>
              <Button
                style={{ right: "25px", top: "20px" }}
                onClick={() => dispatch(deletePost(idPost))}
                className={classes.editDescriptionPost}
              >
                Delete post <DeleteIcon style={{ color: palette.white }} />
              </Button>
            </div>
          )}
        </div>

        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <img
            src={photo}
            alt="post"
            style={{ width: isSmallScreen.matches ? "400px" : "600px" }}
          ></img>
        </Container>
        {description ?
           <div
           style={{
             display: "flex",
             justifyContent: "space-between",
             height:
               comments.length > 2
                 ? "80px"
                 :
                   comments.length < 2
                 ? "130px"
                 : "130px",
           }}
         >
      
             <Typography
               variant="body2"
               color="textSecondary"
               component="p"
               className={classes.descriptionStyle}
             >
               {description}
             </Typography>
 
         </div>
         :
         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
             height: '80px'
           }}
         >
      
             <Typography
               variant="body2"
               color="textSecondary"
               component="p"
               className={classes.descriptionStyle}
             >
               {description}
             </Typography>
 
         </div>
        }

       

        <Container
          style={{
            marginBottom: "10px",
            marginTop: !user
              ? "-80px"
              : author === user.username
              ? "-30px"
              : "-40px",
          }}
        >
          {!user ? (
            <div style={{ marginTop: "40px" }}>
              <IconButton
                aria-label="add to favorites"
                className={classes.buttonLike}
                style={{ marginTop: comments.length > 2 && "10px" }}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          ) : (
            <div style={{ marginTop: comments.length > 2 ? "-25px" : "-30px" }}>
              {user && likes.find((like) => like === user.username) ? (
                <IconButton
                  aria-label="add to favorites"
                  className={classes.buttonLike}
                  onClick={() => handleUnlikePost(idPost)}
                  style={{ marginTop: comments.length > 2 && "10px" }}
                >
                  <FavoriteIcon className={classes.likeStyle} />
                </IconButton>
              ) : user ? (
                <IconButton
                  aria-label="add to favorites"
                  className={classes.buttonLike}
                  onClick={() => handleLikePost(idPost)}
                  style={{ marginTop: comments.length > 2 && "10px" }}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <AlertMsj Message={"Sign in, please"} />
              )}
            </div>
          )}
          <div
            style={{
              marginLeft: "40px",
              marginTop: user ? "-20px" : "-20px",
              maxWidth: 500,
            }}
          >
            {likes && likes.length === 1 ? (
              <Button
                className={classes.buttonLike}
              >{`Liked by ${likes[0]}`}</Button>
            ) : likes && likes.length === 2 ? (
              <Button
                className={classes.buttonLike}
              >{`Liked by ${likes[0]} and ${likes[1]}`}</Button>
            ) : (
              likes &&
              likes.length > 2 && (
                <Button className={classes.buttonLike}>{`Liked by ${
                  likes[0]
                } and other ${likes && likes.length - 1} users`}</Button>
              )
            )}
          </div>
        </Container>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {user && comments.length > 2 ? (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            style={{ marginTop: comments.length > 2 && "-100px" }}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
            <Typography>All comments</Typography>
          </IconButton>
        ) : (
          comments.length > 2 && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              style={{ marginTop: comments.length > 2 && "-100px" }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
              <Typography>All comments</Typography>
            </IconButton>
          )
        )}

        {!expanded && (
          <div style={{ marginBottom: "10px", marginTop: "20px" }}>
            {commentsSlice.map((comment, id) =>
              editTextOfComment === comment._id ? (
                <div
                  key={id}
                  className={classes.descriptionStyle}
                  style={{
                    marginRight: "50px",
                    marginTop: "-10px",
                    marginBottom: "20px",
                    marginLeft: "35px",
                  }}
                >
                  <TextField
                    style={{
                      maxWidth: "300px",
                      borderBottom: "1px white solid",
                    }}
                    id="outlined-full-width"
                    placeholder="Edit comment..."
                    InputProps={{
                      className: classes.input,
                    }}
                    onChange={(e) => setOnChangeTextOfComment(e.target.value)}
                  ></TextField>
                  <Button
                    onClick={() => handleEditCommentPost(idPost, comment._id)}
                    className={classes.buttonEditDescription}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => SetEditTextOfComment("")}
                    className={classes.buttonEditDescription}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Typography
                  style={{ display: "flex", justifyContent: "space-between" }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.commentSlice}
                >
                  <div style={{ display: "flex", height: '50px' }}>
                    <h4
                      style={{
                        position: "relative",
                        bottom: "4px",
                        color: palette.redLight,
                      }}
                    >
                      {comment.author}
                    </h4>
                    <p
                      style={{
                        marginLeft: "10px",
                        color: palette.white,
                        lineHeight: "20px",
                        position: "relative",
                        bottom: "6px",
                      }}
                    >
                      {comment.textOfComment}
                    </p>
                    {user &&
                    comment.likes.find((like) => like === user.username) ? (
                      <div style={{display: 'flex', height: '45px'}}>
                        <IconButton
                          aria-label="add to favorites"
                          className={classes.commentLike}
                          style={{
                            color: palette.redLight,
                            position: "relative",
                            bottom: "5px",
                          }}
                          onClick={() =>
                            dispatch(unlikeComment(idPost, comment._id))
                          }
                        >
                          <FavoriteIcon style={{ width: "15px" }} />
                         
                        </IconButton>
                            <p
                              style={{
                                color: palette.white,
                                fontSize: "15px",
                                position: 'relative',
                                right: '5px'
                              }}
                            >
                              {comment.likes.length}
                            </p>
                      </div>
                    ) : comment.likes.length > 0 ? (
                      <>
                        <IconButton
                          aria-label="add to favorites"
                          className={classes.commentLike}
                          style={{ position: "relative", bottom: "7px" }}
                          onClick={() =>
                            dispatch(likeComment(idPost, comment._id))
                          }
                        >
                          <FavoriteIcon
                            style={{ width: "15px", color: palette.white }}
                          />
                          {comment.likes.length > 0 && (
                            <p
                              style={{
                                color: palette.white,
                                fontSize: "15px",
                                marginLeft: "5px",
                              }}
                            >
                              {comment.likes.length}
                            </p>
                          )}
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label="add to favorites"
                        className={classes.commentLike}
                        style={{ position: "relative", bottom: "6px" }}
                        onClick={() =>
                          dispatch(likeComment(idPost, comment._id))
                        }
                      >
                        <FavoriteIcon
                          style={{ width: "15px", color: palette.white }}
                        />
                      </IconButton>
                    )}
                  </div>
                  <div>
                    {user && comment.author === user.username && (
                      <>
                        <Button
                          className={classes.deleteButtonIcon}
                          onClick={() =>
                            handleRemoveCommentPost(idPost, comment._id)
                          }
                        >
                          <DeleteIcon style={{ fontSize: "20px" }} />
                        </Button>
                        <Button
                          className={classes.editButtonIcon}
                          onClick={() => SetEditTextOfComment(comment._id)}
                        >
                          <EditIcon style={{ fontSize: "20px" }} />
                        </Button>
                      </>
                    )}
                  </div>
                </Typography>
              )
            )}
          </div>
        )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              {comments.length &&
                comments.map((comment, id) =>
                  editTextOfComment === comment._id ? (
                    <div
                      key={id}
                      className={classes.descriptionStyle}
                      style={{
                        marginRight: "50px",
                        marginTop: "-10px",
                        marginBottom: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      <TextField
                        style={{
                          maxWidth: "300px",
                          borderBottom: "1px white solid",
                        }}
                        id="outlined-full-width"
                        placeholder="Edit comment..."
                        InputProps={{
                          className: classes.input,
                        }}
                        onChange={(e) =>
                          setOnChangeTextOfComment(e.target.value)
                        }
                      ></TextField>
                      <Button
                        onClick={() =>
                          handleEditCommentPost(idPost, comment._id)
                        }
                        className={classes.buttonEditDescription}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => SetEditTextOfComment("")}
                        className={classes.buttonEditDescription}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.commentsAllComments}
                    >
                      <div style={{ display: "flex" }}>
                        <h4
                          style={{
                            position: "relative",
                            bottom: "4px",
                            color: palette.redLight,
                          }}
                        >
                          {comment.author}
                        </h4>
                        <p style={{ marginLeft: "10px", color: palette.white }}>
                          {comment.textOfComment}
                        </p>
                        {user &&
                        comment.likes.find((like) => like === user.username) ? (
                          <div style={{display: 'flex', height: '58px'}}>
                            <IconButton
                              aria-label="add to favorites"
                              className={classes.commentLike}
                              style={{ color: palette.redLight }}
                              onClick={() =>
                                dispatch(unlikeComment(idPost, comment._id))
                              }
                            >
                              <FavoriteIcon
                                style={{
                                  width: "15px",
                                  position: "relative",
                                  top: "3px",
                                }}
                              />
                            </IconButton>
                            {comment.likes.length > 0 && (
                              <p style={{ color: palette.white }}>
                                {comment.likes.length}
                              </p>
                            )}
                          </div>
                        ) : (
                          <>
                            <IconButton
                              aria-label="add to favorites"
                              className={classes.commentLike}
                              onClick={() =>
                                dispatch(likeComment(idPost, comment._id))
                              }
                            >
                              <FavoriteIcon
                                style={{
                                  width: "15px",
                                  color: palette.white,
                                  position: "relative",
                                  top: "3px",
                                }}
                              />
                            </IconButton>
                            {comment.likes.length > 0 && (
                              <p style={{ color: palette.white }}>
                                {comment.likes.length}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <div style={{ position: "relative", left: "20px" }}>
                        {user && comment.author === user.username && (
                          <>
                            <Button
                              className={classes.deleteButtonIcon}
                              onClick={() =>
                                handleRemoveCommentPost(idPost, comment._id)
                              }
                            >
                              <DeleteIcon style={{ fontSize: "20px" }} />
                            </Button>
                            <Button
                              onClick={() => SetEditTextOfComment(comment._id)}
                              className={classes.editButtonIcon}
                            >
                              <EditIcon style={{ fontSize: "20px" }} />
                            </Button>
                          </>
                        )}
                      </div>
                    </Typography>
                  )
                )}
            </div>
          </CardContent>
        </Collapse>
        <Grid container spacing={1} className={classes.divTextField}>
          {user && (
            <>
              <Grid item style={{ position: "relative", top: "30px" }}>
                <img
                  src={user && user.image}
                  alt="user"
                  width="40"
                  height="40"
                  className={classes.avatarComments}
                ></img>
              </Grid>
              <TextField
                style={{marginLeft: isSmallScreen.matches && "-10px", marginRight: isSmallScreen.matches && "3px"}}
                id="outlined-full-width"
                label={user && user.username}
                className={classes.textFieldElement}
                placeholder="Write a comment"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  className: classes.label,
                }}
                InputProps={{
                  shrink: true,
                  classes: {
                    notchedOutline: classes.input,
                  },
                  className: classes.input,
                }}
                value={textOfComment}
                variant="outlined"
                onChange={(e) => setTextOfComment(e.target.value)}
              />
              <Button
                className={classes.commentButton}
                onClick={() => handleAddCommentPost(idPost, textOfComment)}
                style={{ width: "80px" }}
              >
                Comment
              </Button>
            </>
          )}
        </Grid>
      </Card>
    </div>
  );
}
