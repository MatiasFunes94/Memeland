import { makeStyles } from "@material-ui/core/styles";
import { palette } from "../../ColourPalette";

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50% !important",
    left: "50% !important",
    transform: `translate(-50%, -50%) !important`,
    width: 400,
    backgroundColor: palette.blueDark,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    textTransform: "none",
    color: palette.white,
    backgroundColor: palette.redLight,
    "&:hover": {
      backgroundColor: palette.redLight,
      color: palette.white,
    },
  },
  signup: {
    color: palette.redLight,
  },
  label: {
    color: `${palette.white} !important`,
    borderColor: `1px solid ${palette.redLight} !important`,
    borderBottom: palette.white,
  },
  divButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "40px",
  },
  input: {
    color: palette.white,
  },
}));
