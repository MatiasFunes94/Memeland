import { makeStyles } from "@material-ui/core/styles";
import { palette } from "../../ColourPalette";

export const useStyles = makeStyles((theme) => ({
  containerStyle: {
    marginTop: "100px",
    backgroundColor: palette.blueDark,
    maxWidth: 700,
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  username: {
    display: "flex",
    justifyContent: "center",
    color: palette.white,
    fontWeight: "400",
    fontSize: "40px",
  },
  info: {
    margin: 20,
    color: palette.white,
    fontSize: "20px",
  },
  followButton: {
    backgroundColor: palette.redLight,
    color: palette.white,
    marginLeft: "20px",
    bottom: "5px",
    height: "40px",
    top: "10px",
    "&:hover": {
      backgroundColor: palette.redLight,
      color: palette.white,
    },
  },
}));
