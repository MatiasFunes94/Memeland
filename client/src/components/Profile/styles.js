import { makeStyles } from "@material-ui/core/styles";
import { palette } from "../../ColourPalette";

export const useStyles = makeStyles((theme) => ({
  containerStyle: {
    marginTop: "100px",
    backgroundColor: palette.blueDark,
    maxWidth: 700,
    paddingTop: "50px",
    paddingBottom: "50px",
    marginBottom: "50px",
  },
  imageProfile: {
    borderRadius: "200%",
    width: "200px",
    height: "200px",
  },
  buttonUpload: {
    marginTop: "10px",
    backgroundColor: palette.redLight,
    "&:hover": {
      backgroundColor: palette.redLight,
      color: palette.white,
    },
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
}));
