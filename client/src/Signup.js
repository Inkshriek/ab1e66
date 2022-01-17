import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { style } from "./styles/front";
import { register } from "./store/utils/thunkCreators";
import Welcome from "./Welcome";

const useStyles = makeStyles((theme) => (style));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center">
      <Welcome/>
      <Box className={classes.main}>
        <Grid container item className={classes.topToggle}>
          <Typography className={classes.helperText}>Already have an account?</Typography>
          <Button onClick={() => history.push("/login")} className={classes.createAccount} variant="contained" color="secondary">Login</Button>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid className={classes.container}>
            <Typography variant="h1" className={classes.h1}>Create an account.</Typography>
            <FormControl className={classes.formControl}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                className={classes.textbox}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                className={classes.textbox}
                required
              />
            </FormControl>
            <FormControl error={!!formErrorMessage.confirmPassword} className={classes.formControl}>
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                className={classes.textbox}
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl error={!!formErrorMessage.confirmPassword} className={classes.formControl}>
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                className={classes.textbox}
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" size="large" color="primary" className={classes.submit}>
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
