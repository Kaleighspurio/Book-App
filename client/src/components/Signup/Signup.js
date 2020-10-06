import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import '../../pages/Home/Home.css';

export default function Signup({
  handleLoginInputChange,
  handleSignup,
  alertActive,
  alertMessage,
}) {
  return (
    <>
      <Typography className="login-signup-text" variant="h5">
        Create an account:
      </Typography>
      {alertActive ? <Alert severity="error">{alertMessage}</Alert> : null}
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              className="form-input"
              name="firstName"
              type="text"
              label="First Name"
              variant="outlined"
              fullWidth={true}
              margin="normal"
              size="small"
              onChange={handleLoginInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="form-input"
              name="lastName"
              type="text"
              label="Last Name"
              variant="outlined"
              fullWidth={true}
              margin="normal"
              size="small"
              onChange={handleLoginInputChange}
            />
          </Grid>
        </Grid>
        <TextField
          className="form-input"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          size="small"
          onChange={handleLoginInputChange}
        />
        <TextField
          className="form-input"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          size="small"
          onChange={handleLoginInputChange}
        />
        <TextField
          className="form-input"
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          size="small"
          onChange={handleLoginInputChange}
        />
        <Button
          className="main-home-button"
          type="submit"
          color="primary"
          fullWidth={true}
          variant="contained"
          onClick={handleSignup}
          onKeyDown={(event) => {
            event.preventDefault();
            if (event.keycode === 13) {
              handleSignup();
            }
          }}
        >
          Create Account
        </Button>
      </form>
    </>
  );
}
