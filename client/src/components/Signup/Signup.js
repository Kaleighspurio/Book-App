import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

export default function Signup({ handleLoginInputChange, handleSignup, alertActive, alertMessage }) {
  return (
    <>
      <Typography variant="h5">Create an account:</Typography>
      { alertActive ? <Alert severity="error">{alertMessage}</Alert> : null}
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
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
          type='submit'
          color="primary"
          fullWidth={true}
          variant="contained"
          onClick={handleSignup}
          onKeyDown={event => {
            event.preventDefault()
            if (event.keycode === 13) {
              handleSignup()
            }
          }}
        >
          Create Account
        </Button>
      </form>
    </>
  );
}
