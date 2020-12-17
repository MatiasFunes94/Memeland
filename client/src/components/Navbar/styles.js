import { fade, makeStyles } from "@material-ui/core/styles";
import { palette } from "../../ColourPalette";

export const useStyles = makeStyles((theme) => ({
  grow: {
    display: "flex",
    justifyContent: "center",
  },
  backgroundNavbar: {
    backgroundColor: palette.blueDark,
  },
  memeland: {
    marginRight: theme.spacing(2),
    textTransform: "none",
    fontSize: "20px",
    color: palette.redLight,
    textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  buttonProfile: {
    width: "150px",
    textTransform: "none",
    color: palette.white,
    backgroundColor: palette.redLight,
    "&:hover": {
      color: palette.white,
      backgroundColor: palette.redLight,
    },
  },
  buttonProfileMobile: {
    width: "150px",
    textTransform: "none",
    color: palette.white,
    backgroundColor: palette.redLight,
    "&:hover": {
      color: palette.white,
      backgroundColor: palette.redLight,
    },
  },
}));
