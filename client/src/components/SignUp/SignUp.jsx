import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { signUp } from "../../redux/UserReducer/Actions";
import { clearErrors } from "../../redux/ErrorReducer/Actions";
import { useStyles } from './styles';

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [modalStyle] = useState();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const errorsData = useSelector((store) => store.errorReducer);

  const isAuthenticated = useSelector(
    (store) => store.userReducer.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      setForm({
        username: "",
        email: "",
        password: "",
      });
      handleClose();
    }
  }, [isAuthenticated]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearErrors());
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(form));
  };

  const body = (
    <Container style={modalStyle} className={classes.paper}>
      <div>
        <h3 className={classes.signup}>Register</h3>
        {errorsData.id === "REGISTER_FAIL" &&
          errorsData.msg.errors.map((ele, id) => (
            <div key={id} style={{marginTop: '10px'}}>
              <Alert severity="error">{ele}</Alert>
            </div>
          ))}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-required"
            label="Username"
            style={{ width: "95%", borderBottom: "2px white solid" }}
            name="username"
            value={form.username}
            onChange={handleOnChange}
            InputLabelProps={{
              className: classes.label,
            }}
            InputProps={{
              className: classes.input,
            }}
          />
          <TextField
            id="standard-required"
            label="Email"
            style={{ width: "95%", borderBottom: "2px white solid" }}
            name="email"
            value={form.email}
            onChange={handleOnChange}
            InputLabelProps={{
              className: classes.label,
            }}
            InputProps={{
              className: classes.input,
            }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={{ width: "95%", borderBottom: "2px white solid" }}
            name="password"
            value={form.password}
            onChange={handleOnChange}
            InputLabelProps={{
              className: classes.label,
            }}
            InputProps={{
              className: classes.input,
            }}
          />
          <div className={classes.divButton}>
          <Button variant="contained" className={classes.button} onClick={handleOnSubmit}>
            Create user
          </Button>
          </div>
        </form>
      </div>
    </Container>
  );

  return (
    <div>
      <Button type="button" className={classes.button} onClick={handleOpen}>
        Register
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
