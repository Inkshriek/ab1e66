import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { style } from "./styles/front";
import { login } from "./store/utils/thunkCreators";
import Welcome from "./Welcome";

const useStyles = makeStyles((theme) => (style));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.grid}>
      <Welcome/>
      <Box className={classes.main}>
        <Grid container item className={classes.topToggle}>
          <Typography className={classes.helperText}>Don't have an account?</Typography>
          <Button onClick={() => history.push("/register")} className={classes.createAccount} variant="contained">Create account</Button>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid className={classes.container}>
            <Typography variant="h1" className={classes.h1}>Welcome back!</Typography>
            <FormControl margin="normal" className={classes.formControl} required>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                className={classes.textbox}
              />
            </FormControl>
            <FormControl margin="normal" className={classes.formControl} required>
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                className={classes.textbox}
              />
            </FormControl>
            <Button type="submit" variant="contained" size="large" color="primary" className={classes.submit}>
              Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
