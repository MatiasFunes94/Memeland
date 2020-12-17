import { makeStyles } from "@material-ui/core/styles";
import { palette } from "../../ColourPalette";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    marginTop: "40px",
    backgroundColor: palette.blueDark,
  },
  link: {
    textDecoration: "none",
    color: palette.white,
  },
  expand: {
    backgroundColor: "inherit",
    marginTop: "-60px",
    float: "right",
    color: palette.white,
    transform: "rotate(0deg)",
    marginLeft: "auto",
    marginRight: "10px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    "&:focus": {
      backgroundColor: "inherit",
      color: palette.white,
    },
    "&:hover": {
      backgroundColor: "inherit",
      color: palette.white,
    },
  },
  divImageUser: {
    display: "flex",
    marginTop: "20px",
    marginLeft: "20px",
    marginBottom: "10px",
    justifyContent: "space-between",
  },
  divAuthor: {
    display: "flex",
    height: "20px",
  },
  dateStyle: {
    fontWeight: "100",
    color: palette.white,
  },
  descriptionStyle: {
    marginLeft: "40px",
    marginTop: "30px",
    color: palette.white,
  },
  likeStyle: {
    color: palette.redLight,
  },
  buttonLike: {
    marginTop: "-40px",
    color: palette.white,
    textTransform: "none",
  },
  allCommentsButton: {
    marginTop: "-28px",
    float: "right",
    color: palette.white,
  },
  commentSlice: {
    marginLeft: "35px",
    marginBottom: "-25px",
    paddingBottom: "10px",
    marginTop: "-10px",
    lineHeight: 0.5,
  },
  commentsAllComments: {
    marginLeft: "20px",
    marginBottom: "-35px",
    paddingBottom: "10px",
    marginTop: "-25px",
  },
  deleteButtonIcon: {
    position: "relative",
    left: 55,
    marginBottom: "10px",
    width: "10px",
    color: palette.redLight,
  },
  editButtonIcon: {
    position: "relative",
    right: 55,
    marginBottom: "10px",
    color: palette.redLight,
  },
  divTextField: {
    display: "flex",
    justifyContent: "center",
  },
  textFieldElement: {
    margin: 8,
    minWidth: "60%",
    marginBottom: "40px",
    marginTop: "20px",
  },
  commentButton: {
    height: "50px",
    marginTop: "23px",
    backgroundColor: palette.redLight,
    color: palette.white,
    "&:hover": {
      backgroundColor: palette.redLight,
      color: palette.white,
    },
  },
  expandOpen: {
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    borderRadius: "100%",
    marginRight: "20px",
    marginTop: "10px",
  },
  avatarComments: {
    borderRadius: "100%",
    marginRight: "10px",
    marginTop: "-5px",
  },
  input: {
    borderWidth: "1px",
    borderColor: `${palette.redLight} !important`,
    color: `${palette.white} !important`,
  },
  label: {
    color: `${palette.redLight} !important`,
    borderColor: `1px solid ${palette.redLight} !important`,
  },
  buttonEditDescription: {
    color: palette.white,
    backgroundColor: palette.redLight,
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: palette.redLight,
      color: palette.white,
    },
  },
  editDescriptionPost: {
    right: "25px",
    top: "20px",
    textTransform: "none",
    backgroundColor: palette.redLight,
    color: palette.white,
    height: "40px",
    "&:hover": {
      backgroundColor: palette.redLight,
      color: palette.white,
    },
  },
  commentLike: {
    bottom: "7px",
  },
}));
