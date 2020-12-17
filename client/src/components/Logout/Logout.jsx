import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/UserReducer/Actions";
import { palette } from "../../ColourPalette";
import Button from "@material-ui/core/Button";

function Logout() {
  const dispatch = useDispatch();

  return (
    <Button
      style={{
        textTransform: "none",
        backgroundColor: palette.redLight,
        color: "white",
        width: 150
      }}
      onClick={() => dispatch(logout())}
    >
      Logout
    </Button>
  );
}

export default Logout;
