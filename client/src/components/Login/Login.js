import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

export default function Login({ handleLogin, handleLoginInputChange, alertActive, alertMessage, successAlertActive }) {
  return (
    <>
    <Typography variant="h5" >
        Login in to an existing account:
    </Typography>
    { alertActive ? <Alert severity="error">{alertMessage}</Alert> : null}
    { successAlertActive ? <Alert severity="success">{alertMessage}</Alert> : null}
      <form noValidate autoComplete="off">
        <TextField
          name="email"
          type='email'
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
        <Button
          type="submit"
          color="primary"
          fullWidth={true}
          variant="contained"
          onClick={handleLogin}
          onKeyDown={event => {
            event.preventDefault()
            if (event.keycode === 13) {
              handleLogin()
            }
          }}
        >
          Sign in
        </Button>
      </form>
    </>
  );
}
