import { makeStyles } from "@material-ui/core/styles";
import { palette } from "../../ColourPalette";

export const useStyles = makeStyles((theme) => ({
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: palette.blueDark,
    position: "fixed",
    maxWidth: "250px",
  },
  button: {
    marginTop: "30px",
    color: palette.redLight,
  },
}));
