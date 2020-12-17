import { palette } from "../../ColourPalette";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50% !important",
    left: "50% !important",
    transform: `translate(-50%, -50%) !important`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  containerStyle: {
    maxWidth: "700px",
    backgroundColor: `${palette.blueDark} !important`,
    paddingBottom: "20px",
    paddingTop: "20px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  post: {
    left: "80%",
    marginTop: "30px",
    backgroundColor: `${palette.redLight} !important`,
    color: `${palette.white} !important`,
  },
  postDisabled: {
    left: "80%",
    color: `${palette.white} !important`,
  },
  addImage: {
    fontSize: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  createPost: {
    border: "none",
    backgroundColor: "inherit",
  },
  divImage: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  buttonImages: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: "1px",
    borderColor: `${palette.redLight} !important`,
    color: `${palette.white}`,
  },
  label: {
    color: `${palette.white} !important`,
    borderColor: `1px solid ${palette.redLight} !important`,
  },
  selectImage: {
    backgroundColor: `${palette.redLight} !important`,
    color: `${palette.white} !important`,
  },
}));
