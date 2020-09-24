import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Navbar() {
  return (
    <>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Typography variant="h6">My Bookshelf</Typography>
              </Grid>
              <Grid item>
                <Button size="small" variant="contained">
                  Login
                </Button>
                <Button size="small" variant="contained">
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
