import { palette } from "../../ColourPalette";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    borderBottom: "1px solid white",
  },
  icon: {
    fill: "white",
  },
  menuItem: {
    color: palette.redLight,
    backgroundColor: palette.blueDark,
    "&:hover": {
      backgroundColor: palette.blueDark,
      color: palette.redLight,
    },
  },
}));
