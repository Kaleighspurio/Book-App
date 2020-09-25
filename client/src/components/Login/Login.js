import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Login({ handleLogin, handleLoginInputChange }) {
  return (
    <>
    <Typography variant="h5" >
        Login in to an existing account:
    </Typography>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
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
          id="outlined-basic"
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
          color="primary"
          fullWidth={true}
          variant="contained"
          onClick={handleLogin}
        >
          Sign in
        </Button>
      </form>
    </>
  );
}
